import { OpCode } from "../const/opcodes";
import { CompiledFunction, SnowFallSettings } from "../const/types";

interface CallFrame {
	func: CompiledFunction;
	ip: number;
	stackStart: number;
}

export class SnowFallVM {
	private settings: SnowFallSettings;

	private frames: CallFrame[] = [];
	private frame: CallFrame;
	private stack: any[] = [];
	private globals: Map<string, any> = new Map();

	constructor(entryFunction: CompiledFunction, settings: SnowFallSettings) {
		this.settings = settings;
		console.log(entryFunction);

		// Initial setup
		this.stack.push(entryFunction); // Push function to stack for the first call
		const frame = { func: entryFunction, ip: 0, stackStart: 0 };
		this.frames.push(frame);
		this.frame = frame;
	}

	private readByte(): number {
		return this.frame.func.chunk.code[this.frame.ip++];
	}
	private readShort(): number {
		this.frame.ip += 2;
		const code = this.frame.func.chunk.code;
		return (code[this.frame.ip - 2] << 8) | code[this.frame.ip - 1];
	}

	private readConstant(): any {
		return this.frame.func.chunk.constants[this.readByte()];
	}

	public run(): any {
		while (true) {
			const op = this.readByte();
			switch (op) {
				case OpCode.PUSH_CONST:
					this.stack.push(this.readConstant());
					break;
				case OpCode.PUSH_NULL:
					this.stack.push(null);
					break;
				case OpCode.POP:
					this.stack.pop();
					break;

				case OpCode.DEFINE_GLOBAL: {
					const name = this.readConstant();
					this.globals.set(name, this.stack[this.stack.length - 1]);
					this.stack.pop();
					break;
				}
				case OpCode.GET_GLOBAL: {
					const name = this.readConstant();
					if (!this.globals.has(name)) throw new Error(`VM Error: Undefined global variable '${name}'.`);
					this.stack.push(this.globals.get(name));
					break;
				}
				case OpCode.SET_GLOBAL: {
					const name = this.readConstant();
					if (!this.globals.has(name)) throw new Error(`VM Error: Undefined global variable '${name}'.`);
					this.globals.set(name, this.stack[this.stack.length - 1]);
					// Note: set does not pop the value from the stack, allowing `a = b = 1`
					break;
				}

				case OpCode.GET_LOCAL: {
					const slot = this.readByte();
					this.stack.push(this.stack[this.frame.stackStart + slot]);
					break;
				}
				case OpCode.SET_LOCAL: {
					const slot = this.readByte();
					this.stack[this.frame.stackStart + slot] = this.stack[this.stack.length - 1];
					break;
				}

				case OpCode.EQUAL: {
					const b = this.stack.pop();
					const a = this.stack.pop();
					this.stack.push(a === b);
					break;
				}
				case OpCode.NOT_EQUAL: {
					const b = this.stack.pop();
					const a = this.stack.pop();
					this.stack.push(a !== b);
					break;
				}
				case OpCode.GREATER_THAN: {
					const b = this.stack.pop();
					const a = this.stack.pop();
					this.stack.push(a > b);
					break;
				}
				case OpCode.GREATER_EQUAL: {
					const b = this.stack.pop();
					const a = this.stack.pop();
					this.stack.push(a >= b);
					break;
				}
				case OpCode.LESS_THAN: {
					const b = this.stack.pop();
					const a = this.stack.pop();
					this.stack.push(a < b);
					break;
				}
				case OpCode.LESS_EQUAL: {
					const b = this.stack.pop();
					const a = this.stack.pop();
					this.stack.push(a <= b);
					break;
				}

				case OpCode.ADD: {
					const b = this.stack.pop();
					const a = this.stack.pop();
					if (typeof a === "number" && typeof b === "number") this.stack.push(a + b);
					else if (typeof a === "string" || typeof b === "string") this.stack.push(String(a) + String(b));
					else throw new Error("VM Error: Operands must be two numbers or at least one string.");
					break;
				}
				case OpCode.SUBTRACT: {
					const b = this.stack.pop();
					const a = this.stack.pop();
					if (typeof a === "number" && typeof b === "number") this.stack.push(a - b);
					else throw new Error("VM Error: Operands must be two numbers.");
					break;
				}
				case OpCode.MULTIPLY: {
					const b = this.stack.pop();
					const a = this.stack.pop();
					if (typeof a === "number" && typeof b === "number") this.stack.push(a * b);
					else if (typeof a === "string" && typeof b === "number") this.stack.push(a.repeat(b));
					else if (typeof a === "number" && typeof b === "string") this.stack.push(b.repeat(a));
					else throw new Error("VM Error: Operands must be two numbers. Or one string and one number.");
					break;
				}
				case OpCode.DIVIDE: {
					const b = this.stack.pop();
					const a = this.stack.pop();
					if (typeof a === "number" && typeof b === "number") this.stack.push(a / b);
					else throw new Error("VM Error: Operands must be two numbers.");
					break;
				}

				case OpCode.NEGATE:
					this.stack.push(!this.stack.pop());
					break;

				case OpCode.JUMP: {
					const offset = this.readShort();
					if (this.settings.hooks?.beforeJump) this.settings.hooks.beforeJump(this, "JUMP");
					this.frame.ip += offset;
					break;
				}
				case OpCode.JUMP_IF_FALSE: {
					const offset = this.readShort();
					if (this.settings.hooks?.beforeJump) this.settings.hooks.beforeJump(this, "JUMP_IF_FALSE");
					if (!this.stack[this.stack.length - 1]) {
						// peek
						this.frame.ip += offset;
					}
					break;
				}

				case OpCode.CALL: {
					const argCount = this.readByte();
					const callee = this.stack[this.stack.length - 1 - argCount];
					if (!(callee && typeof callee === "object" && callee.arity !== undefined)) {
						throw new Error("VM Error: Can only call functions.");
					}
					if (argCount !== callee.arity) {
						throw new Error(`VM Error: Expected ${callee.arity} arguments but got ${argCount}.`);
					}
					const newFrame = { func: callee, ip: 0, stackStart: this.stack.length - argCount };
					this.frames.push(newFrame);
					this.frame = newFrame;
					break;
				}

				case OpCode.RETURN: {
					const result = this.stack.pop();
					this.frames.pop();
					if (this.frames.length === 0) {
						return result; // End of script
					}
					this.stack.splice(this.frame.stackStart); // Discard frame's stack
					this.stack.push(result);
					this.frame = this.frames[this.frames.length - 1];
					break;
				}

				case OpCode.CALL_BUILTIN: {
					const funcName = this.readConstant();
					const argCount = this.readByte();
					const args = this.stack.splice(this.stack.length - argCount, argCount);

					const func = this.settings.builtInFunctions[funcName];
					if (func) {
						const result = func(...args);
						this.stack.push(result === undefined ? null : result); // Always push something
					} else {
						throw new Error(`VM Error: Built-in function ${funcName} not found.`);
					}
					break;
				}

				default:
					throw new Error(`VM Error: Unknown opcode ${op}`);
			}
		}
	}
}
