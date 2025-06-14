// トークンの種類
export type TokenType = "NUMBER" | "STRING" | "IDENTIFIER" | "KEYWORD" | "PLUS" | "MINUS" | "STAR" | "SLASH" | "BANG" | "EQUALS" | "BANG_EQUAL" | "EQUAL_EQUAL" | "GREATER" | "GREATER_EQUAL" | "LESS" | "LESS_EQUAL" | "LPAREN" | "RPAREN" | "LBRACE" | "RBRACE" | "COMMA" | "SEMICOLON" | "COLON" | "EOF";

// トークンオブジェクト
export interface Token {
	type: TokenType;
	value: string;
}

// ASTノードのベース
export interface AstNode {
	type: string;
}

// 式
export interface ExpressionNode extends AstNode {}
export interface NumericLiteralNode extends ExpressionNode {
	type: "NumericLiteral";
	value: number;
}
export interface StringLiteralNode extends ExpressionNode {
	type: "StringLiteral";
	value: string;
}
export interface IdentifierNode extends ExpressionNode {
	type: "Identifier";
	name: string;
}
export interface BinaryExpressionNode extends ExpressionNode {
	type: "BinaryExpression";
	operator: string;
	left: ExpressionNode;
	right: ExpressionNode;
}
export interface UnaryExpressionNode extends ExpressionNode {
	type: "UnaryExpression";
	operator: string;
	right: ExpressionNode;
}
export interface CallExpressionNode extends ExpressionNode {
	type: "CallExpression";
	callee: ExpressionNode;
	arguments: ExpressionNode[];
}

// 文
export interface StatementNode extends AstNode {}
export interface ProgramNode extends StatementNode {
	type: "Program";
	body: StatementNode[];
}
export interface ExpressionStatementNode extends StatementNode {
	type: "ExpressionStatement";
	expression: ExpressionNode;
}
export interface BlockStatementNode extends StatementNode {
	type: "BlockStatement";
	body: StatementNode[];
}
export interface VariableDeclarationNode extends StatementNode {
	type: "VariableDeclaration";
	identifier: IdentifierNode;
	typeAnnotation?: IdentifierNode;
	init?: ExpressionNode;
}
export interface IfStatementNode extends StatementNode {
	type: "IfStatement";
	test: ExpressionNode;
	consequence: StatementNode;
	alternate?: StatementNode;
}
export interface ForStatementNode extends StatementNode {
	type: "ForStatement";
	init?: StatementNode | ExpressionNode;
	test?: ExpressionNode;
	update?: ExpressionNode;
	body: StatementNode;
}
export interface FunctionDeclarationNode extends StatementNode {
	type: "FunctionDeclaration";
	name: IdentifierNode;
	params: IdentifierNode[];
	body: BlockStatementNode;
}
export interface ReturnStatementNode extends StatementNode {
	type: "ReturnStatement";
	argument?: ExpressionNode;
}

// 全ASTノードの共用体型
export type AnyAstNode = StatementNode | ExpressionNode;

// コンパイル済み関数オブジェクト
export interface CompiledFunction {
	name: string;
	arity: number; // 引数の数
	chunk: {
		// バイトコード
		code: number[];
		constants: any[];
	};
}

// コンパイル後の出力形式
export interface CompiledOutput extends CompiledFunction {}

// ユーザーが拡張可能な設定オブジェクト
export interface SnowFallSettings {
	builtInFunctions: {
		[name: string]: Function;
	};
	// VM実行フック (デバッグや動作制御用)
	hooks?: {
		beforeJump?: (vm: any, jumpType: "JUMP" | "JUMP_IF_FALSE") => void;
	};
}
