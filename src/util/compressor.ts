import lzbase62 from "../libs/lzbase62/src/index";
import SmartPackRLE from "./compressor/smartpack";
import jsonExtended from "./jsonextended";

export class Compressor {
	protected static readonly BYTE_MASK = 0x7f;
	protected static readonly BYTE_MSB = 0x80;

	/**
	 * 数値の配列を圧縮する
	 *
	 * @param arr 数値の配列
	 * @returns 圧縮後の文字列
	 */
	static encodeNumbers(arr: number[]): string {
		let result = "";
		for (const num of arr) {
			let n = num;
			const bytes = [];
			do {
				let byte = n & this.BYTE_MASK;
				n >>>= 7;
				if (n > 0) byte |= this.BYTE_MSB; // 続きがあるならMSBを立てる
				bytes.push(byte);
			} while (n > 0);
			for (const b of bytes) {
				result += String.fromCharCode(b);
			}
		}
		return this.encodeString(result);
	}
	/**
	 * 数値の配列をSmartPackで圧縮する
	 *
	 * @param arr 数値の配列
	 * @returns 圧縮後の文字列
	 */
	static encodeSmartPack(arr: number[]): string {
		const bytes = SmartPackRLE.encode(arr);
		let result = "";
		for (const b of bytes) {
			result += String.fromCharCode(b);
		}
		return this.encodeString(result);
	}
	/**
	 * JSONを圧縮する
	 *
	 * @param data JSON
	 * @returns 圧縮後の文字列
	 */
	static encodeJSON(data: any): string {
		return this.encodeString(jsonExtended.stringify(data));
	}
	/**
	 * 文字列を圧縮する
	 *
	 * @param data 文字列
	 * @returns 圧縮後の文字列
	 */
	static encodeString(data: string): string {
		return lzbase62.compress(data);
	}

	/**
	 * 圧縮された文字列を数値の配列に解凍する
	 *
	 * @param str 圧縮された文字列
	 * @returns 解凍後の数値の配列
	 */
	static decodeNumbers(str: string): number[] {
		if (str.length === 0) return [];
		const decodeStr = this.decodeString(str);
		const result = [];
		let n = 0;
		let shift = 0;
		for (let i = 0; i < decodeStr.length; i++) {
			const byte = decodeStr.charCodeAt(i);
			n |= (byte & this.BYTE_MASK) << shift;
			if ((byte & this.BYTE_MSB) === 0) {
				result.push(n);
				n = 0;
				shift = 0;
			} else {
				shift += 7;
			}
		}
		return result;
	}
	/**
	 * 圧縮された文字列をSmartPackで解凍する
	 *
	 * @param str 圧縮された文字列
	 * @returns 解凍後の数値の配列
	 */
	static decodeSmartPack(str: string): number[] {
		const decodeStr = this.decodeString(str);
		const bytes = [];
		for (let i = 0; i < decodeStr.length; i++) {
			bytes.push(decodeStr.charCodeAt(i));
		}
		return SmartPackRLE.decode(new Uint8Array(bytes));
	}
	/**
	 * 圧縮された文字列をJSONに解凍する
	 *
	 * @param str 圧縮された文字列
	 * @returns 解凍後のJSON
	 */
	static decodeJSON(str: string): any {
		return jsonExtended.parse(this.decodeString(str));
	}
	/**
	 * 圧縮された文字列を解凍する
	 *
	 * @param str 圧縮された文字列
	 * @returns 解凍後の文字列
	 */
	static decodeString(str: string): string {
		return lzbase62.decompress(str);
	}
}
