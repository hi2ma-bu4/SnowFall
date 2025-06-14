try {
	// IDE型補完用
	const { default: SnowFall } = require("../types/SnowFall.d.ts");
	console.log("is load?!");
} catch (e) {}

const DEFAULT_CODE = `
let x = 10 * 2;
let y = x + 5;
print(y);
print("Hello, SnowFall!");

if (x < 10) {
	print(x + 2);
}
`;

jasc.on("DOMContentLoaded", () => {
	const editor = jasc.acq("#code-editor");
	const compileOutput = jasc.acq("#compile-output");
	const compileSize = jasc.acq("#compile-size");
	const output = jasc.acq("#output");
	const runButton = jasc.acq("#run-button");

	// デフォルトのコード
	editor.value = DEFAULT_CODE;

	runButton.addEventListener("click", () => {
		const sourceCode = editor.value;

		// 出力エリアをクリア
		compileOutput.textContent = "";
		compileSize.textContent = "";
		output.textContent = "";
		let outputHtml = "";

		// SnowFallの設定オブジェクト。
		// これを拡張することで、JSの機能をSnowFallに公開できる。
		const mySettings = {
			builtInFunctions: {
				print: (...args) => {
					// コンソールの代わりに画面に出力する
					const line = args.map(String).join(" ");
					outputHtml += line + "\n";
					console.log(...args); // 念のためコンソールにも
				},
			},
		};

		try {
			// SnowFallライブラリのAPIを呼び出す
			const compiled = SnowFall.compile(sourceCode, mySettings);

			const stringified = JSON.stringify(compiled, null, 0);
			compileOutput.textContent = stringified;
			compileSize.textContent = stringified.length + " bytes";

			SnowFall.run(compiled, mySettings);
		} catch (e) {
			outputHtml += "エラー: " + e.message;
			console.error(e);
		}
		output.textContent = outputHtml;
	});
});
