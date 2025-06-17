import { ParserError } from "../../const/errors";
import {
	ArrayLiteralNode,
	AssignmentExpressionNode,
	AstNode,
	BinaryExpressionNode,
	BlockStatementNode,
	BooleanLiteralNode,
	BreakStatementNode,
	CallExpressionNode,
	ExpressionNode,
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
	StatementNode,
	StringLiteralNode,
	SwitchCaseNode,
	SwitchStatementNode,
	Token,
	TokenType,
	TryStatementNode,
	TupleLiteralNode,
	UnaryExpressionNode,
	UpdateExpressionNode,
	VariableDeclarationNode,
	WhileStatementNode,
} from "../../const/types";

// 演算子の優先順位
enum Precedence {
	LOWEST,
	ASSIGNMENT, // =
	OR, // ||
	AND, // &&
	BITWISE_OR, // |
	BITWISE_AND, // &
	EQUALS, // ==
	LESS_GREATER, // > or <
	SUM, // +
	PRODUCT, // * or / or %
	PREFIX, // -X or !X or ++X
	POSTFIX, // X++
	CALL, // myFunction(X)
	INDEX, // array[index]
}

const precedences: { [key in TokenType]?: Precedence } = {
	EQUALS: Precedence.ASSIGNMENT,
	OR: Precedence.OR,
	AND: Precedence.AND,
	PIPE: Precedence.BITWISE_OR,
	AMPERSAND: Precedence.BITWISE_AND,
	EQUAL_EQUAL: Precedence.EQUALS,
	BANG_EQUAL: Precedence.EQUALS,
	GREATER: Precedence.LESS_GREATER,
	GREATER_EQUAL: Precedence.LESS_GREATER,
	LESS: Precedence.LESS_GREATER,
	LESS_EQUAL: Precedence.LESS_GREATER,
	PLUS: Precedence.SUM,
	MINUS: Precedence.SUM,
	STAR: Precedence.PRODUCT,
	SLASH: Precedence.PRODUCT,
	PERCENT: Precedence.PRODUCT,
	PLUS_PLUS: Precedence.POSTFIX,
	MINUS_MINUS: Precedence.POSTFIX,
	LPAREN: Precedence.CALL,
	LBRACKET: Precedence.INDEX,
	DOT: Precedence.INDEX,
};

type PrefixParseFn = () => ExpressionNode;
type InfixParseFn = (expression: ExpressionNode) => ExpressionNode;

export class Parser {
	private tokens: Token[];
	private pos = 0;

	private currentToken: Token;
	private peekToken: Token;

	private prefixParseFns: Map<TokenType, PrefixParseFn>;
	private infixParseFns: Map<TokenType, InfixParseFn>;

	constructor(tokens: Token[]) {
		this.tokens = tokens;
		this.currentToken = this.tokens[0];
		this.peekToken = this.tokens[1];

		this.prefixParseFns = new Map();
		this.registerPrefix("IDENTIFIER", this.parseIdentifier);
		this.registerPrefix("NUMBER", this.parseNumericLiteral);
		this.registerPrefix("STRING", this.parseStringLiteral);
		this.registerPrefix("TRUE", this.parseBooleanLiteral);
		this.registerPrefix("FALSE", this.parseBooleanLiteral);
		this.registerPrefix("BANG", this.parsePrefixExpression);
		this.registerPrefix("MINUS", this.parsePrefixExpression);
		this.registerPrefix("PLUS_PLUS", this.parseUpdateExpression);
		this.registerPrefix("MINUS_MINUS", this.parseUpdateExpression);
		this.registerPrefix("LPAREN", this.parseGroupedOrTupleExpression);
		this.registerPrefix("LBRACKET", this.parseArrayLiteral);
		this.registerPrefix("LBRACE", this.parseObjectLiteral);

		this.infixParseFns = new Map();
		this.registerInfix("EQUALS", this.parseAssignmentExpression);
		this.registerInfix("PLUS", this.parseInfixExpression);
		this.registerInfix("MINUS", this.parseInfixExpression);
		this.registerInfix("STAR", this.parseInfixExpression);
		this.registerInfix("SLASH", this.parseInfixExpression);
		this.registerInfix("PERCENT", this.parseInfixExpression);
		this.registerInfix("EQUAL_EQUAL", this.parseInfixExpression);
		this.registerInfix("BANG_EQUAL", this.parseInfixExpression);
		this.registerInfix("GREATER", this.parseInfixExpression);
		this.registerInfix("GREATER_EQUAL", this.parseInfixExpression);
		this.registerInfix("LESS", this.parseInfixExpression);
		this.registerInfix("LESS_EQUAL", this.parseInfixExpression);
		this.registerInfix("AMPERSAND", this.parseInfixExpression);
		this.registerInfix("PIPE", this.parseInfixExpression);
		this.registerInfix("AND", this.parseLogicalExpression);
		this.registerInfix("OR", this.parseLogicalExpression);
		this.registerInfix("PLUS_PLUS", this.parseUpdateExpression);
		this.registerInfix("MINUS_MINUS", this.parseUpdateExpression);
		this.registerInfix("LPAREN", this.parseCallExpression);
		this.registerInfix("LBRACKET", this.parseMemberExpression);
		this.registerInfix("DOT", this.parseMemberExpression);
	}

	// ASTノード生成時に位置情報を含める
	private createNode<T extends AstNode>(type: T["type"], props: Omit<T, "type" | "line" | "column">): T {
		return {
			type,
			...props,
			line: this.currentToken.line,
			column: this.currentToken.column,
		} as T;
	}

	private advance() {
		this.pos++;
		this.currentToken = this.peekToken;
		if (this.pos + 1 < this.tokens.length) {
			this.peekToken = this.tokens[this.pos + 1];
		} else {
			// 最後のトークンの位置情報を利用して、ファイルの末尾を示すEOFトークンを生成します。
			this.peekToken = {
				type: "EOF",
				value: "",
				line: this.currentToken.line,
				column: this.currentToken.column + 1, // 直前のトークンの次
			};
		}
	}

	private registerPrefix(tokenType: TokenType, fn: PrefixParseFn) {
		this.prefixParseFns.set(tokenType, fn.bind(this));
	}

	private registerInfix(tokenType: TokenType, fn: InfixParseFn) {
		this.infixParseFns.set(tokenType, fn.bind(this));
	}

	private expectPeek(type: TokenType): void {
		if (this.peekToken.type === type) {
			this.advance();
		} else {
			throw new ParserError(`Expected next token to be ${type}, got ${this.peekToken.type} instead.`, this.peekToken.line, this.peekToken.column);
		}
	}

	private peekPrecedence(): Precedence {
		return precedences[this.peekToken.type] || Precedence.LOWEST;
	}

	private currentPrecedence(): Precedence {
		return precedences[this.currentToken.type] || Precedence.LOWEST;
	}

	// --- Expression Parsing ---
	private parseExpression(precedence: Precedence): ExpressionNode {
		const prefix = this.prefixParseFns.get(this.currentToken.type);
		if (!prefix) {
			throw new ParserError(`No prefix parse function for ${this.currentToken.type} found.`, this.currentToken.line, this.currentToken.column);
		}
		let leftExp: ExpressionNode = prefix();

		while (this.peekToken.type !== "SEMICOLON" && precedence < this.peekPrecedence()) {
			const infix = this.infixParseFns.get(this.peekToken.type);
			if (!infix) {
				return leftExp;
			}
			this.advance();
			leftExp = infix(leftExp);
		}
		return leftExp;
	}

	private parseIdentifier = (): IdentifierNode => {
		return this.createNode("Identifier", { name: this.currentToken.value });
	};

	private parseNumericLiteral = (): NumericLiteralNode => {
		return this.createNode("NumericLiteral", { value: parseFloat(this.currentToken.value) });
	};

	private parseStringLiteral = (): StringLiteralNode => {
		return this.createNode("StringLiteral", { value: this.currentToken.value });
	};

	private parseBooleanLiteral = (): BooleanLiteralNode => {
		return this.createNode("BooleanLiteral", { value: this.currentToken.type === "TRUE" });
	};

	private parseAssignmentExpression = (left: ExpressionNode): AssignmentExpressionNode => {
		if (left.type !== "Identifier" && left.type !== "MemberExpression") {
			throw new ParserError("Invalid assignment target.", left.line, left.column);
		}
		//const operator = this.currentToken.value;
		const precedence = this.currentPrecedence();
		this.advance();
		const right = this.parseExpression(precedence - 1);
		return this.createNode("AssignmentExpression", { left, right });
	};

	private parsePrefixExpression = (): UnaryExpressionNode => {
		const operator = this.currentToken.value;
		this.advance();
		const right = this.parseExpression(Precedence.PREFIX);
		return this.createNode("UnaryExpression", { operator, right });
	};

	private parseUpdateExpression = (left?: ExpressionNode): UpdateExpressionNode => {
		// Postfix i++
		if (left) {
			if (left.type !== "Identifier" && left.type !== "MemberExpression") {
				throw new ParserError("The left-hand side of a postfix operator must be an identifier.", left.line, left.column);
			}
			return this.createNode("UpdateExpression", {
				operator: this.currentToken.value as "++" | "--",
				argument: left as IdentifierNode,
				prefix: false,
			});
		}
		// Prefix ++i
		else {
			const operator = this.currentToken.value as "++" | "--";
			this.advance();
			if (this.currentToken.type !== "IDENTIFIER") {
				throw new ParserError("The right-hand side of a prefix operator must be an identifier.", this.currentToken.line, this.currentToken.column);
			}
			const argument = this.parseIdentifier();
			return this.createNode("UpdateExpression", { operator, argument, prefix: true });
		}
	};

	private parseInfixExpression = (left: ExpressionNode): BinaryExpressionNode => {
		const operator = this.currentToken.value;
		const precedence = this.currentPrecedence();
		this.advance();
		const right = this.parseExpression(precedence);
		return this.createNode("BinaryExpression", { left, operator, right });
	};

	private parseLogicalExpression = (left: ExpressionNode): LogicalExpressionNode => {
		const operator = this.currentToken.value as "&&" | "||";
		const precedence = this.currentPrecedence();
		this.advance();
		const right = this.parseExpression(precedence);
		return this.createNode("LogicalExpression", { left, operator, right });
	};

	private parseGroupedOrTupleExpression = (): ExpressionNode | TupleLiteralNode => {
		const startToken = this.currentToken;
		this.advance(); // consume '('
		if (this.peekToken.type === "RPAREN") {
			throw new ParserError("Empty parentheses `()` is not allowed.", startToken.line, startToken.column);
		}
		const exp = this.parseExpression(Precedence.LOWEST);
		if (this.peekToken.type === "COMMA") {
			this.advance();
			const elements: ExpressionNode[] = [exp];
			while (this.currentToken.type !== "RPAREN") {
				if (this.peekToken.type === "COMMA") this.advance();
				elements.push(this.parseExpression(Precedence.LOWEST));
			}
			this.expectPeek("RPAREN");
			return this.createNode("TupleLiteral", { elements });
		}
		this.expectPeek("RPAREN");
		return exp;
	};

	private parseCallExpression = (func: ExpressionNode): CallExpressionNode => {
		const args = this.parseExpressionList("RPAREN");
		return this.createNode("CallExpression", { callee: func, arguments: args });
	};

	private parseMemberExpression = (object: ExpressionNode): MemberExpressionNode => {
		let property: ExpressionNode;
		const isBracketAccess = this.currentToken.type === "LBRACKET";

		this.advance(); // '[' または '.' を消費

		if (isBracketAccess) {
			property = this.parseExpression(Precedence.LOWEST);
			this.expectPeek("RBRACKET");
		} else {
			// ドットアクセスの場合
			if (this.currentToken.type !== "IDENTIFIER") {
				throw new ParserError("Expected identifier after '.' operator.", this.currentToken.line, this.currentToken.column);
			}
			property = this.parseIdentifier();
		}
		return this.createNode("MemberExpression", { object, property });
	};

	private parseArrayLiteral = (): ArrayLiteralNode => {
		const elements = this.parseExpressionList("RBRACKET");
		return this.createNode("ArrayLiteral", { elements });
	};
	private parseObjectLiteral = (): ObjectLiteralNode => {
		const properties: { key: StringLiteralNode | IdentifierNode; value: ExpressionNode }[] = [];
		if (this.peekToken.type === "RBRACE") {
			this.advance();
			return this.createNode("ObjectLiteral", { properties });
		}
		this.advance(); // consume '{'
		do {
			if (this.currentToken.type === "RBRACE") break;
			if (this.currentToken.type === "COMMA") this.advance();

			if (this.currentToken.type !== "IDENTIFIER" && this.currentToken.type !== "STRING") {
				throw new ParserError("Invalid key in object literal. Must be an identifier or a string.", this.currentToken.line, this.currentToken.column);
			}
			const key = this.currentToken.type === "IDENTIFIER" ? this.parseIdentifier() : this.parseStringLiteral();

			this.expectPeek("COLON");
			this.advance();

			const value = this.parseExpression(Precedence.LOWEST);
			properties.push({ key, value });
		} while (this.peekToken.type === "COMMA");

		this.expectPeek("RBRACE");
		return this.createNode("ObjectLiteral", { properties });
	};

	private parseExpressionList(endToken: TokenType): ExpressionNode[] {
		const list: ExpressionNode[] = [];
		if (this.peekToken.type === endToken) {
			this.advance();
			return list;
		}
		this.advance();
		list.push(this.parseExpression(Precedence.LOWEST));
		while (this.peekToken.type === "COMMA") {
			this.advance();
			this.advance();
			list.push(this.parseExpression(Precedence.LOWEST));
		}
		this.expectPeek(endToken);
		return list;
	}

	// --- Statement Parsing ---
	private parseStatement(): StatementNode | null {
		if (this.currentToken.type === "SEMICOLON") {
			return this.createNode("EmptyStatement", {});
		}

		switch (this.currentToken.type) {
			case "KEYWORD":
				switch (this.currentToken.value) {
					case "let":
					case "const":
						return this.parseVariableDeclaration();
					case "return":
						return this.parseReturnStatement();
					case "if":
						return this.parseIfStatement();
					case "for":
						return this.parseForStatement();
					case "while":
						return this.parseWhileStatement();
					case "switch":
						return this.parseSwitchStatement();
					case "break":
						return this.parseBreakStatement();
					case "function":
						return this.parseFunctionDeclaration();
					case "try":
						return this.parseTryStatement();
				}
			default:
				return this.parseExpressionStatement();
		}
	}

	private parseBlockStatement = (): BlockStatementNode => {
		const body: StatementNode[] = [];
		this.advance(); // consume '{'
		while (this.currentToken.type !== "RBRACE" && this.currentToken.type !== "EOF") {
			const stmt = this.parseStatement();
			if (stmt) {
				body.push(stmt);
			}
			this.advance();
		}
		return this.createNode("BlockStatement", { body });
	};

	// if/while/switch 専用の条件式パーサー
	private parseCondition = (): ExpressionNode => {
		// '(' を期待する
		this.expectPeek("LPAREN");
		this.advance();
		// 括弧内の式をパース
		const expression = this.parseExpression(Precedence.LOWEST);
		// ')' を期待する
		this.expectPeek("RPAREN");
		return expression;
	};

	private parseVariableDeclaration = (): VariableDeclarationNode => {
		const kind = this.currentToken.value as "let" | "const";
		this.expectPeek("IDENTIFIER"); // consume 'let' or 'const'
		const identifier: IdentifierNode = this.createNode("Identifier", { name: this.currentToken.value });

		let typeAnnotation: IdentifierNode | undefined;
		if (this.peekToken.type === "COLON") {
			this.advance(); // consume ':'
			this.advance(); // at type name
			typeAnnotation = this.parseIdentifier();
		}

		let init: ExpressionNode | undefined;
		// @ts-ignore
		if (this.peekToken.type === "EQUALS") {
			this.advance(); // consume '='
			this.advance();
			init = this.parseExpression(Precedence.LOWEST);
		}

		// VariableDeclarationはセミコロンを消費しない。呼び出し元が処理する。
		return this.createNode("VariableDeclaration", { kind, identifier, typeAnnotation, init });
	};

	private parseReturnStatement = (): ReturnStatementNode => {
		this.advance(); // consume 'return'
		if (this.currentToken.type === "SEMICOLON" || this.currentToken.type === "RBRACE") {
			return this.createNode("ReturnStatement", {});
		}
		const argument = this.parseExpression(Precedence.LOWEST);
		// ReturnStatementはセミコロンを消費しない。呼び出し元が処理する。
		return this.createNode("ReturnStatement", { argument });
	};

	private parseBreakStatement = (): BreakStatementNode => {
		// `break` is a single token statement
		return this.createNode("BreakStatement", {});
	};

	private parseIfStatement = (): IfStatementNode => {
		const startToken = this.currentToken;
		const test = this.parseCondition();

		// ブロック `{` があるかチェック
		let consequence: StatementNode | null;
		if (this.peekToken.type === "LBRACE") {
			this.expectPeek("LBRACE");
			consequence = this.parseBlockStatement();
		} else {
			// `{` がない場合は、単一の文としてパース
			this.advance();
			consequence = this.parseStatement();
		}
		if (consequence === null) {
			throw new ParserError("Consequence of 'if' statement is empty.", startToken.line, startToken.column);
		}

		let alternate: StatementNode | undefined;
		const { type, value } = this.peekToken;
		if (type === "KEYWORD" && value === "else") {
			this.advance(); // consume 'else'
			if (this.peekToken.type === "KEYWORD" && this.peekToken.value === "if") {
				// 'else if' の場合、再帰的に parseIfStatement を呼ぶ
				this.advance();
				alternate = this.parseIfStatement();
			} else if (this.peekToken.type === "LBRACE") {
				// 'else { ... }' の場合
				this.expectPeek("LBRACE");
				alternate = this.parseBlockStatement();
			} else {
				// 'else ...' (単一文) の場合
				this.advance();
				alternate = this.parseStatement() || undefined;
			}
		}
		return this.createNode("IfStatement", { test, consequence, alternate });
	};

	private parseForStatement = (): ForStatementNode => {
		const startToken = this.currentToken;
		this.expectPeek("LPAREN"); // consume 'for'
		this.advance(); // at start of init

		// 1. Init
		let init: StatementNode | ExpressionNode | undefined;
		if (this.currentToken.type !== "SEMICOLON") {
			if (this.currentToken.type === "KEYWORD" && (this.currentToken.value === "let" || this.currentToken.value === "const")) {
				init = this.parseVariableDeclaration();
			} else {
				init = this.parseExpression(Precedence.LOWEST);
			}
		}
		this.expectPeek("SEMICOLON");
		this.advance();

		// 2. Test
		let test: ExpressionNode | undefined;
		if (this.currentToken.type !== "SEMICOLON") {
			test = this.parseExpression(Precedence.LOWEST);
		}
		this.expectPeek("SEMICOLON");
		this.advance(); // move to update part

		// 3. Update
		let update: ExpressionNode | undefined;
		// あとでどうにかする
		// @ts-ignore
		if (this.currentToken.type !== "RPAREN") {
			update = this.parseExpression(Precedence.LOWEST);
		}
		this.expectPeek("RPAREN");

		// 4. Body
		let body: StatementNode | null;
		if (this.peekToken.type === "LBRACE") {
			this.expectPeek("LBRACE");
			body = this.parseBlockStatement();
		} else {
			// `{` がない場合は、単一の文としてパース
			this.advance();
			body = this.parseStatement();
		}
		if (body === null) {
			throw new ParserError("Body of 'for' statement is empty.", startToken.line, startToken.column);
		}

		return this.createNode("ForStatement", { init, test, update, body });
	};

	private parseWhileStatement = (): WhileStatementNode => {
		const startToken = this.currentToken;
		const test = this.parseCondition();

		let body: StatementNode | null;
		if (this.peekToken.type === "LBRACE") {
			this.expectPeek("LBRACE");
			body = this.parseBlockStatement();
		} else {
			// `{` がない場合は、単一の文としてパース
			this.advance();
			body = this.parseStatement();
		}
		if (body === null) {
			throw new ParserError("Body of 'while' statement is empty.", startToken.line, startToken.column);
		}

		return this.createNode("WhileStatement", { test, body });
	};

	private parseSwitchStatement = (): SwitchStatementNode => {
		const discriminant = this.parseCondition();

		this.expectPeek("LBRACE");
		this.advance(); // consume '{'

		const cases: SwitchCaseNode[] = [];
		while (this.currentToken.type !== "RBRACE" && this.currentToken.type !== "EOF") {
			let test: ExpressionNode | null = null;
			if (this.currentToken.type === "KEYWORD" && this.currentToken.value === "case") {
				this.advance();
				test = this.parseExpression(Precedence.LOWEST);
			} else if (this.currentToken.type === "KEYWORD" && this.currentToken.value === "default") {
				// test is null for default
				// @ts-ignore
			} else if (this.currentToken.type === "RBRACE") {
				// RBRACEに到達した場合など
				break;
			} else {
				throw new ParserError(`Expected 'case', 'default' or '}', got ${this.currentToken.type} instead.`, this.currentToken.line, this.currentToken.column);
			}
			this.expectPeek("COLON");
			this.advance();

			const consequent: StatementNode[] = [];
			// @ts-ignore
			while (this.currentToken.type !== "RBRACE" && !(this.currentToken.type === "KEYWORD" && (this.currentToken.value === "case" || this.currentToken.value === "default"))) {
				const stmt = this.parseStatement();
				if (stmt && stmt.type !== "EmptyStatement") consequent.push(stmt);
				// The main loop in parse() will advance, so we don't do it here to avoid skipping tokens.
				// However, if the statement doesn't consume the token (like break), we need to advance.
				// @ts-ignore
				if (this.currentToken.type !== "RBRACE") {
					this.advance();
				}
			}

			cases.push(this.createNode("SwitchCase", { test, consequent }));
		}
		return this.createNode("SwitchStatement", { discriminant, cases });
	};

	private parseFunctionDeclaration = (): FunctionDeclarationNode => {
		this.advance(); // consume 'function'
		const name = this.parseIdentifier();
		this.expectPeek("LPAREN");

		// Parse parameters
		const params: { name: IdentifierNode; typeAnnotation?: IdentifierNode; defaultValue?: ExpressionNode }[] = [];
		if (this.peekToken.type !== "RPAREN") {
			this.advance(); // Move to first param
			let skipComma = true;
			do {
				// ',' があれば消費
				if (this.peekToken.type === "COMMA" && !skipComma) {
					this.advance();
					this.advance();
				} else {
					skipComma = false;
				}

				// パラメータ名
				const paramName = this.parseIdentifier();

				// 型注釈
				let typeAnnotation: IdentifierNode | undefined;
				if (this.peekToken.type === "COLON") {
					this.advance(); // consume IDENTIFIER
					this.advance(); // consume ':'
					typeAnnotation = this.parseIdentifier();
				}

				// デフォルト値
				let defaultValue: ExpressionNode | undefined;
				if (this.peekToken.type === "EQUALS") {
					this.advance(); // consume IDENTIFIER or TYPE
					this.advance(); // consume '='
					defaultValue = this.parseExpression(Precedence.LOWEST);
				}
				params.push({ name: paramName, typeAnnotation, defaultValue });
			} while (this.peekToken.type === "COMMA");
			// this.advance(); // Move to first param
			// // 1. 最初のパラメータをパース
			// let paramName = this.parseIdentifier();
			// let typeAnnotation: IdentifierNode | undefined;
			// if (this.peekToken.type === "COLON") {
			// 	this.advance(); // consume IDENTIFIER
			// 	this.advance(); // consume ':'
			// 	typeAnnotation = this.parseIdentifier();
			// }
			// params.push({ name: paramName, typeAnnotation });

			// // 2. 2つ目以降のパラメータをパース (カンマがある限り)
			// while (this.peekToken.type === "COMMA") {
			// 	this.advance(); // consume the last token of the previous parameter (its name or type)
			// 	this.advance(); // consume the COMMA

			// 	paramName = this.parseIdentifier();
			// 	typeAnnotation = undefined;
			// 	// TODO: あとでどうにかする
			// 	// @ts-ignore
			// 	if (this.peekToken.type === "COLON") {
			// 		this.advance(); // consume IDENTIFIER
			// 		this.advance(); // consume ':'
			// 		typeAnnotation = this.parseIdentifier();
			// 	}
			// 	params.push({ name: paramName, typeAnnotation });
			// }
		}
		this.expectPeek("RPAREN");

		// Parse return type
		let returnType: IdentifierNode | undefined;
		if (this.peekToken.type === "COLON") {
			this.advance(); // consume ')'
			this.advance(); // consume ':'
			returnType = this.parseIdentifier();
		}

		this.expectPeek("LBRACE");
		const body = this.parseBlockStatement();

		return this.createNode("FunctionDeclaration", { name, params, body, returnType });
	};

	private parseTryStatement = (): TryStatementNode => {
		this.expectPeek("LBRACE");
		const tryBlock = this.parseBlockStatement();

		let catchClause = null;
		const catchToken = this.peekToken;
		if (this.peekToken.type === "KEYWORD" && this.peekToken.value === "catch") {
			this.advance(); // 'catch'
			this.expectPeek("LPAREN");
			this.advance(); // '('
			const param = this.parseIdentifier();
			this.expectPeek("RPAREN");
			this.expectPeek("LBRACE");
			const body = this.parseBlockStatement();
			catchClause = { param, body };
		}

		let finallyBlock = null;
		if (this.peekToken.type === "KEYWORD" && this.peekToken.value === "finally") {
			this.advance(); // 'finally'
			this.expectPeek("LBRACE");
			finallyBlock = this.parseBlockStatement();
		}

		if (!catchClause && !finallyBlock) {
			throw new ParserError("'try' must have at least a 'catch' or 'finally' block.", catchToken.line, catchToken.column);
		}

		return this.createNode("TryStatement", { tryBlock, catchClause, finallyBlock });
	};

	private parseExpressionStatement = (): ExpressionStatementNode => {
		const expression = this.parseExpression(Precedence.LOWEST);
		// ExpressionStatementはセミコロンを消費しない。呼び出し元が処理する。
		return this.createNode("ExpressionStatement", { expression });
	};

	public parse(): ProgramNode {
		const program: ProgramNode = this.createNode("Program", { body: [] });
		console.log(this.tokens);
		while (this.currentToken.type !== "EOF") {
			// 連続するセミコロンをスキップ
			if (this.currentToken.type === "SEMICOLON") {
				this.advance();
				continue;
			}
			const stmt = this.parseStatement();
			if (stmt) {
				program.body.push(stmt);
			}
			// セミコロンで終わる文の場合、ここでセミコロンを消費
			if (this.currentToken.type !== "RBRACE" && this.peekToken.type === "SEMICOLON") {
				this.advance();
			}
			this.advance();
		}
		return program;
	}
}
