import { OpCode } from "../const/opcodes";
import { CompiledFunction, CompiledOutputType } from "../const/types";
import CompiledDataHandler from "../util/compileddatahandler";
import jsonExtended from "../util/jsonextended";

// --- Helper for Operator Precedence ---
enum Precedence {
	LOWEST,
	ASSIGNMENT,
	OR,
	AND,
	EQUALS,
	LESS_GREATER,
	SUM,
	PRODUCT,
	PREFIX,
	CALL,
	INDEX,
}

const opPrecedence: { [key in OpCode]?: Precedence } = {
	[OpCode.BITWISE_OR]: Precedence.OR,
	[OpCode.BITWISE_AND]: Precedence.AND,
	[OpCode.EQUAL]: Precedence.EQUALS,
	[OpCode.NOT_EQUAL]: Precedence.EQUALS,
	[OpCode.GREATER_THAN]: Precedence.LESS_GREATER,
	[OpCode.GREATER_EQUAL]: Precedence.LESS_GREATER,
	[OpCode.LESS_THAN]: Precedence.LESS_GREATER,
	[OpCode.LESS_EQUAL]: Precedence.LESS_GREATER,
	[OpCode.ADD]: Precedence.SUM,
	[OpCode.SUBTRACT]: Precedence.SUM,
	[OpCode.MULTIPLY]: Precedence.PRODUCT,
	[OpCode.DIVIDE]: Precedence.PRODUCT,
	[OpCode.MODULO]: Precedence.PRODUCT,
};

/**
 * コンパイルされたバイトコードからソースコードを復元（デコンパイル）します
 */
export class Decompiler {
	private func: CompiledFunction;
	private indentLevel = 0;
	private static decompileCache = new Map<string, string>();
	private instructions: any[] = [];
	private localNames = new Map<number, string>();

	constructor(compiledOutput: CompiledOutputType) {
		this.func = CompiledDataHandler.decompress(compiledOutput);
	}

	private indent(): string {
		return "  ".repeat(this.indentLevel);
	}

	private valueToString(value: any): string {
		if (typeof value === "string") return JSON.stringify(value);
		if (typeof value === "bigint") return `${value}n`;
		if (value === null) return "null";

		if (typeof value === "object" && value !== null && (value.chunk || value.code)) {
			const funcKey = jsonExtended.stringify(value);
			const cached = Decompiler.decompileCache.get(funcKey);
			if (cached && !cached.includes("{ ... }")) return cached;

			Decompiler.decompileCache.set(funcKey, `function ${value.name || "(anonymous)"}(...) { ... }`);
			const nestedDecompiler = new Decompiler(value as CompiledOutputType);
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

	private decompileExpression(startIp: number, endIp: number): string {
		const opcodes = this.instructions.slice(startIp, endIp);
		if (opcodes.length === 0) return "";

		const stack: { text: string; precedence: Precedence }[] = [];

		for (let i = 0; i < opcodes.length; i++) {
			if (i + 2 < opcodes.length && opcodes[i].op === OpCode.DUP && opcodes[i + 1].op === OpCode.CHECK_TYPE && opcodes[i + 2].op === OpCode.POP) {
				i += 2; // Skip this pattern
				continue;
			}

			const { op, operand } = opcodes[i];
			let handled = false;
			switch (op) {
				case OpCode.PUSH_CONST:
					stack.push({ text: this.valueToString(operand), precedence: Precedence.LOWEST });
					handled = true;
					break;
				case OpCode.PUSH_TRUE:
					stack.push({ text: "true", precedence: Precedence.LOWEST });
					handled = true;
					break;
				case OpCode.PUSH_FALSE:
					stack.push({ text: "false", precedence: Precedence.LOWEST });
					handled = true;
					break;
				case OpCode.PUSH_NULL:
					stack.push({ text: "null", precedence: Precedence.LOWEST });
					handled = true;
					break;
				case OpCode.GET_GLOBAL:
				case OpCode.GET_LOCAL:
					stack.push({ text: operand, precedence: Precedence.LOWEST });
					handled = true;
					break;
				case OpCode.BUILD_ARRAY: {
					const elements = stack.splice(stack.length - operand).map((s) => s.text);
					stack.push({ text: `[${elements.join(", ")}]`, precedence: Precedence.LOWEST });
					handled = true;
					break;
				}
				case OpCode.GET_PROPERTY: {
					const prop = stack.pop()!;
					const obj = stack.pop()!;
					let text = `${obj.text}[${prop.text}]`; // default to bracket notation
					if (prop.text.startsWith('"') && prop.text.endsWith('"')) {
						const propName = prop.text.slice(1, -1);
						if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(propName)) {
							text = `${obj.text}.${propName}`;
						}
					}
					stack.push({ text, precedence: Precedence.INDEX });
					handled = true;
					break;
				}
				case OpCode.NEGATE: {
					const expr = stack.pop()!;
					const text = `!${expr.precedence > Precedence.PREFIX ? `(${expr.text})` : expr.text}`;
					stack.push({ text, precedence: Precedence.PREFIX });
					handled = true;
					break;
				}
				case OpCode.CALL: {
					const args = stack.splice(stack.length - operand).map((s) => s.text);
					const callee = stack.pop()!;
					const text = `${callee.text}(${args.join(", ")})`;
					stack.push({ text, precedence: Precedence.CALL });
					handled = true;
					break;
				}
			}

			if (handled) continue;

			const opPrec = opPrecedence[op as OpCode];
			if (opPrec) {
				// Binary operation
				const b = stack.pop()!;
				const a = stack.pop()!;
				const opStr = this.opToBinaryOperator(op);

				// Corrected precedence check
				const aText = a.precedence < opPrec ? a.text : `(${a.text})`;
				const bText = b.precedence <= opPrec ? b.text : `(${b.text})`;

				stack.push({ text: `${aText} ${opStr} ${bText}`, precedence: opPrec });
			}
		}
		return stack[0]?.text || "";
	}

	private decompileStatementAt(ip: number): { statement: string; nextIp: number } {
		// --- 1. Scan forward to find the end of the logical statement/structure ---
		let endOfStatementIp = ip;
		let statementType = "unknown";

		// Prioritize stronger terminators like DEFINE_GLOBAL
		let defineGlobalIp = -1;
		let popIp = -1;

		for (let i = ip; i < this.instructions.length; i++) {
			const currentOp = this.instructions[i].op;
			if (currentOp === OpCode.DEFINE_GLOBAL) {
				defineGlobalIp = i;
				break;
			}
			if (currentOp === OpCode.POP && popIp === -1) {
				popIp = i;
			}
			if (currentOp === OpCode.RETURN) {
				endOfStatementIp = i;
				statementType = "return";
				break;
			}
		}

		if (defineGlobalIp !== -1) {
			statementType = "declaration";
			endOfStatementIp = defineGlobalIp;
		} else if (popIp !== -1) {
			statementType = "expression";
			endOfStatementIp = popIp;
		} else if (statementType === "unknown" && ip < this.instructions.length && this.instructions[ip].op === OpCode.RETURN) {
			statementType = "return";
			endOfStatementIp = ip;
		}

		switch (statementType) {
			case "declaration": {
				const varName = this.instructions[endOfStatementIp].operand;

				let typeAnnotation = "";
				const checkTypeInstr = this.instructions.slice(ip, endOfStatementIp).find((instr) => instr.op === OpCode.CHECK_TYPE);

				// Use the operand directly, don't use valueToString. Guard against undefined.
				if (checkTypeInstr && checkTypeInstr.operand) {
					typeAnnotation = `:${checkTypeInstr.operand}`;
				}

				const valueStr = this.decompileExpression(ip, endOfStatementIp);

				const statement = `${this.indent()}let ${varName}${typeAnnotation} = ${valueStr};\n`;
				return { statement, nextIp: endOfStatementIp + 1 };
			}

			case "expression": {
				const expression = this.decompileExpression(ip, endOfStatementIp);
				const statement = expression ? `${this.indent()}${expression};\n` : "";
				return { statement, nextIp: endOfStatementIp + 1 };
			}

			case "return": {
				const arg = this.decompileExpression(ip, endOfStatementIp);
				const statement = `${this.indent()}return${arg ? " " + arg : ""};\n`;
				return { statement, nextIp: endOfStatementIp + 1 };
			}
		}

		if (ip < this.instructions.length) {
			const { op } = this.instructions[ip];
			return { statement: `${this.indent()}/* Unknown Op: ${OpCode[op]} */\n`, nextIp: ip + 1 };
		}
		return { statement: "", nextIp: ip + 1 };
	}

	private decompileBlock(startIp: number, endIp: number): string {
		let blockOutput = "";
		let ip = startIp;
		while (ip < endIp && ip < this.instructions.length) {
			const result = this.decompileStatementAt(ip);
			blockOutput += result.statement;
			ip = result.nextIp;
		}
		return blockOutput;
	}

	public decompile(): string {
		const { code, constants } = this.func.chunk;
		const funcKey = jsonExtended.stringify({ name: this.func.name, arity: this.func.arity, code, constants });
		const cached = Decompiler.decompileCache.get(funcKey);
		if (cached && !cached.includes("{ ... }")) return cached;

		// --- 1. Instruction Stream Pre-processing ---
		this.instructions = [];
		for (let ip = 0; ip < code.length; ) {
			const offset = ip;
			const op = code[ip++];
			let operand: any,
				size = 1;
			switch (op) {
				case OpCode.PUSH_CONST:
				case OpCode.DEFINE_GLOBAL:
				case OpCode.GET_GLOBAL:
				case OpCode.SET_GLOBAL:
					operand = constants[code[ip++]];
					size = 2;
					break;
				case OpCode.BUILD_ARRAY:
				case OpCode.BUILD_TUPLE:
				case OpCode.BUILD_OBJECT:
				case OpCode.GET_LOCAL:
				case OpCode.SET_LOCAL:
				case OpCode.CALL:
					operand = code[ip++];
					size = 2;
					break;
				case OpCode.JUMP:
				case OpCode.JUMP_IF_FALSE:
				case OpCode.SETUP_EXCEPTION:
				case OpCode.LOOP:
					operand = (code[ip] << 8) | code[ip + 1];
					ip += 2;
					size = 3;
					break;
			}
			this.instructions.push({ op, operand, offset, size });
		}

		const last = this.instructions[this.instructions.length - 1];
		if (last?.op === OpCode.RETURN) {
			const lastValueInstr = this.instructions[this.instructions.length - 2];
			if (lastValueInstr?.op === OpCode.PUSH_NULL) {
				this.instructions.splice(-2, 2);
			}
		}

		// --- 2. Resolve Local Variable Names ---
		this.localNames.clear();
		if (this.func.name !== "main") {
			this.localNames.set(0, this.func.name);
			for (let i = 0; i < this.func.arity; i++) this.localNames.set(i + 1, `param_${i + 1}`);
		}
		let nextLocalIndex = this.localNames.size;
		this.instructions.forEach((instr) => {
			if (instr.op === OpCode.GET_LOCAL || instr.op === OpCode.SET_LOCAL) {
				if (!this.localNames.has(instr.operand)) {
					this.localNames.set(instr.operand, `local_${nextLocalIndex++}`);
				}
				instr.operand = this.localNames.get(instr.operand);
			}
		});

		// --- 3. Start Decompilation ---
		let output = "";
		if (this.func.name !== "main") {
			const params = Array.from({ length: this.func.arity }, (_, i) => this.localNames.get(i + 1) || `param_${i + 1}`);
			output += `${this.indent()}function ${this.func.name}(${params.join(", ")}) {\n`;
			this.indentLevel++;
		}

		output += this.decompileBlock(0, this.instructions.length);

		if (this.func.name !== "main") {
			this.indentLevel--;
			output += `${this.indent()}}\n`;
		}

		Decompiler.decompileCache.set(funcKey, output);
		return output;
	}
}
