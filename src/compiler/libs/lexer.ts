import { Token, TokenType } from "../../const/types";

export class Lexer {
	private source: string;
	private pos = 0;
	private currentChar: string | null;

	// 行と列の追跡
	private line = 1;
	private column = 1;

	private keywords: { [key: string]: TokenType } = {
		let: "KEYWORD",
		const: "KEYWORD",
		if: "KEYWORD",
		else: "KEYWORD",
		for: "KEYWORD",
		while: "KEYWORD",
		switch: "KEYWORD",
		case: "KEYWORD",
		default: "KEYWORD",
		break: "KEYWORD",
		function: "KEYWORD",
		return: "KEYWORD",
		true: "TRUE",
		false: "FALSE",
		try: "KEYWORD",
		catch: "KEYWORD",
		finally: "KEYWORD",
		throw: "KEYWORD",
	};

	constructor(source: string) {
		this.source = source;
		this.currentChar = this.source[this.pos];
	}

	private advance() {
		if (this.currentChar === "\n") {
			this.line++;
			this.column = 1;
		} else {
			this.column++;
		}
		this.pos++;
		this.currentChar = this.pos < this.source.length ? this.source[this.pos] : null;
	}

	private peek(): string | null {
		return this.pos + 1 < this.source.length ? this.source[this.pos + 1] : null;
	}

	private string(): Token {
		this.advance(); // consume opening "
		let result = "";
		while (this.currentChar !== '"' && this.currentChar !== null) {
			result += this.currentChar;
			this.advance();
		}
		if (this.currentChar === null) {
			throw new Error("Lexer Error: Unterminated string.");
		}
		this.advance(); // consume closing "
		return this.createToken("STRING", result);
	}

	// (number, skipWhitespace は変更なし)
	private number(): Token {
		let result = "";
		while (this.currentChar !== null && /\d/.test(this.currentChar)) {
			result += this.currentChar;
			this.advance();
		}
		if (this.currentChar === "." && this.peek() !== null && /\d/.test(this.peek()!)) {
			result += this.currentChar;
			this.advance();
			while (this.currentChar !== null && /\d/.test(this.currentChar)) {
				result += this.currentChar;
				this.advance();
			}
		}
		return this.createToken("NUMBER", result);
	}

	private skipWhitespace() {
		while (this.currentChar !== null && /\s/.test(this.currentChar)) {
			this.advance();
		}
	}

	// createToken ヘルパーメソッドを追加してトークン生成を簡略化
	private createToken(type: TokenType, value: string): Token {
		return { type, value, line: this.line, column: this.column };
	}

	private identifier(): Token {
		let result = "";
		while (this.currentChar !== null && /[a-zA-Z_0-9]/.test(this.currentChar)) {
			result += this.currentChar;
			this.advance();
		}
		const type = this.keywords[result] || "IDENTIFIER";
		return this.createToken(type, result);
	}

	public tokenize(): Token[] {
		const tokens: Token[] = [];
		while (this.currentChar !== null) {
			if (/\s/.test(this.currentChar)) {
				this.skipWhitespace();
				continue;
			}
			if (this.currentChar === '"') {
				tokens.push(this.string());
				continue;
			}
			if (/\d/.test(this.currentChar)) {
				tokens.push(this.number());
				continue;
			}
			if (/[a-zA-Z_]/.test(this.currentChar)) {
				tokens.push(this.identifier());
				continue;
			}

			// 演算子
			switch (this.currentChar) {
				case "=":
					tokens.push(this.peek() === "=" ? (this.advance(), this.createToken("EQUAL_EQUAL", "==")) : this.createToken("EQUALS", "="));
					break;
				case "!":
					tokens.push(this.peek() === "=" ? (this.advance(), this.createToken("BANG_EQUAL", "!=")) : this.createToken("BANG", "!"));
					break;
				case ">":
					tokens.push(this.peek() === "=" ? (this.advance(), this.createToken("GREATER_EQUAL", ">=")) : this.createToken("GREATER", ">"));
					break;
				case "<":
					tokens.push(this.peek() === "=" ? (this.advance(), this.createToken("LESS_EQUAL", "<=")) : this.createToken("LESS", "<"));
					break;
				case "&":
					tokens.push(this.peek() === "&" ? (this.advance(), this.createToken("AND", "&&")) : this.createToken("AMPERSAND", "&"));
					break;
				case "|":
					tokens.push(this.peek() === "|" ? (this.advance(), this.createToken("OR", "||")) : this.createToken("PIPE", "|"));
					break;
				case "+":
					tokens.push(this.peek() === "+" ? (this.advance(), this.createToken("PLUS_PLUS", "++")) : this.createToken("PLUS", "+"));
					break;
				case "-":
					tokens.push(this.peek() === "-" ? (this.advance(), this.createToken("MINUS_MINUS", "--")) : this.createToken("MINUS", "-"));
					break;
				case "*":
					tokens.push(this.createToken("STAR", "*"));
					break;
				case "/":
					tokens.push(this.createToken("SLASH", "/"));
					break;
				case "%":
					tokens.push(this.createToken("PERCENT", "%"));
					break;
				case "(":
					tokens.push(this.createToken("LPAREN", "("));
					break;
				case ")":
					tokens.push(this.createToken("RPAREN", ")"));
					break;
				case "{":
					tokens.push(this.createToken("LBRACE", "{"));
					break;
				case "}":
					tokens.push(this.createToken("RBRACE", "}"));
					break;
				case "[":
					tokens.push(this.createToken("LBRACKET", "["));
					break;
				case "]":
					tokens.push(this.createToken("RBRACKET", "]"));
					break;
				case ";":
					tokens.push(this.createToken("SEMICOLON", ";"));
					break;
				case ":":
					tokens.push(this.createToken("COLON", ":"));
					break;
				case ",":
					tokens.push(this.createToken("COMMA", ","));
					break;
				default:
					throw new Error(`Lexer Error: Unknown character: ${this.currentChar}`);
			}
			this.advance();
		}
		tokens.push(this.createToken("EOF", ""));
		return tokens;
	}
}
