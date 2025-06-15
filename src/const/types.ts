// トークンの種類
export type TokenType =
	| "NUMBER"
	| "STRING"
	| "IDENTIFIER"
	| "KEYWORD"
	| "TRUE"
	| "FALSE"
	| "PLUS" // +
	| "MINUS" // -
	| "STAR" // *
	| "SLASH" // /
	| "PERCENT" // %
	| "BANG" // !
	| "EQUALS" // =
	| "PLUS_PLUS" // ++
	| "MINUS_MINUS" // --
	| "BANG_EQUAL" // !=
	| "EQUAL_EQUAL" // ==
	| "GREATER" // >
	| "GREATER_EQUAL" // >=
	| "LESS" // <
	| "LESS_EQUAL" // <=
	| "AMPERSAND" // &
	| "AND" // &&
	| "PIPE" // |
	| "OR" // ||
	| "LPAREN" // (
	| "RPAREN" // )
	| "LBRACE" // {
	| "RBRACE" // }
	| "LBRACKET" // [
	| "RBRACKET" // ]
	| "COMMA" // ,
	| "DOT" // .
	| "SEMICOLON" // ;
	| "COLON" // :
	| "EOF";

// トークンオブジェクト
export interface Token {
	type: TokenType;
	value: string;
	// エラー報告用の位置情報
	line: number;
	column: number;
}

// ASTノードのベース
export interface AstNode {
	type: string;
	// 全てのASTノードが位置情報を持つようにする
	line: number;
	column: number;
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
export interface BooleanLiteralNode extends ExpressionNode {
	type: "BooleanLiteral";
	value: boolean;
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
export interface AssignmentExpressionNode extends ExpressionNode {
	type: "AssignmentExpression";
	left: ExpressionNode;
	right: ExpressionNode;
}
export interface LogicalExpressionNode extends ExpressionNode {
	type: "LogicalExpression";
	operator: "&&" | "||";
	left: ExpressionNode;
	right: ExpressionNode;
}
export interface UnaryExpressionNode extends ExpressionNode {
	type: "UnaryExpression";
	operator: string;
	right: ExpressionNode;
}
export interface UpdateExpressionNode extends ExpressionNode {
	type: "UpdateExpression";
	operator: "++" | "--";
	argument: IdentifierNode;
	prefix: boolean;
}
export interface CallExpressionNode extends ExpressionNode {
	type: "CallExpression";
	callee: ExpressionNode;
	arguments: ExpressionNode[];
}
export interface MemberExpressionNode extends ExpressionNode {
	type: "MemberExpression";
	object: ExpressionNode;
	property: ExpressionNode;
}
export interface ArrayLiteralNode extends ExpressionNode {
	type: "ArrayLiteral";
	elements: ExpressionNode[];
}
export interface ObjectLiteralNode extends ExpressionNode {
	type: "ObjectLiteral";
	properties: { key: StringLiteralNode | IdentifierNode; value: ExpressionNode }[];
}
export interface TupleLiteralNode extends ExpressionNode {
	type: "TupleLiteral";
	elements: ExpressionNode[];
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
export interface EmptyStatementNode extends StatementNode {
	type: "EmptyStatement";
}
export interface VariableDeclarationNode extends StatementNode {
	type: "VariableDeclaration";
	kind: "let" | "const";
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
export interface WhileStatementNode extends StatementNode {
	type: "WhileStatement";
	test: ExpressionNode;
	body: StatementNode;
}
export interface SwitchStatementNode extends StatementNode {
	type: "SwitchStatement";
	discriminant: ExpressionNode;
	cases: SwitchCaseNode[];
}
export interface SwitchCaseNode extends AstNode {
	type: "SwitchCase";
	test: ExpressionNode | null; // null for default
	consequent: StatementNode[];
}
export interface BreakStatementNode extends StatementNode {
	type: "BreakStatement";
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
export interface TryStatementNode extends StatementNode {
	type: "TryStatement";
	tryBlock: BlockStatementNode;
	catchClause: {
		param: IdentifierNode;
		body: BlockStatementNode;
	} | null;
	finallyBlock: BlockStatementNode | null;
}

// 全ASTノードの共用体型
export type AnyAstNode = StatementNode | ExpressionNode | SwitchCaseNode;

// コンパイル済み関数オブジェクト
export interface CompiledFunction {
	name: string;
	arity: number; // 引数の数
	chunk: {
		// バイトコード
		code: number[];
		constants: any[];
		// デバッグ用の行番号マッピング
		lines: number[];
	};
}

// コンパイル済み関数を圧縮したオブジェクト
export interface CompactCompiledFunction {
	name: string;
	arity: number; // 引数の数
	code: string;
	constants: string;
	// デバッグ用の行番号マッピング
	lines: string;
}

// コンパイル済み関数の出力形式
export type CompiledOutputType = CompiledFunction | CompactCompiledFunction;

// ユーザーが拡張可能な設定オブジェクト
export interface SnowFallSettings {
	builtInFunctions: {
		[name: string]: Function;
	};
	// VM実行フック (デバッグや動作制御用)
	hooks?: {
		beforeJump?: (vm: any, jumpType: "JUMP" | "JUMP_IF_FALSE") => void;
	};
	// 出力に関する設定
	output?: {
		// 結果を圧縮するか
		compact?: boolean;
	};
}
