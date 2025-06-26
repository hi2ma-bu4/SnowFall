import { CompactCompiledFunction, CompiledFunction, CompiledOutputType, SnowFallSettings } from "../const/types";
import { Compressor } from "./compressor";

export default class CompiledDataHandler {
	/**
	 * コンパイル済みの関数オブジェクトを圧縮形式に変換します。
	 * @param func コンパイル済み関数オブジェクト
	 * @param settings SnowFallの設定オブジェクト
	 * @returns 圧縮された、またはそのままのコンパイル結果
	 */
	public static compress(func: CompiledFunction, settings: SnowFallSettings): CompiledOutputType {
		if (!settings.output?.compact) {
			return func;
		}

		return {
			name: func.name,
			arity: func.arity,
			code: Compressor.encodeNumbers(func.chunk.code),
			constants: Compressor.encodeJSON(func.chunk.constants),
			lines: Compressor.encodeSmartPack(func.chunk.lines),
		};
	}

	/**
	 * 圧縮されたコンパイル結果を、実行可能な関数オブジェクトに解凍します。
	 * @param data 圧縮された、またはそのままのコンパイル結果
	 * @returns 解凍されたコンパイル済み関数オブジェクト
	 */
	public static decompress(data: CompiledOutputType): CompiledFunction {
		// すでに解凍済みの場合はそのまま返す
		if ((data as CompiledFunction).chunk !== undefined) {
			return data as CompiledFunction;
		}

		const compact = data as CompactCompiledFunction;
		return {
			name: compact.name,
			arity: compact.arity,
			chunk: {
				code: Compressor.decodeNumbers(compact.code),
				constants: Compressor.decodeJSON(compact.constants),
				lines: Compressor.decodeSmartPack(compact.lines),
			},
		};
	}
}
