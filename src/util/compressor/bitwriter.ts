export class BitWriter {
	private buffer: number[] = [];
	private currentByte = 0;
	private bitsFilled = 0;

	writeBits(value: number, bitLength: number) {
		for (let i = bitLength - 1; i >= 0; i--) {
			const bit = (value >> i) & 1;
			this.currentByte = (this.currentByte << 1) | bit;
			this.bitsFilled++;
			if (this.bitsFilled === 8) {
				this.buffer.push(this.currentByte);
				this.currentByte = 0;
				this.bitsFilled = 0;
			}
		}
	}

	finish(): Uint8Array {
		if (this.bitsFilled > 0) {
			this.currentByte <<= 8 - this.bitsFilled;
			this.buffer.push(this.currentByte);
		}
		return Uint8Array.from(this.buffer);
	}
}

export class BitReader {
	private byteIndex = 0;
	private bitsLeft = 0;
	private currentByte = 0;

	constructor(private buffer: Uint8Array) {}

	readBits(bitLength: number): number {
		let result = 0;
		while (bitLength > 0) {
			if (this.bitsLeft === 0) {
				if (this.byteIndex >= this.buffer.length) throw new Error("EOF");
				this.currentByte = this.buffer[this.byteIndex++];
				this.bitsLeft = 8;
			}
			const take = Math.min(bitLength, this.bitsLeft);
			const shift = this.bitsLeft - take;
			result = (result << take) | ((this.currentByte >> shift) & ((1 << take) - 1));
			this.bitsLeft -= take;
			this.currentByte &= (1 << this.bitsLeft) - 1;
			bitLength -= take;
		}
		return result;
	}
}
