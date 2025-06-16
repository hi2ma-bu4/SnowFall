import { OpCode } from "../const/opcodes";
import {
	AnyAstNode,
	ArrayLiteralNode,
	AssignmentExpressionNode,
	BinaryExpressionNode,
	BlockStatementNode,
	BooleanLiteralNode,
	BreakStatementNode,
	CallExpressionNode,
	CompiledFunction,
	CompiledOutputType,
	ExpressionStatementNode,
	ForStatementNode,
	FunctionDeclarationNode,
	IdentifierNode,
	IfStatementNode,
	LogicalExpressionNode,
	MemberExpressionNode,
	NumericLiteralNode,
	ObjectLiteralNode,
	ProgramNode,
	ReturnStatementNode,
	SnowFallSettings,
	StatementNode,
	StringLiteralNode,
	SwitchStatementNode,
	TryStatementNode,
	UnaryExpressionNode,
	UpdateExpressionNode,
	VariableDeclarationNode,
	WhileStatementNode,
} from "../const/types";
import { Compressor } from "../util/compressor";

// -- Symbol Table for Scope Management --
class SymbolValue {
	constructor(public name: string, public depth: number, public index: number, public isConst: boolean) {}
}

class SymbolTable {
	public store: Map<string, SymbolValue> = new Map();
	public parent?: SymbolTable;
	public localCount = 0;
	private parentLocalCount = 0;

	constructor(parent?: SymbolTable) {
		this.parent = parent;
		if (parent) {
			this.parentLocalCount = parent.parentLocalCount + parent.localCount;
		}
	}

	define(name: string, depth: number, isConst: boolean): SymbolValue {
		const index = this.parentLocalCount + this.localCount;
		const symbol = new SymbolValue(name, depth, index, isConst);
		this.store.set(name, symbol);
		this.localCount++;
		return symbol;
	}

	resolve(name: string): SymbolValue | null {
		const symbol = this.store.get(name);
		if (symbol) {
			return symbol;
		}
		if (this.parent) {
			return this.parent.resolve(name);
		}
		return null;
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

	private loopContext: { loopStart: number; exitJumps: number[] }[] = [];

	private currentNode: AnyAstNode;

	constructor(ast: StatementNode, settings: SnowFallSettings, parent: Compiler | null = null) {
		this.ast = ast;
		this.currentNode = ast;
		console.log(ast);
		this.settings = settings;
		this.parentCompiler = parent;
		this.symbolTable = new SymbolTable(parent?.symbolTable);
		this.scopeDepth = parent ? parent.scopeDepth + 1 : 0;

		const isFunction = ast.type === "FunctionDeclaration";
		const funcNode = isFunction ? (ast as FunctionDeclarationNode) : null;
		const funcName = isFunction ? funcNode!.name.name : "main";
		const arity = isFunction ? funcNode!.params.length : 0;

		this.compiledFunction = { name: funcName, arity, chunk: { code: [], constants: [], lines: [] } };

		// Reserve stack slot 0 for the function/script itself.
		if (isFunction) {
			this.symbolTable.define(funcName, this.scopeDepth, true);
		} else {
			this.symbolTable.define("main", this.scopeDepth, true);
		}

		// For functions, define params in symbol table and add type checks
		if (isFunction) {
			// Params are not const by default
			funcNode!.params.forEach((p, index) => {
				// Define param in symbol table
				const paramSymbol = this.symbolTable.define(p.name.name, this.scopeDepth, false);

				// Add type check if annotation exists
				if (p.typeAnnotation) {
					const typeName = p.typeAnnotation.name;
					if (typeName.toLowerCase() !== "any") {
						this.emitBytes(OpCode.GET_LOCAL, paramSymbol.index); // Get the parameter's value
						this.emitBytes(OpCode.CHECK_TYPE, this.addConstant(typeName));
						this.emit(OpCode.POP); // Pop the value after check, as it's not needed on the stack
					}
				}
			});
		}
	}

	private currentChunk() {
		return this.compiledFunction.chunk;
	}
	private emit(byte: number) {
		const chunk = this.currentChunk();
		chunk.code.push(byte);
		chunk.lines.push(this.currentNode.line);
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
		this.emit(OpCode.LOOP);
		const offset = this.currentChunk().code.length - loopStart + 2;
		if (offset > 0xffff) throw new Error("Compiler Error: Loop body too large.");
		this.emit((offset >> 8) & 0xff);
		this.emit(offset & 0xff);
	}

	private beginScope() {
		this.scopeDepth++;
		this.symbolTable = new SymbolTable(this.symbolTable);
	}
	private endScope() {
		const popCount = this.symbolTable.localCount;
		// Don't pop locals if they are returned
		const lastOp = this.currentChunk().code[this.currentChunk().code.length - 1];
		if (lastOp !== OpCode.RETURN) {
			for (let i = 0; i < popCount; i++) {
				this.emit(OpCode.POP);
			}
		}

		this.scopeDepth--;
		if (this.symbolTable.parent) {
			this.symbolTable = this.symbolTable.parent;
		}
	}

	// --- Node Compilation ---
	private compileNode(node: AnyAstNode): void {
		const previousNode = this.currentNode;
		this.currentNode = node;
		switch (node.type) {
			case "Program":
				this.compileStatements((node as ProgramNode).body);
				break;
			case "EmptyStatement":
				break;
			case "BlockStatement":
				this.beginScope();
				this.compileStatements((node as BlockStatementNode).body);
				this.endScope();
				break;
			case "ExpressionStatement":
				this.compileNode((node as ExpressionStatementNode).expression);
				this.emit(OpCode.POP);
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
			case "BooleanLiteral":
				this.emit((node as BooleanLiteralNode).value ? OpCode.PUSH_TRUE : OpCode.PUSH_FALSE);
				break;
			case "ArrayLiteral":
				this.compileArrayLiteral(node as ArrayLiteralNode);
				break;
			case "ObjectLiteral":
				this.compileObjectLiteral(node as ObjectLiteralNode);
				break;
			case "IfStatement":
				this.compileIfStatement(node as IfStatementNode);
				break;
			case "ForStatement":
				this.compileForStatement(node as ForStatementNode);
				break;
			case "WhileStatement":
				this.compileWhileStatement(node as WhileStatementNode);
				break;
			case "SwitchStatement":
				this.compileSwitchStatement(node as SwitchStatementNode);
				break;
			case "BreakStatement":
				this.compileBreakStatement(node as BreakStatementNode);
				break;
			case "FunctionDeclaration":
				if (this.ast.type === "FunctionDeclaration" && node === this.ast) {
					this.compileStatements((node as FunctionDeclarationNode).body.body);
					break;
				}
				this.compileFunctionDeclaration(node as FunctionDeclarationNode);
				break;
			case "ReturnStatement":
				this.compileReturnStatement(node as ReturnStatementNode);
				break;
			case "CallExpression":
				this.compileCallExpression(node as CallExpressionNode);
				break;
			case "MemberExpression":
				this.compileMemberExpression(node as MemberExpressionNode);
				break;
			case "AssignmentExpression":
				this.compileAssignmentExpression(node as AssignmentExpressionNode);
				break;
			case "UnaryExpression":
				this.compileUnaryExpression(node as UnaryExpressionNode);
				break;
			case "UpdateExpression":
				this.compileUpdateExpression(node as UpdateExpressionNode);
				break;
			case "BinaryExpression":
				this.compileBinaryExpression(node as BinaryExpressionNode);
				break;
			case "LogicalExpression":
				this.compileLogicalExpression(node as LogicalExpressionNode);
				break;
			case "TryStatement":
				this.compileTryStatement(node as TryStatementNode);
				break;
			default:
				throw new Error(`Compiler Error: Unknown AST node type: ${(node as any).type}`);
		}
		this.currentNode = previousNode;
	}

	private compileStatements(statements: StatementNode[]): void {
		statements.forEach((stmt) => this.compileNode(stmt));
	}

	private compileVariableDeclaration(node: VariableDeclarationNode): void {
		if (node.init) {
			this.compileNode(node.init);
		} else {
			this.emit(OpCode.PUSH_NULL);
		}

		// 実行時型チェックのコードを挿入
		if (node.typeAnnotation) {
			const typeName = node.typeAnnotation.name;
			if (typeName.toLowerCase() !== "any") {
				this.emit(OpCode.DUP);
				this.emitBytes(OpCode.CHECK_TYPE, this.addConstant(typeName));
			}
		}

		if (this.scopeDepth === 0) {
			// Global
			this.emitBytes(OpCode.DEFINE_GLOBAL, this.addConstant(node.identifier.name));
		} else {
			// Local
			this.symbolTable.define(node.identifier.name, this.scopeDepth, node.kind === "const");
		}
	}

	private compileIdentifier(node: IdentifierNode): void {
		if (this.settings.builtInFunctions[node.name]) {
			// It's a built-in function
			return;
		}

		const symbol = this.symbolTable.resolve(node.name);
		if (symbol) {
			// It's a local variable
			this.emitBytes(OpCode.GET_LOCAL, symbol.index);
		} else {
			// Assume it's a global
			this.emitBytes(OpCode.GET_GLOBAL, this.addConstant(node.name));
		}
	}

	private compileAssignmentExpression(node: AssignmentExpressionNode): void {
		this.compileNode(node.right);
		if (node.left.type === "Identifier") {
			const name = (node.left as IdentifierNode).name;
			const symbol = this.symbolTable.resolve(name);
			if (symbol) {
				if (symbol.isConst) {
					throw new Error(`Compiler Error: Cannot assign to constant variable '${name}'.`);
				}
				this.emitBytes(OpCode.SET_LOCAL, symbol.index);
			} else {
				this.emitBytes(OpCode.SET_GLOBAL, this.addConstant(name));
			}
		} else if (node.left.type === "MemberExpression") {
			const memberNode = node.left as MemberExpressionNode;
			this.compileNode(memberNode.object);
			this.compileNode(memberNode.property);
			this.emit(OpCode.SET_PROPERTY);
		} else {
			throw new Error("Compiler Error: Invalid assignment target.");
		}
	}

	private compileUpdateExpression(node: UpdateExpressionNode): void {
		const { argument, operator, prefix } = node;

		if (argument.type !== "Identifier") {
			// In the future, this could be extended to support MemberExpression (e.g., obj.prop++)
			throw new Error("Compiler Error: Update expressions currently only support identifiers.");
		}
		const symbol = this.symbolTable.resolve(argument.name);

		// ローカル変数かグローバル変数かを判断して処理を分岐
		const isLocal = !!symbol;

		if (isLocal && symbol.isConst) {
			throw new Error(`Compiler Error: Cannot assign to constant variable '${argument.name}'.`);
		}

		// 変数の種類に応じて適切なオペコードと引数を設定
		const getOp = isLocal ? OpCode.GET_LOCAL : OpCode.GET_GLOBAL;
		const getArg = isLocal ? symbol.index : this.addConstant(argument.name);
		const setOp = isLocal ? OpCode.SET_LOCAL : OpCode.SET_GLOBAL;
		const setArg = isLocal ? symbol.index : this.addConstant(argument.name);

		// 1. 変数の現在の値を取得してスタックにプッシュ
		this.emitBytes(getOp, getArg);

		// 2. ポストフィックス (i++) の場合、インクリメント前の値をスタックに残すため、
		//    値を取得してプッシュする
		if (!prefix) {
			this.emitBytes(getOp, getArg);
		}
		// 3. インクリメント/デクリメントを実行
		this.emitConstant(1);
		this.emit(operator === "++" ? OpCode.ADD : OpCode.SUBTRACT);

		// 4. 計算結果を新しい値として変数にセット
		this.emitBytes(setOp, setArg);

		// 5. 式としての評価値をスタックトップに残す
		if (!prefix) {
			this.emit(OpCode.POP);
		}
	}

	private compileArrayLiteral(node: ArrayLiteralNode): void {
		node.elements.forEach((el) => this.compileNode(el));
		this.emitBytes(OpCode.BUILD_ARRAY, node.elements.length);
	}

	private compileObjectLiteral(node: ObjectLiteralNode): void {
		node.properties.forEach((prop) => {
			this.emitConstant((prop.key as StringLiteralNode).value);
			this.compileNode(prop.value);
		});
		this.emitBytes(OpCode.BUILD_OBJECT, node.properties.length);
	}

	private compileMemberExpression(node: MemberExpressionNode): void {
		this.compileNode(node.object);
		if (node.property.type === "Identifier") {
			this.emitConstant((node.property as IdentifierNode).name);
		} else {
			this.compileNode(node.property);
		}
		this.emit(OpCode.GET_PROPERTY);
	}

	private compileIfStatement(node: IfStatementNode): void {
		this.compileNode(node.test);
		const jumpIfFalse = this.emitJump(OpCode.JUMP_IF_FALSE);
		this.emit(OpCode.POP); // Pop test result

		this.compileNode(node.consequence);

		if (node.alternate) {
			const jumpToEnd = this.emitJump(OpCode.JUMP);
			this.patchJump(jumpIfFalse);
			this.emit(OpCode.POP); // Pop test result if it was false
			this.compileNode(node.alternate);
			this.patchJump(jumpToEnd);
		} else {
			this.patchJump(jumpIfFalse);
			this.emit(OpCode.POP); // Pop test result if it was false
		}
	}

	private compileForStatement(node: ForStatementNode): void {
		this.beginScope();
		// 1. Init
		if (node.init) {
			this.compileNode(node.init);
			// variable declaration produces no value on stack, expression does.
			if (node.init.type !== "VariableDeclaration") {
				this.emit(OpCode.POP);
			}
		}

		const loopStart = this.currentChunk().code.length;
		this.loopContext.push({ loopStart, exitJumps: [] });

		// 2. Test
		let exitJump = -1;
		if (node.test) {
			this.compileNode(node.test);
			exitJump = this.emitJump(OpCode.JUMP_IF_FALSE);
			this.emit(OpCode.POP); // Pop test result
		}

		// 3. Body
		this.compileNode(node.body);

		// 4. Update
		if (node.update) {
			this.compileNode(node.update);
			this.emit(OpCode.POP); // Pop update expression result
		}

		this.emitLoop(loopStart);

		if (exitJump !== -1) {
			this.patchJump(exitJump);
			this.emit(OpCode.POP); // Pop the condition result
		}

		const currentLoop = this.loopContext.pop()!;
		currentLoop.exitJumps.forEach((offset) => this.patchJump(offset));

		this.endScope();
	}

	private compileWhileStatement(node: WhileStatementNode): void {
		const loopStart = this.currentChunk().code.length;
		this.loopContext.push({ loopStart, exitJumps: [] });

		this.compileNode(node.test);
		const exitJump = this.emitJump(OpCode.JUMP_IF_FALSE);
		this.emit(OpCode.POP); // Pop test result

		this.compileNode(node.body);
		this.emitLoop(loopStart);

		this.patchJump(exitJump);
		this.emit(OpCode.POP); // Pop test result

		// Patch all break statements
		const currentLoop = this.loopContext.pop()!;
		currentLoop.exitJumps.forEach((offset) => this.patchJump(offset));
	}

	private compileSwitchStatement(node: SwitchStatementNode): void {
		this.compileNode(node.discriminant);
		this.loopContext.push({ loopStart: -1, exitJumps: [] }); // Use loop context for breaks

		const defaultCase = node.cases.find((c) => c.test === null);
		const caseFailJumps: number[] = [];

		let skipCompile = false;

		for (const switchCase of node.cases) {
			if (switchCase.test === null) {
				continue;
			}

			if (caseFailJumps.length > 0) {
				this.patchJump(caseFailJumps.pop()!);
				this.emit(OpCode.POP);
			}

			if (!skipCompile) {
				this.emit(OpCode.DUP);
				this.compileNode(switchCase.test);
				this.emit(OpCode.EQUAL);
			}

			const failJump = this.emitJump(OpCode.JUMP_IF_FALSE);
			caseFailJumps.push(failJump);

			this.emit(OpCode.POP); // Pop comparison result (true)
			this.compileStatements(switchCase.consequent);
			skipCompile = false;
			const lastType = switchCase.consequent[switchCase.consequent.length - 1].type;
			if (lastType !== "BreakStatement" && lastType !== "ReturnStatement") {
				skipCompile = true;
			}
		}

		const jumpOverDefault = this.emitJump(OpCode.JUMP);

		if (caseFailJumps.length > 0) {
			this.patchJump(caseFailJumps.pop()!);
			this.emit(OpCode.POP);
		}

		if (defaultCase) {
			this.compileStatements(defaultCase.consequent);
		}

		this.patchJump(jumpOverDefault);
		const currentLoop = this.loopContext.pop()!;
		currentLoop.exitJumps.forEach((offset) => this.patchJump(offset));

		this.emit(OpCode.POP); // Pop the discriminant value
	}

	private compileBreakStatement(node: BreakStatementNode): void {
		if (this.loopContext.length === 0) {
			throw new Error("Compiler Error: 'break' statement outside of a loop or switch.");
		}
		const exitJump = this.emitJump(OpCode.JUMP);
		this.loopContext[this.loopContext.length - 1].exitJumps.push(exitJump);
	}

	private compileFunctionDeclaration(node: FunctionDeclarationNode): void {
		const compiler = new Compiler(node, this.settings, this);
		compiler.compile();

		const funcConstantIndex = this.addConstant(compiler.compiledFunction);
		this.emitBytes(OpCode.PUSH_CONST, funcConstantIndex);

		if (this.scopeDepth === 0) {
			this.emitBytes(OpCode.DEFINE_GLOBAL, this.addConstant(node.name.name));
		} else {
			this.symbolTable.define(node.name.name, this.scopeDepth, false); // Functions are not const
		}
	}

	private compileReturnStatement(node: ReturnStatementNode): void {
		if (node.argument) {
			this.compileNode(node.argument);
		} else {
			this.emit(OpCode.PUSH_NULL);
		}

		// Add return type check if the current compilation context is a function with a return type
		if (this.ast.type === "FunctionDeclaration") {
			const funcNode = this.ast as FunctionDeclarationNode;
			if (funcNode.returnType) {
				const typeName = funcNode.returnType.name;
				if (typeName.toLowerCase() !== "any") {
					// The return value is on top of the stack. CHECK_TYPE will peek at it.
					this.emit(OpCode.DUP);
					this.emitBytes(OpCode.CHECK_TYPE, this.addConstant(typeName));
				}
			}
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
		switch (node.operator) {
			case "!":
				this.compileNode(node.right);
				this.emit(OpCode.NEGATE);
				break;
			case "-":
				// Implement as `0 - expression`
				this.emitConstant(0);
				this.compileNode(node.right);
				this.emit(OpCode.SUBTRACT);
				break; // Conceptual: 0 - X
			default:
				throw new Error(`Compiler Error: Unknown unary operator ${node.operator}`);
		}
	}

	private compileBinaryExpression(node: BinaryExpressionNode): void {
		// 両辺が数値リテラルの場合、コンパイル時に計算する
		if (node.left.type === "NumericLiteral" && node.right.type === "NumericLiteral") {
			const leftVal = (node.left as NumericLiteralNode).value;
			const rightVal = (node.right as NumericLiteralNode).value;
			let result: number | null = null;
			switch (node.operator) {
				case "+":
					result = leftVal + rightVal;
					break;
				case "-":
					result = leftVal - rightVal;
					break;
				case "*":
					result = leftVal * rightVal;
					break;
				case "/":
					result = rightVal !== 0 ? leftVal / rightVal : null;
					break;
				case "%":
					result = rightVal !== 0 ? leftVal % rightVal : null;
					break;
			}
			if (result !== null) {
				this.emitConstant(result);
				return; // VMでの計算をスキップ
			}
		}
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
			case "%":
				this.emit(OpCode.MODULO);
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
			case "&":
				this.emit(OpCode.BITWISE_AND);
				break;
			case "|":
				this.emit(OpCode.BITWISE_OR);
				break;
			default:
				throw new Error(`Compiler Error: Unknown binary operator ${node.operator}`);
		}
	}

	private compileLogicalExpression(node: LogicalExpressionNode): void {
		if (node.operator === "&&") {
			this.compileNode(node.left);
			const endJump = this.emitJump(OpCode.JUMP_IF_FALSE);
			this.emit(OpCode.POP);
			this.compileNode(node.right);
			this.patchJump(endJump);
		} else if (node.operator === "||") {
			this.compileNode(node.left);
			const elseJump = this.emitJump(OpCode.JUMP_IF_FALSE);
			const endJump = this.emitJump(OpCode.JUMP);
			this.patchJump(elseJump);
			this.emit(OpCode.POP);
			this.compileNode(node.right);
			this.patchJump(endJump);
		}
	}

	// Try/Catch/Finally のコンパイル（簡易的な概念実装）
	private compileTryStatement(node: TryStatementNode): void {
		// これは非常に複雑なため、概念的な実装のみ示します。
		// 実際には、例外ハンドラテーブルと連携する詳細なジャンプ制御が必要です。

		const catchJump = this.emitJump(OpCode.SETUP_EXCEPTION); // catchブロックへのジャンプ先を設定
		this.compileNode(node.tryBlock);
		this.emit(OpCode.TEARDOWN_EXCEPTION); // 例外ハンドラを解除
		const endJump = this.emitJump(OpCode.JUMP); // finallyまたは末尾へ

		// Catchブロック
		this.patchJump(catchJump);
		if (node.catchClause) {
			// 例外オブジェクトをスタックからローカル変数へ束縛する処理
			this.beginScope();
			this.symbolTable.define(node.catchClause.param.name, this.scopeDepth, false);
			this.compileNode(node.catchClause.body);
			this.endScope();
		}

		// Finallyブロック（try/catchの両方から実行される必要がある）
		this.patchJump(endJump);
		if (node.finallyBlock) {
			this.compileNode(node.finallyBlock);
		}
	}

	private compressData(): CompiledOutputType {
		if (!this.settings.output?.compact) {
			return this.compiledFunction;
		}

		return {
			name: this.compiledFunction.name,
			arity: this.compiledFunction.arity,
			code: Compressor.encodeNumbers(this.compiledFunction.chunk.code),
			constants: Compressor.encodeJSON(this.compiledFunction.chunk.constants),
			lines: Compressor.encodeSmartPack(this.compiledFunction.chunk.lines),
		};
	}

	// --- Public API ---
	public compile(): CompiledOutputType {
		this.compileNode(this.ast);
		if (this.ast.type === "Program" || this.ast.type === "FunctionDeclaration") {
			this.emit(OpCode.PUSH_NULL);
			this.emit(OpCode.RETURN);
		}
		return this.compressData();
	}
}
