import { Compiler } from "./compiler/compiler";
import { Lexer } from "./compiler/libs/lexer";
import { Parser } from "./compiler/libs/parser";
import { CompiledOutputType, SnowFallSettings } from "./const/types";
import { Decompiler } from "./decompiler/decompiler";
import { SnowFallVM } from "./vm/vm";

// デフォルトの設定
const defaultSettings: SnowFallSettings = {
	builtInFunctions: {
		// デフォルトでは何もない
	},
};

/**
 * SnowFallソースコードをコンパイルします。
 * @param source ソースコード文字列
 * @param settings カスタム設定
 * @returns コンパイル済みオブジェクト
 */
function compile(source: string, settings: SnowFallSettings = defaultSettings): CompiledOutputType {
	const lexer = new Lexer(source);
	const tokens = lexer.tokenize();

	const parser = new Parser(tokens);
	const ast = parser.parse();

	const compiler = new Compiler(ast, settings);
	return compiler.compile();
}

/**
 * コンパイル済みオブジェクトを実行します。
 * @param compiled コンパイル済みオブジェクト
 * @param settings カスタム設定
 * @returns 最後の式の評価結果
 */
function run(compiled: CompiledOutputType, settings: SnowFallSettings = defaultSettings): any {
	const vm = new SnowFallVM(compiled, settings);
	return vm.run();
}

/**
 * SnowFallソースコードをコンパイルして実行します。
 * @param source ソースコード文字列
 * @param settings カスタム設定
 * @returns 最後の式の評価結果
 */
function compileAndRun(source: string, settings: SnowFallSettings = defaultSettings): any {
	const compiled = compile(source, settings);
	return run(compiled, settings);
}

function decompile(data: CompiledOutputType): string {
	const decompiler = new Decompiler(data);
	return decompiler.decompile();
}

// ライブラリとして公開するAPI
export const SnowFall = {
	compile,
	run,
	compileAndRun,
	decompile,
};
