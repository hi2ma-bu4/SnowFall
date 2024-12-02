import { Token } from "./lexer";

class ParserError extends Error {}

type ASTNode = ASTNodeProgram | ASTNodeVariableDeclaration | ASTNodeLiteral;

type ASTNodeProgram = { type: "Program"; body: ASTNode[] };
type ASTNodeVariableDeclaration = { type: "VariableDeclaration"; dataType: string; name: string; value: any };
type ASTNodeLiteral = { type: "Literal"; value: number | string };

class Parser {
	private tokens: Token[];
	private tokens_length: number;
	private position: number;
	private rowCounter: number;
	private colCounter: number;
	private oldPosition: number;
	private oldRowCounter: number;
	private oldColCounter: number;
	private currentToken: Token | null = null;

	constructor(tokens: Token[]) {
		this.tokens = tokens;
		this.tokens_length = tokens.length;
		this.position = 0;
		this.rowCounter = 0;
		this.colCounter = 0;
		this.oldPosition = -1;
		this.oldRowCounter = 0;
		this.oldColCounter = 0;
		this.advance(); // 初期化
	}

	private getCurrentToken(diff: number | null = null): Token | null {
		if (diff) {
			diff--;
			return this.tokens[this.position] || null;
		}
		return this.currentToken;
	}

	private advance(): void {
		if (this.position < this.tokens_length) {
			this.currentToken = this.tokens[this.position] || null;
			this.position++;
			if (this.currentToken) {
				this.colCounter += this.currentToken.value.length;
			}
		} else {
			this.currentToken = null;
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
			this.rowCounter = this.oldRowCounter;
			this.colCounter = this.oldColCounter - 1;
			this.advance();
		}
	}

	private skipNewline(): void {
		let currentToken = this.currentToken;
		while (currentToken && currentToken.type === "NEWLINE") {
			this.rowCounter++;
			this.colCounter = 0;
			this.advance();
			currentToken = this.currentToken;
		}
	}

	private match(...type: string[]): Token | null {
		this.skipNewline();
		const token = this.getCurrentToken();
		if (token && type.includes(token.type)) {
			this.advance();
			return token;
		}
		return null;
	}

	private variableDeclaration(): ASTNode | null {
		const keyword = this.match("KEYWORD");
		if (keyword) {
			const identifier = this.match("IDENTIFIER");
			if (identifier) {
				const equals = this.match("ASSIGN");
				if (equals) {
					const value = this.match("NUMBER", "STRING", "IDENTIFIER");
					if (value) {
						const semicolon = this.match("SEMICOLON");
						if (semicolon) {
							this.commit();
							return {
								type: "VariableDeclaration",
								dataType: keyword.value,
								name: identifier.value,
								value: value.value,
							};
						} else {
							this.logError(`Expected ';' after variable declaration`);
						}
					} else {
						this.logError(`Expected a value after '='`);
					}
				} else {
					this.logError(`Expected '=' in variable declaration`);
				}
			} else {
				this.logError(`Expected an identifier after type`);
			}
		}

		this.rollback();
		return null;
	}

	public parse(): ASTNode {
		const program: ASTNode = { type: "Program", body: [] };

		while (this.position < this.tokens.length) {
			const declaration = this.variableDeclaration();
			if (declaration) {
				program.body.push(declaration);
				continue;
			}

			this.skipNewline();
			if (this.getCurrentToken() === null) {
				break;
			}

			this.logError(`Unexpected token: ${JSON.stringify(this.getCurrentToken())}`);
		}

		return program;
	}

	private logError(message: string): void {
		throw new ParserError(`${message} (${this.rowCounter}:${this.colCounter}{${this.position}})`);
	}
}

export { Parser };
