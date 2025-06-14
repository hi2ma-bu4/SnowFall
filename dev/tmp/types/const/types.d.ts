export type TokenType = "NUMBER" | "STRING" | "IDENTIFIER" | "KEYWORD" | "PLUS" | "MINUS" | "STAR" | "SLASH" | "BANG" | "EQUALS" | "BANG_EQUAL" | "EQUAL_EQUAL" | "GREATER" | "GREATER_EQUAL" | "LESS" | "LESS_EQUAL" | "LPAREN" | "RPAREN" | "LBRACE" | "RBRACE" | "COMMA" | "SEMICOLON" | "COLON" | "EOF";
export interface Token {
    type: TokenType;
    value: string;
}
export interface AstNode {
    type: string;
}
export interface ExpressionNode extends AstNode {
}
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
export interface StatementNode extends AstNode {
}
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
export type AnyAstNode = StatementNode | ExpressionNode;
export interface CompiledFunction {
    name: string;
    arity: number;
    chunk: {
        code: number[];
        constants: any[];
    };
}
export interface CompiledOutput extends CompiledFunction {
}
export interface SnowFallSettings {
    builtInFunctions: {
        [name: string]: Function;
    };
    hooks?: {
        beforeJump?: (vm: any, jumpType: "JUMP" | "JUMP_IF_FALSE") => void;
    };
}
