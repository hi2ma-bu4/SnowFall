import { BitReader, BitWriter } from "./bitwriter";

export default class SmartPackRLE {
	static _encodeSigned(val: number, bits: number): number {
		const offset = 1 << (bits - 1);
		return val + offset;
	}

	static _decodeSigned(val: number, bits: number): number {
		const offset = 1 << (bits - 1);
		return val - offset;
	}

	static encode(input: number[]): Uint8Array {
		if (input.length === 0) return new Uint8Array();

		const deltas: number[] = [input[0]];
		for (let i = 1; i < input.length; i++) {
			deltas.push(input[i] - input[i - 1]);
		}

		const writer = new BitWriter();

		let i = 0;
		while (i < deltas.length) {
			let count = 1;
			while (i + count < deltas.length && deltas[i + count] === deltas[i]) count++;

			if (count >= 3) {
				// RLEモード: flag=1
				const val = deltas[i];
				const bits = Math.ceil(Math.log2(Math.abs(val) + 1)) + 1;
				writer.writeBits(1, 1); // RLEフラグ
				writer.writeBits(bits, 5);
				writer.writeBits(count, 8); // 最大255
				writer.writeBits(this._encodeSigned(val, bits), bits);
				i += count;
			} else {
				// ノーマルブロック: flag=0
				const block: number[] = [];
				const start = i;
				while (i < deltas.length && block.length < 255 && (i + 2 >= deltas.length || deltas[i] !== deltas[i + 1] || deltas[i] !== deltas[i + 2])) {
					block.push(deltas[i++]);
				}

				const min = Math.min(...block);
				const max = Math.max(...block);
				const bits = Math.ceil(Math.log2(Math.max(Math.abs(min), Math.abs(max)) + 1)) + 1;

				writer.writeBits(0, 1); // ノーマルフラグ
				writer.writeBits(bits, 5);
				writer.writeBits(block.length, 8);
				for (const v of block) {
					writer.writeBits(this._encodeSigned(v, bits), bits);
				}
			}
		}

		return writer.finish();
	}

	static decode(data: Uint8Array): number[] {
		const reader = new BitReader(data);
		const deltas: number[] = [];

		while (true) {
			try {
				const isRLE = reader.readBits(1);
				const bits = reader.readBits(5);
				const count = reader.readBits(8);
				if (isRLE) {
					const val = this._decodeSigned(reader.readBits(bits), bits);
					for (let i = 0; i < count; i++) deltas.push(val);
				} else {
					for (let i = 0; i < count; i++) {
						deltas.push(this._decodeSigned(reader.readBits(bits), bits));
					}
				}
			} catch (e) {
				break; // 終了
			}
		}

		// 差分復元
		const result: number[] = [];
		for (let i = 0; i < deltas.length; i++) {
			result[i] = i === 0 ? deltas[0] : result[i - 1] + deltas[i];
		}
		return result;
	}
}
