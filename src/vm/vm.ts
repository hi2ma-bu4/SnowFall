import { OpCode } from "../const/opcodes";
import { CompactCompiledFunction, CompiledFunction, CompiledOutputType, SnowFallSettings } from "../const/types";
import { Compressor } from "../util/compressor";

interface CallFrame {
	func: CompiledFunction;
	ip: number;
	stackStart: number;
}

interface ExceptionHandler {
	catchAddress: number;
	finallyAddress: number | null;
	stackDepth: number;
}

export class SnowFallVM {
	private settings: SnowFallSettings;

	private frames: CallFrame[] = [];
	private frame: CallFrame;
	private stack: any[] = [];
	private globals: Map<string, any> = new Map();

	// 例外ハンドラスタック
	private handlerStack: ExceptionHandler[] = [];

	constructor(entryFunction: CompiledOutputType, settings: SnowFallSettings) {
		this.settings = settings;
		console.log(entryFunction);

		// Initial setup
		const func = this.decompressData(entryFunction);
		this.stack.push(func);
		const frame = { func, ip: 0, stackStart: 0 };
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

	private runtimeError(message: string): Error {
		let trace = `\n--- Stack Trace ---\n`;
		for (let i = this.frames.length - 1; i >= 0; i--) {
			const frame = this.frames[i];
			const funcName = frame.func.name || "(script)";
			// ipは次に実行する命令を指すため、-1して直前の命令の位置を取得
			const line = frame.func.chunk.lines[frame.ip - 1] || "unknown";
			trace += `  at ${funcName} (line ${line})\n`;
		}
		return new Error(`${message}\n${trace}`);
	}

	public run(): any {
		try {
			while (true) {
				const op = this.readByte();
				switch (op) {
					case OpCode.CHECK_TYPE: {
						const expectedType = this.readConstant().toLowerCase();
						const value = this.stack[this.stack.length - 1]; // peek
						let actualType: string;
						if (value === null) actualType = "null";
						else if (Array.isArray(value)) actualType = "array";
						else actualType = typeof value;

						if (expectedType !== actualType) {
							throw this.runtimeError(`TypeError: Expected type '${expectedType}' but got '${actualType}'.`);
						}
						break;
					}

					case OpCode.PUSH_TRUE:
						this.stack.push(true);
						break;
					case OpCode.PUSH_FALSE:
						this.stack.push(false);
						break;

					case OpCode.PUSH_CONST:
						this.stack.push(this.readConstant());
						break;
					case OpCode.PUSH_NULL:
						this.stack.push(null);
						break;
					case OpCode.POP:
						this.stack.pop();
						break;
					case OpCode.DUP:
						this.stack.push(this.stack[this.stack.length - 1]);
						break;

					case OpCode.DEFINE_GLOBAL: {
						const name = this.readConstant();
						this.globals.set(name, this.stack[this.stack.length - 1]);
						// DEFINE_GLOBAL should pop the value
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

					case OpCode.BUILD_ARRAY: {
						const itemCount = this.readByte();
						const array = this.stack.splice(this.stack.length - itemCount, itemCount);
						this.stack.push(array);
						break;
					}
					case OpCode.BUILD_OBJECT: {
						const pairCount = this.readByte();
						const obj: { [key: string]: any } = {};
						for (let i = 0; i < pairCount; i++) {
							const value = this.stack.pop();
							const key = this.stack.pop();
							obj[key] = value;
						}
						this.stack.push(obj);
						break;
					}
					case OpCode.GET_PROPERTY: {
						const property = this.stack.pop();
						const object = this.stack.pop();
						if (object === null || object === undefined) throw new Error("VM Error: Cannot read property of null or undefined.");
						this.stack.push(object[property]);
						break;
					}
					case OpCode.SET_PROPERTY: {
						const value = this.stack.pop();
						const property = this.stack.pop();
						const object = this.stack.pop();
						if (object === null || object === undefined) throw new Error("VM Error: Cannot set property of null or undefined.");
						object[property] = value;
						this.stack.push(value); // Assignment expression returns the assigned value
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
					case OpCode.BITWISE_AND: {
						const b = this.stack.pop();
						const a = this.stack.pop();
						if (typeof a === "number" && typeof b === "number") this.stack.push(a & b);
						else throw new Error("VM Error: Operands must be two numbers for bitwise AND.");
						break;
					}
					case OpCode.BITWISE_OR: {
						const b = this.stack.pop();
						const a = this.stack.pop();
						if (typeof a === "number" && typeof b === "number") this.stack.push(a | b);
						else throw new Error("VM Error: Operands must be two numbers for bitwise OR.");
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
						if (typeof a === "number" && typeof b === "number") {
							if (b === 0) throw new Error("VM Error: Division by zero.");
							this.stack.push(a / b);
						} else throw new Error("VM Error: Operands must be two numbers.");
						break;
					}
					case OpCode.MODULO: {
						const b = this.stack.pop();
						const a = this.stack.pop();
						if (typeof a === "number" && typeof b === "number") {
							if (b === 0) throw new Error("VM Error: Division by zero.");
							this.stack.push(a % b);
						} else throw new Error("VM Error: Operands must be two numbers.");
						break;
					}

					case OpCode.NEGATE:
						const value = this.stack.pop();
						this.stack.push(!value);
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
					case OpCode.LOOP: {
						const offset = this.readShort();
						// IPからオフセットを「引く」ことで後方にジャンプする
						this.frame.ip -= offset;
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
						const newFrame = { func: this.decompressData(callee), ip: 0, stackStart: this.stack.length - argCount };
						this.frames.push(newFrame);
						this.frame = newFrame;
						break;
					}

					case OpCode.RETURN: {
						const result = this.stack.pop();
						const frameToPop = this.frames.pop();
						if (this.frames.length === 0) {
							return result; // End of script
						}
						this.stack.splice(frameToPop!.stackStart);
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

					// 例外処理オペコード（概念実装）
					case OpCode.SETUP_EXCEPTION: {
						const catchOffset = this.readShort();
						this.handlerStack.push({
							catchAddress: this.frame.ip + catchOffset,
							finallyAddress: null, // finallyは別途実装が必要
							stackDepth: this.stack.length,
						});
						break;
					}
					case OpCode.TEARDOWN_EXCEPTION: {
						this.handlerStack.pop();
						break;
					}

					default:
						throw new Error(`VM Error: Unknown opcode ${op}`);
				}
			}
		} catch (error: any) {
			// VM内部で発生したエラー（runtimeError以外）もスタックトレースを付けて表示
			if (!error.message.includes("--- Stack Trace ---")) {
				console.error(this.runtimeError(error.message));
			} else {
				console.error(error.message);
			}
		}
	}

	private decompressData(cfData: CompiledOutputType): CompiledFunction {
		if ((cfData as CompiledFunction).chunk !== undefined) return cfData as CompiledFunction;
		return {
			name: cfData.name,
			arity: cfData.arity,
			chunk: {
				code: Compressor.decodeNumbers((cfData as CompactCompiledFunction).code),
				constants: Compressor.decodeJSON((cfData as CompactCompiledFunction).constants),
				lines: Compressor.decodeSmartPack((cfData as CompactCompiledFunction).lines),
			},
		};
	}
}
