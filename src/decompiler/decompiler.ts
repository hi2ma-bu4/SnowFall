import { OpCode } from "../const/opcodes";
import { CompiledFunction, CompiledOutputType } from "../const/types";
import CompiledDataHandler from "../util/compileddatahandler";

/**
 * コンパイルされたバイトコードからソースコードを復元（デコンパイル）します。
 */
export class Decompiler {
	private func: CompiledFunction;
	private indentLevel = 0;
	private static decompileCache = new Map<string, string>();

	constructor(compiledOutput: CompiledOutputType) {
		this.func = CompiledDataHandler.decompress(compiledOutput);
	}

	private indent(): string {
		return "  ".repeat(this.indentLevel);
	}

	private valueToString(value: any): string {
		if (typeof value === "string") {
			return `"${value.replace(/"/g, '\\"')}"`;
		}
		if (typeof value === "bigint") {
			return `${value}n`;
		}
		if (value === null) {
			return "null";
		}
		if (typeof value === "object" && value !== null && value.chunk) {
			const funcKey = JSON.stringify(value);
			if (Decompiler.decompileCache.has(funcKey)) {
				return Decompiler.decompileCache.get(funcKey)!;
			}
			const nestedDecompiler = new Decompiler(value as CompiledFunction);
			const decompiledCode = nestedDecompiler.decompile();
			Decompiler.decompileCache.set(funcKey, decompiledCode);
			return decompiledCode;
		}
		return String(value);
	}

	private opToBinaryOperator(op: OpCode): string {
		const map: { [key in OpCode]?: string } = {
			[OpCode.ADD]: "+",
			[OpCode.SUBTRACT]: "-",
			[OpCode.MULTIPLY]: "*",
			[OpCode.DIVIDE]: "/",
			[OpCode.MODULO]: "%",
			[OpCode.EQUAL]: "==",
			[OpCode.NOT_EQUAL]: "!=",
			[OpCode.GREATER_THAN]: ">",
			[OpCode.GREATER_EQUAL]: ">=",
			[OpCode.LESS_THAN]: "<",
			[OpCode.LESS_EQUAL]: "<=",
			[OpCode.BITWISE_AND]: "&",
			[OpCode.BITWISE_OR]: "|",
		};
		return map[op] || "?";
	}

	public decompile(): string {
		const { code, constants } = this.func.chunk;
		const funcKey = JSON.stringify({ code, constants });
		if (Decompiler.decompileCache.has(funcKey)) {
			return Decompiler.decompileCache.get(funcKey)!;
		}

		let output = "";
		const expressionStack: string[] = [];
		const localNames = new Map<number, string>();
		localNames.set(0, this.func.name || "(script)");
		for (let i = 0; i < this.func.arity; i++) {
			localNames.set(i + 1, `param_${i}`);
		}
		const getLocalName = (slot: number): string => {
			if (!localNames.has(slot)) {
				localNames.set(slot, `local_${slot}`);
			}
			return localNames.get(slot)!;
		};

		if (this.func.name !== "main") {
			const params = Array.from({ length: this.func.arity }, (_, i) => getLocalName(i + 1));
			output += `${this.indent()}function ${this.func.name}(${params.join(", ")}) {\n`;
			this.indentLevel++;
		}

		let ip = 0;
		while (ip < code.length) {
			const currentOp = code[ip];

			// 修正点: 型チェックのための DUP -> CHECK_TYPE -> POP パターンを検出してスキップ
			if (ip + 3 < code.length && currentOp === OpCode.DUP && code[ip + 1] === OpCode.CHECK_TYPE && code[ip + 3] === OpCode.POP) {
				// このシーケンスは型チェックのためだけに使われ、ソースコード上の文には対応しない
				// DUP(1), CHECK_TYPE(1), operand(1), POP(1) の4バイトをスキップ
				ip += 4;
				continue;
			}

			ip++; // 命令を消費
			switch (currentOp) {
				case OpCode.PUSH_CONST:
					expressionStack.push(this.valueToString(constants[code[ip++]]));
					break;
				case OpCode.PUSH_TRUE:
					expressionStack.push("true");
					break;
				case OpCode.PUSH_FALSE:
					expressionStack.push("false");
					break;
				case OpCode.PUSH_NULL:
					expressionStack.push("null");
					break;
				case OpCode.POP: {
					const expr = expressionStack.pop();
					if (expr) {
						output += `${this.indent()}${expr};\n`;
					}
					break;
				}
				case OpCode.DUP:
					expressionStack.push(expressionStack[expressionStack.length - 1]);
					break;
				case OpCode.DEFINE_GLOBAL: {
					const name = constants[code[ip++]];
					const value = expressionStack.pop() || "null";
					output += `${this.indent()}let ${name} = ${value};\n`;
					break;
				}
				case OpCode.GET_GLOBAL:
					expressionStack.push(constants[code[ip++]]);
					break;
				case OpCode.SET_GLOBAL: {
					const name = constants[code[ip++]];
					const value = expressionStack.pop();
					expressionStack.push(`${name} = ${value}`);
					break;
				}
				case OpCode.GET_LOCAL:
					expressionStack.push(getLocalName(code[ip++]));
					break;
				case OpCode.SET_LOCAL: {
					const slot = code[ip++];
					const name = getLocalName(slot);
					const value = expressionStack.pop();
					expressionStack.push(`${name} = ${value}`);
					break;
				}
				case OpCode.BUILD_ARRAY: {
					const itemCount = code[ip++];
					const elements = expressionStack.splice(expressionStack.length - itemCount, itemCount);
					expressionStack.push(`[${elements.join(", ")}]`);
					break;
				}
				case OpCode.BUILD_TUPLE: {
					const itemCount = code[ip++];
					const elements = expressionStack.splice(expressionStack.length - itemCount, itemCount);
					expressionStack.push(`(${elements.join(", ")})`);
					break;
				}
				case OpCode.BUILD_OBJECT: {
					const pairCount = code[ip++];
					const properties: string[] = [];
					for (let i = 0; i < pairCount; i++) {
						const value = expressionStack.pop();
						const key = expressionStack.pop();
						properties.unshift(`${key}: ${value}`);
					}
					expressionStack.push(`{ ${properties.join(", ")} }`);
					break;
				}
				case OpCode.GET_PROPERTY: {
					const property = expressionStack.pop();
					const object = expressionStack.pop();
					if (property && property.startsWith('"') && property.endsWith('"')) {
						const propName = property.slice(1, -1);
						if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(propName)) {
							expressionStack.push(`${object}.${propName}`);
							break;
						}
					}
					expressionStack.push(`${object}[${property}]`);
					break;
				}
				case OpCode.SET_PROPERTY: {
					const value = expressionStack.pop();
					const property = expressionStack.pop();
					const object = expressionStack.pop();
					const assignment = `${object}[${property}] = ${value}`;
					expressionStack.push(assignment);
					break;
				}
				case OpCode.ADD:
				case OpCode.SUBTRACT:
				case OpCode.MULTIPLY:
				case OpCode.DIVIDE:
				case OpCode.MODULO:
				case OpCode.EQUAL:
				case OpCode.NOT_EQUAL:
				case OpCode.GREATER_THAN:
				case OpCode.GREATER_EQUAL:
				case OpCode.LESS_THAN:
				case OpCode.LESS_EQUAL:
				case OpCode.BITWISE_AND:
				case OpCode.BITWISE_OR: {
					const b = expressionStack.pop();
					const a = expressionStack.pop();
					expressionStack.push(`(${a} ${this.opToBinaryOperator(currentOp)} ${b})`);
					break;
				}
				case OpCode.NEGATE: {
					const expr = expressionStack.pop();
					expressionStack.push(`!(${expr})`);
					break;
				}
				case OpCode.CALL: {
					const argCount = code[ip++];
					const args = expressionStack.splice(expressionStack.length - argCount, argCount);
					const callee = expressionStack.pop();
					expressionStack.push(`${callee}(${args.join(", ")})`);
					break;
				}
				case OpCode.RETURN: {
					if (ip < code.length) {
						const value = expressionStack.pop();
						output += `${this.indent()}return${value ? " " + value : ""};\n`;
					}
					break;
				}
				// JUMP, LOOPなどの複雑な制御フローの復元は、
				// 更なる解析が必要なため、この修正ではまだ完全ではありません。
				// しかし、変数宣言に関する破損はこれで解消されます。
				default:
					break;
			}
		}

		if (this.func.name !== "main") {
			this.indentLevel--;
			output += `${this.indent()}}\n`;
		}

		Decompiler.decompileCache.set(funcKey, output);
		return output;
	}
}
