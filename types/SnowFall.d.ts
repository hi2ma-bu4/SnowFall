interface CompiledFunction {
    name: string;
    arity: number;
    chunk: {
        code: number[];
        constants: any[];
        lines: number[];
    };
}
interface CompactCompiledFunction {
    name: string;
    arity: number;
    code: string;
    constants: string;
    lines: string;
}
type CompiledOutputType = CompiledFunction | CompactCompiledFunction;
interface SnowFallSettings {
    builtInFunctions: {
        [name: string]: Function;
    };
    hooks?: {
        beforeJump?: (vm: any, jumpType: "JUMP" | "JUMP_IF_FALSE") => void;
    };
    output?: {
        compact?: boolean;
    };
}

/**
 * SnowFallソースコードをコンパイルします。
 * @param source ソースコード文字列
 * @param settings カスタム設定
 * @returns コンパイル済みオブジェクト
 */
declare function compile(source: string, settings?: SnowFallSettings): CompiledOutputType;
/**
 * コンパイル済みオブジェクトを実行します。
 * @param compiled コンパイル済みオブジェクト
 * @param settings カスタム設定
 * @returns 最後の式の評価結果
 */
declare function run(compiled: CompiledOutputType, settings?: SnowFallSettings): any;
/**
 * SnowFallソースコードをコンパイルして実行します。
 * @param source ソースコード文字列
 * @param settings カスタム設定
 * @returns 最後の式の評価結果
 */
declare function compileAndRun(source: string, settings?: SnowFallSettings): any;
declare const SnowFall: {
    compile: typeof compile;
    run: typeof run;
    compileAndRun: typeof compileAndRun;
};

export { SnowFall as default };
