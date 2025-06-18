interface ErrorConstructor {
	captureStackTrace?(targetObject: object, constructorOpt?: Function): void;
}

/**
 * すべてのカスタムエラーの基底クラス
 */
export class SnowFallBaseError extends Error {
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;

		const BuiltInError: ErrorConstructor = Error as ErrorConstructor;
		if (BuiltInError.captureStackTrace) {
			BuiltInError.captureStackTrace(this, this.constructor);
		}
	}
}

/**
 * 行・列の情報を持つエラー
 */
export class PositionedError extends SnowFallBaseError {
	public line: number;
	public column: number;

	constructor(message: string, line: number, column: number) {
		super(`${message}\n (at line ${line}, column ${column})`);
		this.line = line;
		this.column = column;
	}
}

/**
 * 単純なメッセージのみのエラー
 */
export class SimpleError extends SnowFallBaseError {
	constructor(message: string) {
		super(message);
	}
}

/**
 * 字句解析（Lexer）中に発生するエラー。
 */
export class LexerError extends PositionedError {}

/**
 * 構文解析（Parser）中に発生するエラー。
 */
export class ParserError extends PositionedError {}

/**
 * コンパイル（Compiler）中に発生するエラー。
 */
export class CompilerError extends PositionedError {}

export class SymbolTableError extends SimpleError {}

/**
 * VM実行時（Runtime）に発生するエラー。
 */
export class VMError extends SnowFallBaseError {
	constructor(messageWithStackTrace: string) {
		super(messageWithStackTrace);
	}
}
