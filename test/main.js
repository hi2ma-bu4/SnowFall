try {
	// IDE型補完用
	const { default: SnowFall } = require("../types/SnowFall.d.ts");
	console.log("is load?!");
} catch (e) {}

const editor = document.getElementById("code-editor");
const output = document.getElementById("output");
const runButton = document.getElementById("run-button");

// デフォルトのコード
editor.value = `
let x = 10 * 2;
let y = x + 5;
print(y);
print("Hello, SnowFall!");
`;

runButton.addEventListener("click", () => {
	const sourceCode = editor.value;

	// 出力エリアをクリア
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
		SnowFall.compileAndRun(sourceCode, mySettings);
	} catch (e) {
		outputHtml += "エラー: " + e.message;
		console.error(e);
	}
	output.textContent = outputHtml;
});
