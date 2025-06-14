import { Token, TokenType } from "../../const/types";

export class Lexer {
	private source: string;
	private pos = 0;
	private currentChar: string | null;

	private keywords: { [key: string]: TokenType } = {
		let: "KEYWORD",
		if: "KEYWORD",
		else: "KEYWORD",
		for: "KEYWORD",
		function: "KEYWORD",
		return: "KEYWORD",
	};

	constructor(source: string) {
		this.source = source;
		this.currentChar = this.source[this.pos];
	}

	private advance() {
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
		return { type: "STRING", value: result };
	}

	// (number, skipWhitespace は変更なし)
	private number(): Token {
		let result = "";
		while (this.currentChar !== null && /\d/.test(this.currentChar)) {
			result += this.currentChar;
			this.advance();
		}
		return { type: "NUMBER", value: result };
	}

	private skipWhitespace() {
		while (this.currentChar !== null && /\s/.test(this.currentChar)) {
			this.advance();
		}
	}

	private identifier(): Token {
		let result = "";
		while (this.currentChar !== null && /[a-zA-Z_0-9]/.test(this.currentChar)) {
			result += this.currentChar;
			this.advance();
		}
		const type = this.keywords[result] || "IDENTIFIER";
		return { type, value: result };
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
					tokens.push(this.peek() === "=" ? (this.advance(), { type: "EQUAL_EQUAL", value: "==" }) : { type: "EQUALS", value: "=" });
					break;
				case "!":
					tokens.push(this.peek() === "=" ? (this.advance(), { type: "BANG_EQUAL", value: "!=" }) : { type: "BANG", value: "!" });
					break;
				case ">":
					tokens.push(this.peek() === "=" ? (this.advance(), { type: "GREATER_EQUAL", value: ">=" }) : { type: "GREATER", value: ">" });
					break;
				case "<":
					tokens.push(this.peek() === "=" ? (this.advance(), { type: "LESS_EQUAL", value: "<=" }) : { type: "LESS", value: "<" });
					break;
				case "+":
					tokens.push({ type: "PLUS", value: "+" });
					break;
				case "-":
					tokens.push({ type: "MINUS", value: "-" });
					break;
				case "*":
					tokens.push({ type: "STAR", value: "*" });
					break;
				case "/":
					tokens.push({ type: "SLASH", value: "/" });
					break;
				case "(":
					tokens.push({ type: "LPAREN", value: "(" });
					break;
				case ")":
					tokens.push({ type: "RPAREN", value: ")" });
					break;
				case "{":
					tokens.push({ type: "LBRACE", value: "{" });
					break;
				case "}":
					tokens.push({ type: "RBRACE", value: "}" });
					break;
				case ";":
					tokens.push({ type: "SEMICOLON", value: ";" });
					break;
				case ":":
					tokens.push({ type: "COLON", value: ":" });
					break;
				case ",":
					tokens.push({ type: "COMMA", value: "," });
					break;
				default:
					throw new Error(`Lexer Error: Unknown character: ${this.currentChar}`);
			}
			this.advance();
		}
		tokens.push({ type: "EOF", value: "" });
		return tokens;
	}
}
