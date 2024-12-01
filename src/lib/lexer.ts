type Token = {
	type: string;
	value: string;
};

class LexerError extends Error {}

class Lexer {
	private input: string;
	private input_length: number;
	private position: number = 0;
	private row_counter: number = 0;
	private oldPosition: number = -1;
	private currentChar: string | null = null;
	private funcList = [
		// 実行関数
		this.newline.bind(this),
		this.string.bind(this),
		this.identifier.bind(this),
		this.number.bind(this),
		this.operator.bind(this),
		this.semicolon.bind(this),
	];

	constructor(input: string) {
		this.input = input;
		this.input_length = input.length;
		this.advance(); // 初期化
	}

	private getCurrentChar(diff: number | null = null): string | null {
		if (diff) {
			diff--;
			if (this.position + diff >= this.input_length) {
				return null;
			}
			return this.input[this.position + diff];
		}
		return this.currentChar;
	}

	private advance(): void {
		if (this.position < this.input_length) {
			this.currentChar = this.input[this.position];
			this.position++;
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
		}
	}

	private rollback(): void {
		if (this.position > this.oldPosition) {
			this.position = this.oldPosition - 1;
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
						this.row_counter++;
					}
					this.advance();
					currentChar = this.getCurrentChar();
				}
				this.commit();
			}
		}
	}

	private newline(): { type: string; value: string } | null {
		if (this.getCurrentChar() === "\n") {
			this.row_counter++;
			this.advanceCommit();
			return { type: "NEWLINE", value: "\n" };
		}
		return null;
	}

	private identifier(): { type: string; value: string } | null {
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

	private number(): { type: string; value: number } | null {
		let numberStr = "";
		while (this.currentChar && /[0-9]/.test(this.currentChar)) {
			numberStr += this.currentChar;
			this.advance();
		}
		if (numberStr) {
			this.commit();
			return { type: "NUMBER", value: parseFloat(numberStr) }; // 数字を number 型に変換
		}
		this.rollback();
		return null;
	}

	private string(): { type: string; value: string } | null {
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
					this.row_counter++;
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

	private operator(): { type: string; value: string } | null {
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

	private semicolon(): { type: string; value: string } | null {
		if (this.currentChar === ";") {
			this.advance();
			return { type: "SEMICOLON", value: ";" };
		}
		return null;
	}

	public tokenize(): { type: string; value: any }[] {
		const tokens: { type: string; value: any }[] = [];

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
		throw new LexerError(`${message} (${this.row_counter}{${this.position}})`);
	}
}

export { Lexer, Token };
