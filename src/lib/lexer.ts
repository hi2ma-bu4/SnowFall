type Token = {
	type: string;
	value: string;
};

class LexerError extends Error {}

class Lexer {
	private input: string;
	private input_length: number;
	private position: number;
	private rowCounter: number;
	private colCounter: number;
	private oldPosition: number;
	private oldRowCounter: number;
	private oldColCounter: number;
	private currentChar: string | null = null;
	private funcList = [
		// 実行関数
		this.newline.bind(this),
		this.string.bind(this),
		this.keyword.bind(this),
		this.identifier.bind(this),
		this.number.bind(this),
		this.operator.bind(this),
		this.semicolon.bind(this),
	];

	constructor(input: string) {
		this.input = input;
		this.input_length = input.length;
		this.position = 0;
		this.rowCounter = 0;
		this.colCounter = 0;
		this.oldPosition = -1;
		this.oldRowCounter = 0;
		this.oldColCounter = 0;
		this.advance(); // 初期化
	}

	private getCurrentChar(diff: number | null = null): string | null {
		if (diff) {
			diff--;
			return this.input[this.position + diff] || null;
		}
		return this.currentChar;
	}

	private advance(): void {
		if (this.position < this.input_length) {
			this.currentChar = this.input[this.position];
			this.position++;
			this.colCounter++;
		} else {
			this.currentChar = null;
		}
	}

	private advanceCommit(): void {
		this.advance();
		this.commit();
	}

	private commit(): void {
		if (this.position > this.oldPosition) {
			this.oldPosition = this.position;
			this.oldRowCounter = this.rowCounter;
			this.oldColCounter = this.colCounter;
		}
	}

	private rollback(): void {
		if (this.position > this.oldPosition) {
			this.position = this.oldPosition - 1;
			this.colCounter = this.oldColCounter - 1;
			this.rowCounter = this.oldRowCounter;
			this.advance();
		}
	}

	private skipWhitespace(): void {
		let currentChar = this.getCurrentChar();
		while (currentChar && /[^\S\n]/.test(currentChar)) {
			this.advance();
			currentChar = this.getCurrentChar();
		}
		this.commit();
	}

	private skipComment(): void {
		if (this.getCurrentChar() === "/") {
			this.advance();
			if (this.getCurrentChar() === "/") {
				// 1行コメント（//）の処理
				this.advance();
				let currentChar = this.getCurrentChar();
				while (this.currentChar && currentChar !== "\n") {
					this.advance();
					currentChar = this.getCurrentChar();
				}
				this.commit();
			} else if (this.getCurrentChar() === "*") {
				// 複数行コメント（/*...*/）の処理
				this.advance();
				let currentChar = this.getCurrentChar();
				while (currentChar && !(currentChar === "*" && this.getCurrentChar(1) === "/")) {
					if (currentChar === "\n") {
						this.rowCounter++;
						this.colCounter = 0;
					}
					this.advance();
					currentChar = this.getCurrentChar();
				}
				this.advance();
				this.advanceCommit();
			}
		}
	}

	private keyword(): Token | null {
		const keywords = ["int", "string"];

		let kwStr = "";
		let currentChar = this.getCurrentChar();
		while (currentChar && /[a-zA-Z]/.test(currentChar)) {
			kwStr += currentChar;
			this.advance();
			currentChar = this.getCurrentChar();
		}

		if (keywords.includes(kwStr)) {
			this.commit();
			return { type: "KEYWORD", value: kwStr };
		}

		this.rollback();
		return null;
	}

	private newline(): Token | null {
		if (this.getCurrentChar() === "\n") {
			this.rowCounter++;
			this.colCounter = 0;
			this.advanceCommit();
			return { type: "NEWLINE", value: "\n" };
		}
		return null;
	}

	private identifier(): Token | null {
		let idStr = "";
		let currentChar = this.getCurrentChar();
		if (currentChar && /[a-zA-Z_]/.test(currentChar)) {
			idStr += currentChar;
			this.advance();
			currentChar = this.getCurrentChar();
			while (currentChar && /[0-9a-zA-Z_]/.test(currentChar)) {
				idStr += currentChar;
				this.advance();
				currentChar = this.getCurrentChar();
			}
		}
		if (idStr) {
			this.commit();
			return { type: "IDENTIFIER", value: idStr };
		}
		this.rollback();
		return null;
	}

	private number(): Token | null {
		let numberStr = "";
		while (this.currentChar && /[0-9]/.test(this.currentChar)) {
			numberStr += this.currentChar;
			this.advance();
		}
		if (numberStr) {
			this.commit();
			return { type: "NUMBER", value: numberStr };
		}
		this.rollback();
		return null;
	}

	private string(): Token | null {
		let stringStr = "";
		let quote = this.getCurrentChar();
		let is_multi_line = false;
		if (quote === "`") {
			is_multi_line = true;
		}
		if (quote === '"' || quote === "'" || is_multi_line) {
			this.advance();
			let currentChar = this.getCurrentChar();
			while (currentChar && currentChar !== quote && (is_multi_line || currentChar !== "\n")) {
				stringStr += currentChar;
				if (currentChar === "\n") {
					this.rowCounter++;
					this.colCounter = 0;
				}
				this.advance();
				currentChar = this.getCurrentChar();
			}
			if (currentChar === quote) {
				this.advanceCommit();
				return { type: "STRING", value: stringStr };
			}
		}
		this.rollback();
		return null;
	}

	private operator(): Token | null {
		let currentChar = this.getCurrentChar();
		switch (currentChar) {
			case "+":
				this.advanceCommit();
				return { type: "PLUS", value: "+" };
			case "-":
				this.advanceCommit();
				return { type: "MINUS", value: "-" };
			case "*":
				this.advanceCommit();
				if (this.getCurrentChar() === "*") {
					this.advanceCommit();
					return { type: "POWER", value: "**" };
				}
				return { type: "MULTIPLY", value: "*" };
			case "^":
				this.advanceCommit();
				return { type: "POWER", value: "^" };
			case "/":
				this.advanceCommit();
				return { type: "DIVIDE", value: "/" };
			case "%":
				this.advanceCommit();
				return { type: "MODULO", value: "%" };
			case "|":
				this.advanceCommit();
				if (this.getCurrentChar() === "|") {
					this.advanceCommit();
					return { type: "OR", value: "||" };
				}
				return { type: "BIT_OR", value: "|" };
			case "&":
				this.advanceCommit();
				if (this.getCurrentChar() === "&") {
					this.advanceCommit();
					return { type: "AND", value: "&&" };
				}
				return { type: "BIT_AND", value: "&" };
			case "<":
				this.advanceCommit();
				if (this.getCurrentChar() === "=") {
					this.advanceCommit();
					return { type: "LESS_THAN_OR_EQUAL", value: "<=" };
				} else if (this.getCurrentChar() === "<") {
					this.advanceCommit();
					return { type: "SHIFT_LEFT", value: "<<" };
				}
				return { type: "LESS_THAN", value: "<" };
			case ">":
				this.advanceCommit();
				if (this.getCurrentChar() === "=") {
					this.advanceCommit();
					return { type: "GREATER_THAN_OR_EQUAL", value: ">=" };
				} else if (this.getCurrentChar() === ">") {
					this.advanceCommit();
					return { type: "SHIFT_RIGHT", value: ">>" };
				}
				return { type: "GREATER_THAN", value: ">" };
			case "=":
				this.advanceCommit();
				if (this.getCurrentChar() === "=") {
					this.advanceCommit();
					if (this.getCurrentChar() === "=") {
						this.advanceCommit();
						return { type: "TRIPLE_EQUALS", value: "===" };
					}
					return { type: "EQUALS", value: "==" };
				}
				return { type: "ASSIGN", value: "=" };
			default:
				this.rollback();
				return null;
		}
	}

	private semicolon(): Token | null {
		if (this.currentChar === ";") {
			this.advance();
			return { type: "SEMICOLON", value: ";" };
		}
		return null;
	}

	public tokenize(): Token[] {
		const tokens: Token[] = [];

		while (this.getCurrentChar() !== null) {
			// 空白
			this.skipWhitespace();
			// コメント
			this.skipComment();

			let token,
				continueFlag = false;
			for (let func of this.funcList) {
				if ((token = func())) {
					tokens.push(token);
					continueFlag = true;
					break;
				}
			}
			if (continueFlag) {
				continue;
			}

			// 未知の文字があればエラー
			this.logError(`Unknown character: "${this.getCurrentChar()}"`);
		}

		return tokens;
	}

	private logError(message: string): void {
		throw new LexerError(`${message} (${this.rowCounter}:${this.colCounter}{${this.position}})`);
	}
}

export { Lexer, Token };
