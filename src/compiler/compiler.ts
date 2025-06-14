import { OpCode } from "../const/opcodes";
import { AnyAstNode, BinaryExpressionNode, BlockStatementNode, CallExpressionNode, CompiledFunction, ExpressionStatementNode, ForStatementNode, FunctionDeclarationNode, IdentifierNode, IfStatementNode, NumericLiteralNode, ProgramNode, ReturnStatementNode, SnowFallSettings, StatementNode, StringLiteralNode, UnaryExpressionNode, VariableDeclarationNode } from "../const/types";

// -- Symbol Table for Scope Management --
class SymbolValue {
	constructor(public name: string, public depth: number, public index: number) {}
}

class SymbolTable {
	public store: Map<string, SymbolValue> = new Map();
	public parent?: SymbolTable;
	public localCount = 0;

	constructor(parent?: SymbolTable) {
		this.parent = parent;
	}

	define(name: string, depth: number): SymbolValue {
		const symbol = new SymbolValue(name, depth, this.localCount++);
		this.store.set(name, symbol);
		return symbol;
	}

	resolve(name: string): { symbol: SymbolValue; isLocal: boolean } | null {
		const symbol = this.store.get(name);
		if (symbol) {
			return { symbol, isLocal: true };
		}
		if (this.parent) {
			return this.parent.resolve(name);
		}
		return null; // Assumed to be global
	}
}

export class Compiler {
	private ast: StatementNode;
	private settings: SnowFallSettings;

	// Compilation context
	private compiledFunction: CompiledFunction;
	private parentCompiler: Compiler | null;
	private symbolTable: SymbolTable;
	private scopeDepth = 0;

	constructor(ast: StatementNode, settings: SnowFallSettings, parent: Compiler | null = null) {
		this.ast = ast;
		console.log(ast);
		this.settings = settings;
		this.parentCompiler = parent;
		this.symbolTable = new SymbolTable(parent?.symbolTable);
		this.scopeDepth = parent ? parent.scopeDepth + 1 : 0;

		const funcName = ast.type === "FunctionDeclaration" ? (ast as FunctionDeclarationNode).name.name : "main";
		const arity = ast.type === "FunctionDeclaration" ? (ast as FunctionDeclarationNode).params.length : 0;

		this.compiledFunction = { name: funcName, arity, chunk: { code: [], constants: [] } };

		// For functions, define params in symbol table
		if (ast.type === "FunctionDeclaration") {
			(ast as FunctionDeclarationNode).params.forEach((p) => this.symbolTable.define(p.name, this.scopeDepth));
		}
	}

	private currentChunk() {
		return this.compiledFunction.chunk;
	}
	private emit(byte: number) {
		this.currentChunk().code.push(byte);
	}
	private emitBytes(...bytes: number[]) {
		bytes.forEach((b) => this.emit(b));
	}

	private addConstant(value: any): number {
		const constants = this.currentChunk().constants;
		// Check if constant already exists
		const existingIndex = constants.findIndex((c) => c === value);
		if (existingIndex !== -1) return existingIndex;
		return constants.push(value) - 1;
	}

	private emitConstant(value: any) {
		this.emitBytes(OpCode.PUSH_CONST, this.addConstant(value));
	}

	private emitJump(instruction: OpCode): number {
		this.emit(instruction);
		this.emit(0xff);
		this.emit(0xff); // placeholder
		return this.currentChunk().code.length - 2;
	}
	private patchJump(offset: number) {
		const jump = this.currentChunk().code.length - offset - 2;
		if (jump > 0xffff) throw new Error("Compiler Error: Too much code to jump over.");
		this.currentChunk().code[offset] = (jump >> 8) & 0xff;
		this.currentChunk().code[offset + 1] = jump & 0xff;
	}
	private emitLoop(loopStart: number) {
		this.emit(OpCode.JUMP);
		const offset = this.currentChunk().code.length - loopStart + 2;
		if (offset > 0xffff) throw new Error("Compiler Error: Loop body too large.");
		this.emit((offset >> 8) & 0xff);
		this.emit(offset & 0xff);
	}

	private beginScope() {
		this.scopeDepth++;
	}
	private endScope() {
		const popCount = Array.from(this.symbolTable.store.values()).filter((s) => s.depth === this.scopeDepth).length;
		for (let i = 0; i < popCount; i++) {
			this.emit(OpCode.POP);
		}
		this.scopeDepth--;
	}

	// --- Node Compilation ---
	private compileNode(node: AnyAstNode): void {
		switch (node.type) {
			case "Program":
				this.compileStatements((node as ProgramNode).body);
				break;
			case "BlockStatement":
				this.compileStatements((node as BlockStatementNode).body);
				break;
			case "ExpressionStatement":
				this.compileExpressionStatement(node as ExpressionStatementNode);
				break;
			case "VariableDeclaration":
				this.compileVariableDeclaration(node as VariableDeclarationNode);
				break;
			case "Identifier":
				this.compileIdentifier(node as IdentifierNode);
				break;
			case "NumericLiteral":
				this.emitConstant((node as NumericLiteralNode).value);
				break;
			case "StringLiteral":
				this.emitConstant((node as StringLiteralNode).value);
				break;
			case "IfStatement":
				this.compileIfStatement(node as IfStatementNode);
				break;
			case "ForStatement":
				this.compileForStatement(node as ForStatementNode);
				break;
			case "FunctionDeclaration":
				this.compileFunctionDeclaration(node as FunctionDeclarationNode);
				break;
			case "ReturnStatement":
				this.compileReturnStatement(node as ReturnStatementNode);
				break;
			case "CallExpression":
				this.compileCallExpression(node as CallExpressionNode);
				break;
			case "UnaryExpression":
				this.compileUnaryExpression(node as UnaryExpressionNode);
				break;
			case "BinaryExpression":
				this.compileBinaryExpression(node as BinaryExpressionNode);
				break;
			default:
				throw new Error(`Compiler Error: Unknown AST node type: ${(node as any).type}`);
		}
	}

	private compileStatements(statements: StatementNode[]): void {
		statements.forEach((stmt) => this.compileNode(stmt));
	}

	private compileExpressionStatement(node: ExpressionStatementNode): void {
		this.compileNode(node.expression);
		this.emit(OpCode.POP); // Pop the result of the expression
	}

	private compileVariableDeclaration(node: VariableDeclarationNode): void {
		if (node.init) {
			this.compileNode(node.init);
		} else {
			this.emit(OpCode.PUSH_NULL);
		}
		if (this.scopeDepth === 0) {
			// Global
			this.emitBytes(OpCode.DEFINE_GLOBAL, this.addConstant(node.identifier.name));
		} else {
			// Local
			this.symbolTable.define(node.identifier.name, this.scopeDepth);
		}
	}

	private compileIdentifier(node: IdentifierNode): void {
		if (this.settings.builtInFunctions[node.name]) {
			// It's a built-in function
			return;
		}

		const resolution = this.symbolTable.resolve(node.name);
		if (resolution) {
			// It's a local variable
			this.emitBytes(OpCode.GET_LOCAL, resolution.symbol.index);
		} else {
			// Assume it's a global
			this.emitBytes(OpCode.GET_GLOBAL, this.addConstant(node.name));
		}
	}

	private compileIfStatement(node: IfStatementNode): void {
		this.compileNode(node.test);
		const jumpIfFalse = this.emitJump(OpCode.JUMP_IF_FALSE);

		this.compileNode(node.consequence);

		if (node.alternate) {
			const jumpToEnd = this.emitJump(OpCode.JUMP);
			this.patchJump(jumpIfFalse);
			this.compileNode(node.alternate);
			this.patchJump(jumpToEnd);
		} else {
			this.patchJump(jumpIfFalse);
		}
	}

	private compileForStatement(node: ForStatementNode): void {
		this.beginScope();
		if (node.init) this.compileNode(node.init);

		const loopStart = this.currentChunk().code.length;

		let exitJump = -1;
		if (node.test) {
			this.compileNode(node.test);
			exitJump = this.emitJump(OpCode.JUMP_IF_FALSE);
		}

		this.compileNode(node.body);

		if (node.update) {
			this.compileNode(node.update);
			this.emit(OpCode.POP); // Pop update expression result
		}

		this.emitLoop(loopStart);

		if (exitJump !== -1) {
			this.patchJump(exitJump);
			this.emit(OpCode.POP); // Pop the condition result
		}
		this.endScope();
	}

	private compileFunctionDeclaration(node: FunctionDeclarationNode): void {
		// A placeholder for the function declaration AST node itself
		const funcAST: any = { ...node, type: "FunctionDeclaration" };

		const compiler = new Compiler(funcAST, this.settings, this);
		compiler.compile(); // This compiles the function body

		const funcConstantIndex = this.addConstant(compiler.compiledFunction);
		this.emitBytes(OpCode.PUSH_CONST, funcConstantIndex);

		if (this.scopeDepth === 0) {
			this.emitBytes(OpCode.DEFINE_GLOBAL, this.addConstant(node.name.name));
		} else {
			this.symbolTable.define(node.name.name, this.scopeDepth);
		}
	}

	private compileReturnStatement(node: ReturnStatementNode): void {
		if (node.argument) {
			this.compileNode(node.argument);
		} else {
			this.emit(OpCode.PUSH_NULL);
		}
		this.emit(OpCode.RETURN);
	}

	private compileCallExpression(node: CallExpressionNode): void {
		this.compileNode(node.callee);
		for (const arg of node.arguments) {
			this.compileNode(arg);
		}

		// Check if it's a built-in function
		if (node.callee.type === "Identifier" && this.settings.builtInFunctions[(node.callee as IdentifierNode).name]) {
			const funcNameIndex = this.addConstant((node.callee as IdentifierNode).name);
			this.emitBytes(OpCode.CALL_BUILTIN, funcNameIndex, node.arguments.length);
		} else {
			this.emitBytes(OpCode.CALL, node.arguments.length);
		}
	}

	private compileUnaryExpression(node: UnaryExpressionNode): void {
		this.compileNode(node.right);
		switch (node.operator) {
			case "!":
				this.emit(OpCode.NEGATE);
				break;
			case "-":
				this.emit(OpCode.NEGATE);
				this.emit(OpCode.SUBTRACT);
				break; // Conceptual: 0 - X
			default:
				throw new Error(`Compiler Error: Unknown unary operator ${node.operator}`);
		}
	}

	private compileBinaryExpression(node: BinaryExpressionNode): void {
		this.compileNode(node.left);
		this.compileNode(node.right);
		switch (node.operator) {
			case "+":
				this.emit(OpCode.ADD);
				break;
			case "-":
				this.emit(OpCode.SUBTRACT);
				break;
			case "*":
				this.emit(OpCode.MULTIPLY);
				break;
			case "/":
				this.emit(OpCode.DIVIDE);
				break;
			case "==":
				this.emit(OpCode.EQUAL);
				break;
			case "!=":
				this.emit(OpCode.NOT_EQUAL);
				break;
			case "<":
				this.emit(OpCode.LESS_THAN);
				break;
			case "<=":
				this.emit(OpCode.LESS_EQUAL);
				break;
			case ">":
				this.emit(OpCode.GREATER_THAN);
				break;
			case ">=":
				this.emit(OpCode.GREATER_EQUAL);
				break;
			default:
				throw new Error(`Compiler Error: Unknown binary operator ${node.operator}`);
		}
	}

	// --- Public API ---
	public compile(): CompiledFunction {
		if (this.ast.type === "Program") {
			this.compileNode(this.ast);
			this.emit(OpCode.PUSH_NULL);
			this.emit(OpCode.RETURN);
		} else if (this.ast.type === "FunctionDeclaration") {
			this.compileNode((this.ast as FunctionDeclarationNode).body);
			// Implicit return at the end of a function
			this.emit(OpCode.PUSH_NULL);
			this.emit(OpCode.RETURN);
		}
		return this.compiledFunction;
	}
}
