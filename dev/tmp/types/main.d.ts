import { CompiledOutput, SnowFallSettings } from "./const/types";
/**
 * SnowFallソースコードをコンパイルします。
 * @param source ソースコード文字列
 * @param settings カスタム設定
 * @returns コンパイル済みオブジェクト
 */
declare function compile(source: string, settings?: SnowFallSettings): CompiledOutput;
/**
 * コンパイル済みオブジェクトを実行します。
 * @param compiled コンパイル済みオブジェクト
 * @param settings カスタム設定
 * @returns 最後の式の評価結果
 */
declare function run(compiled: CompiledOutput, settings?: SnowFallSettings): any;
/**
 * SnowFallソースコードをコンパイルして実行します。
 * @param source ソースコード文字列
 * @param settings カスタム設定
 * @returns 最後の式の評価結果
 */
declare function compileAndRun(source: string, settings?: SnowFallSettings): any;
export declare const SnowFall: {
    compile: typeof compile;
    run: typeof run;
    compileAndRun: typeof compileAndRun;
};
export {};
