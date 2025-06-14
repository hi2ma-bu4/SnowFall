import { BinaryExpressionNode, BlockStatementNode, CallExpressionNode, ExpressionNode, ExpressionStatementNode, ForStatementNode, FunctionDeclarationNode, IdentifierNode, IfStatementNode, NumericLiteralNode, ProgramNode, ReturnStatementNode, StatementNode, StringLiteralNode, Token, TokenType, UnaryExpressionNode, VariableDeclarationNode } from "../../const/types";

// 演算子の優先順位
enum Precedence {
	LOWEST,
	EQUALS, // ==
	LESS_GREATER, // > or <
	SUM, // +
	PRODUCT, // *
	PREFIX, // -X or !X
	CALL, // myFunction(X)
	INDEX, // array[index]
}

const precedences: { [key in TokenType]?: Precedence } = {
	EQUAL_EQUAL: Precedence.EQUALS,
	BANG_EQUAL: Precedence.EQUALS,
	GREATER: Precedence.LESS_GREATER,
	GREATER_EQUAL: Precedence.LESS_GREATER,
	LESS: Precedence.LESS_GREATER,
	LESS_EQUAL: Precedence.LESS_GREATER,
	PLUS: Precedence.SUM,
	MINUS: Precedence.SUM,
	SLASH: Precedence.PRODUCT,
	STAR: Precedence.PRODUCT,
	LPAREN: Precedence.CALL,
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
		this.registerPrefix("BANG", this.parsePrefixExpression);
		this.registerPrefix("MINUS", this.parsePrefixExpression);
		this.registerPrefix("LPAREN", this.parseGroupedExpression);

		this.infixParseFns = new Map();
		this.registerInfix("PLUS", this.parseInfixExpression);
		this.registerInfix("MINUS", this.parseInfixExpression);
		this.registerInfix("SLASH", this.parseInfixExpression);
		this.registerInfix("STAR", this.parseInfixExpression);
		this.registerInfix("EQUAL_EQUAL", this.parseInfixExpression);
		this.registerInfix("BANG_EQUAL", this.parseInfixExpression);
		this.registerInfix("GREATER", this.parseInfixExpression);
		this.registerInfix("GREATER_EQUAL", this.parseInfixExpression);
		this.registerInfix("LESS", this.parseInfixExpression);
		this.registerInfix("LESS_EQUAL", this.parseInfixExpression);
		this.registerInfix("LPAREN", this.parseCallExpression);
	}

	private advance() {
		this.pos++;
		this.currentToken = this.peekToken;
		this.peekToken = this.pos + 1 < this.tokens.length ? this.tokens[this.pos + 1] : { type: "EOF", value: "" };
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
			throw new Error(`Parser Error: Expected next token to be ${type}, got ${this.peekToken.type} instead.`);
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
			throw new Error(`Parser Error: No prefix parse function for ${this.currentToken.type} found.`);
		}
		let leftExp = prefix();

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
		return { type: "Identifier", name: this.currentToken.value };
	};

	private parseNumericLiteral = (): NumericLiteralNode => {
		return { type: "NumericLiteral", value: parseFloat(this.currentToken.value) };
	};

	private parseStringLiteral = (): StringLiteralNode => {
		return { type: "StringLiteral", value: this.currentToken.value };
	};

	private parsePrefixExpression = (): UnaryExpressionNode => {
		const operator = this.currentToken.value;
		this.advance();
		const right = this.parseExpression(Precedence.PREFIX);
		return { type: "UnaryExpression", operator, right };
	};

	private parseInfixExpression = (left: ExpressionNode): BinaryExpressionNode => {
		const operator = this.currentToken.value;
		const precedence = this.currentPrecedence();
		this.advance();
		const right = this.parseExpression(precedence);
		return { type: "BinaryExpression", left, operator, right };
	};

	private parseGroupedExpression = (): ExpressionNode => {
		this.advance(); // consume '('
		const exp = this.parseExpression(Precedence.LOWEST);
		this.expectPeek("RPAREN");
		return exp;
	};

	private parseCallExpression = (func: ExpressionNode): CallExpressionNode => {
		const args = this.parseExpressionList("RPAREN");
		return { type: "CallExpression", callee: func, arguments: args };
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
		switch (this.currentToken.type) {
			case "KEYWORD":
				switch (this.currentToken.value) {
					case "let":
						return this.parseVariableDeclaration();
					case "return":
						return this.parseReturnStatement();
					case "if":
						return this.parseIfStatement();
					case "for":
						return this.parseForStatement();
					case "function":
						return this.parseFunctionDeclaration();
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
		return { type: "BlockStatement", body };
	};

	private parseVariableDeclaration = (): VariableDeclarationNode => {
		this.expectPeek("IDENTIFIER"); // consume 'let'
		const identifier: IdentifierNode = { type: "Identifier", name: this.currentToken.value };
		//this.advance();

		let typeAnnotation: IdentifierNode | undefined;
		if (this.peekToken.type === "COLON") {
			this.advance(); // consume ':'
			this.advance(); // at type name
			typeAnnotation = this.parseIdentifier();
		}
		const { type } = this.peekToken;
		if (type !== "EQUALS") {
			return { type: "VariableDeclaration", identifier, typeAnnotation };
		}

		this.expectPeek("EQUALS");
		this.advance();

		const init = this.parseExpression(Precedence.LOWEST);

		if (this.peekToken.type === "SEMICOLON") {
			this.advance();
		}
		return { type: "VariableDeclaration", identifier, typeAnnotation, init };
	};

	private parseReturnStatement = (): ReturnStatementNode => {
		this.advance(); // consume 'return'
		if (this.currentToken.type === "SEMICOLON") {
			return { type: "ReturnStatement" };
		}
		const argument = this.parseExpression(Precedence.LOWEST);
		if (this.peekToken.type === "SEMICOLON") {
			this.advance();
		}
		return { type: "ReturnStatement", argument };
	};

	private parseIfStatement = (): IfStatementNode => {
		this.expectPeek("LPAREN"); // consume 'if'
		//this.advance();
		const test = this.parseGroupedExpression();

		this.expectPeek("LBRACE");
		const consequence = this.parseBlockStatement();

		let alternate: StatementNode | undefined;
		const { type, value } = this.peekToken;
		if (type === "KEYWORD" && value === "else") {
			this.advance(); // consume 'else'
			if (this.peekToken.type === "KEYWORD" && this.peekToken.value === "if") {
				// else if
				this.advance();
				alternate = this.parseIfStatement();
			} else {
				this.expectPeek("LBRACE");
				alternate = this.parseBlockStatement();
			}
		}
		return { type: "IfStatement", test, consequence, alternate };
	};

	private parseForStatement = (): ForStatementNode => {
		this.expectPeek("LPAREN"); // consume 'for'
		this.advance(); // at start of init

		let init: StatementNode | ExpressionNode | undefined;
		if (this.currentToken.type !== "SEMICOLON") {
			if (this.currentToken.type === "KEYWORD" && this.currentToken.value === "let") {
				init = this.parseVariableDeclaration();
			} else {
				init = this.parseExpression(Precedence.LOWEST);
			}
		}
		this.expectPeek("SEMICOLON");
		this.advance();

		let test: ExpressionNode | undefined;
		if (this.currentToken.type !== "SEMICOLON") {
			test = this.parseExpression(Precedence.LOWEST);
		}
		this.expectPeek("SEMICOLON");
		this.advance();

		let update: ExpressionNode | undefined;
		if (this.currentToken.type !== "RPAREN") {
			update = this.parseExpression(Precedence.LOWEST);
		}
		this.expectPeek("RPAREN");

		this.expectPeek("LBRACE");
		const body = this.parseBlockStatement();

		return { type: "ForStatement", init, test, update, body };
	};

	private parseFunctionDeclaration = (): FunctionDeclarationNode => {
		this.advance(); // consume 'function'
		const name = this.parseIdentifier();
		this.expectPeek("LPAREN");

		// Parse parameters
		const params: IdentifierNode[] = [];
		if (this.peekToken.type !== "RPAREN") {
			this.advance();
			do {
				this.advance();
				params.push(this.parseIdentifier());
			} while (this.peekToken.type === "COMMA");
		}
		this.expectPeek("RPAREN");

		this.expectPeek("LBRACE");
		const body = this.parseBlockStatement();

		return { type: "FunctionDeclaration", name, params, body };
	};

	private parseExpressionStatement = (): ExpressionStatementNode => {
		const expression = this.parseExpression(Precedence.LOWEST);
		if (this.peekToken.type === "SEMICOLON") {
			this.advance();
		}
		return { type: "ExpressionStatement", expression };
	};

	public parse(): ProgramNode {
		const program: ProgramNode = { type: "Program", body: [] };
		console.log(this.tokens);
		while (this.currentToken.type !== "EOF") {
			const stmt = this.parseStatement();
			if (stmt) {
				program.body.push(stmt);
			}
			this.advance();
		}
		return program;
	}
}
