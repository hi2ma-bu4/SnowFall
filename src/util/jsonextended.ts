type ExtendedValue =
	| { __type: "BigInt"; value: string } // 改行用コメント
	| { __type: "Date"; value: string }
	| { __type: "Map"; value: [any, any][] }
	| { __type: "Set"; value: any[] }
	| { __type: "Number"; value: "NaN" | "Infinity" | "-Infinity" }
	| { __type: "Undefined" };

/**
 * JSON.stringify の拡張
 *
 * @param obj
 */
function stringify(obj: unknown): string {
	return JSON.stringify(obj, (_, value) => {
		if (typeof value === "bigint") {
			return { __type: "BigInt", value: value.toString() } as ExtendedValue;
		}
		if (value instanceof Date) {
			return { __type: "Date", value: value.toISOString() } as ExtendedValue;
		}
		if (value instanceof Map) {
			return { __type: "Map", value: Array.from(value.entries()) } as ExtendedValue;
		}
		if (value instanceof Set) {
			return { __type: "Set", value: Array.from(value) } as ExtendedValue;
		}
		if (typeof value === "number" && !isFinite(value)) {
			let repr: "NaN" | "Infinity" | "-Infinity" = "NaN";
			if (value === Infinity) repr = "Infinity";
			if (value === -Infinity) repr = "-Infinity";
			return { __type: "Number", value: repr } as ExtendedValue;
		}
		if (typeof value === "undefined") {
			return { __type: "Undefined" } as ExtendedValue;
		}
		return value;
	});
}

/**
 * JSON.parse の拡張
 *
 * @param json
 */
function parse<T = any>(json: string): T {
	return JSON.parse(json, (_, value) => {
		if (value && typeof value === "object" && "__type" in value) {
			switch (value.__type) {
				case "BigInt":
					return BigInt(value.value);
				case "Date":
					return new Date(value.value);
				case "Map":
					return new Map(value.value);
				case "Set":
					return new Set(value.value);
				case "Number":
					switch (value.value) {
						case "NaN":
							return NaN;
						case "Infinity":
							return Infinity;
						case "-Infinity":
							return -Infinity;
					}
					break;
				case "Undefined":
					return undefined;
			}
		}
		return value;
	});
}

export default { stringify, parse };
