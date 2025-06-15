/**
 * @file Main entry point for the base62 compression/decompression library.
 */

import Compressor from "./compressor";
import Decompressor from "./decompressor";

/**
 * The version of the library.
 * @type {string}
 */
export const version = "2.0.0-ts";

/**
 * Common options for compression and decompression.
 */
interface Options {
	/**
	 * A callback for processing data in chunks.
	 * @param {string} chunk - A chunk of processed (compressed or decompressed) data.
	 */
	onData?: (chunk: string) => void;
	/**
	 * A callback executed upon completion of the process.
	 */
	onEnd?: () => void;
}

/**
 * Compresses data into a base62 encoded string.
 * @param {string | null} data - Input string data to compress.
 * @param {Options} [options] - Compression options for streaming.
 * @returns {string} The compressed data.
 */
export function compress(data: string | null, options?: Options): string {
	return new Compressor(options).compress(data);
}

/**
 * Decompresses data from a base62 encoded string.
 * @param {string | null} data - Input string data to decompress.
 * @param {Options} [options] - Decompression options for streaming.
 * @returns {string} The decompressed data.
 */
export function decompress(data: string | null, options?: Options): string {
	return new Decompressor(options).decompress(data);
}

/**
 * forked from lzbase62
 * @module lzbase62
 * @see https://github.com/polygonplanet/lzbase62
 * @license MIT
 * @version 2.0.0
 */
export default { compress, decompress };
