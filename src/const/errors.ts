interface ErrorConstructor {
	captureStackTrace?(targetObject: object, constructorOpt?: Function): void;
}

/**
 * SnowFallのすべてのカスタムエラーの基底クラス。
 * エラーメッセージに加えて、コード上の位置情報（行・列）を保持します。
 */
export class ErrorBase extends Error {
	public line: number;
	public column: number;

	constructor(message: string, line: number, column: number) {
		// エラーメッセージに位置情報を含める
		super(`${message}\n (at line ${line}, column ${column})`);
		this.name = this.constructor.name; // クラス名をエラー名として設定
		this.line = line;
		this.column = column;

		// V8（Node.js, Chromeなど）でスタックトレースを正しくキャプチャするため
		const BuiltInError: ErrorConstructor = Error as ErrorConstructor;
		if (BuiltInError.captureStackTrace) {
			BuiltInError.captureStackTrace(this, this.constructor);
		}
	}
}

/**
 * 字句解析（Lexer）中に発生するエラー。
 */
export class LexerError extends ErrorBase {}

/**
 * 構文解析（Parser）中に発生するエラー。
 */
export class ParserError extends ErrorBase {}

/**
 * コンパイル（Compiler）中に発生するエラー。
 */
export class CompilerError extends ErrorBase {}

/**
 * VM実行時（Runtime）に発生するエラー。
 * これにはコールスタックが含まれるため、ErrorBaseとは異なる形式でメッセージを構築します。
 */
export class VMError extends Error {
	constructor(messageWithStackTrace: string) {
		super(messageWithStackTrace);
		this.name = "VMError";

		const BuiltInError: ErrorConstructor = Error as ErrorConstructor;
		if (BuiltInError.captureStackTrace) {
			BuiltInError.captureStackTrace(this, this.constructor);
		}
	}
}
