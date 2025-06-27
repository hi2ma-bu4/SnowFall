try {
	// IDE型補完用
	const { default: SnowFall } = require("../types/SnowFall.d.ts");
	console.log("is load?!");
} catch (e) {}

jasc.initSetting = {
	useLib: {
		//beryl: true,
	},
};

// TODO: 型定義は持続させる、タプルを使用できるように
// TODO: 計算式の括弧はタプルにさせない
// TODO: グローバル部分もlet変数再定義,const定数再代入を禁止にする,グローバル書き込みのvarを追加する
// TODO: 配列、連想配列、タプルは独自型を作成
// TODO: 関数の入れ子に対応
// TODO: グローバルスコープでもforを動作させる
// TODO: decompileを正常に動作させる (無理)

class AppBootStrapper {
	static start() {
		require.config({
			paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs" },
		});
		require(["vs/editor/editor.main"], () => {
			jasc.on("DOMContentLoaded", () => {
				new SnowFallIDE().init();
			});
		});
	}
}

class SnowFallIDE {
	constructor() {
		this.models = {};
		this.mainEditor = null;
		this.outputEditor = null;
	}

	init() {
		MonacoConfigurator.configure();

		const fileDefs = this.createFileDefinitions();

		const sidebar = jasc.acq("#sidebar");
		for (const name in fileDefs) {
			const div = document.createElement("div");
			div.textContent = "📄" + fileDefs[name].path.replace(/^(?:.*\/)?([^/]*)$/, "$1");
			div.onclick = () => {
				this.mainEditor.setModel(this.models[name]);
				this.mainEditor.updateOptions(fileDefs[name].options);
			};
			sidebar.appendChild(div);
		}

		this.models = EditorModelManager.createModels(fileDefs);

		this.mainEditor = monaco.editor.create(jasc.acq("#code-editor"), {
			model: this.models["main.sf"],
			theme: "SnowFallTheme-dark",
			automaticLayout: true,
			bracketPairColorization: { enabled: true },
		});

		this.outputEditor = monaco.editor.create(jasc.acq("#output"), {
			model: this.models["output/result.txt"],
			theme: "vs-dark",
			readOnly: true,
			automaticLayout: true,
		});
		monaco.editor.setTheme("SnowFallTheme-dark");

		this.runMainLogic();
	}

	createFileDefinitions() {
		return {
			"main.sf": {
				path: "main.sf",
				language: "SnowFall",
				content: "",
				options: {
					wordWrap: "off",
					readOnly: false,
					minimap: { enabled: true },
				},
			},
			"main.sfc": {
				path: "main.sfc",
				language: "plaintext",
				content: "",
				options: {
					wordWrap: "on",
					readOnly: true,
					minimap: { enabled: false },
				},
			},
			"output/result.txt": {
				path: "output/result.txt",
				language: "plaintext",
				content: "",
				options: {
					wordWrap: "off",
					readOnly: true,
					minimap: { enabled: false },
				},
			},
			"output/decompile.sf": {
				path: "output/decompile.sf",
				language: "SnowFall",
				content: "",
				options: {
					wordWrap: "off",
					readOnly: true,
					minimap: { enabled: true },
				},
			},
		};
	}

	runMainLogic() {
		const compileSize = jasc.acq("#compile-size");
		const runButton = jasc.acq("#run-button");
		const isCompact = jasc.acq("#is-compact");

		this.models["main.sf"].setValue(SnowFallRunner.defaultCode);

		runButton.addEventListener("click", () => {
			const source = this.models["main.sf"].getValue();
			const output = SnowFallRunner.run(source, isCompact.checked);

			this.models["main.sfc"].setValue(output.compiledJson);
			this.models["output/result.txt"].setValue(output.resultText);
			this.models["output/decompile.sf"].setValue(output.decompiled);
			compileSize.textContent = output.sizeInfo;
		});
	}
}

class EditorModelManager {
	static createModels(defs) {
		const models = {};
		for (const name in defs) {
			models[name] = monaco.editor.createModel(defs[name].content, defs[name].language, monaco.Uri.parse(`inmemory://model/${name}`));
		}
		return models;
	}
}

class MonacoConfigurator {
	static configure() {
		this.registerLanguage();
		this.setTheme();
		this.setCompletionProvider();
	}

	static registerLanguage() {
		monaco.languages.register({
			id: "SnowFall",
			extensions: [".sf"],
			aliases: ["SnowFall", "Snowfall", "snowfall"],
		});

		monaco.languages.setLanguageConfiguration("SnowFall", {
			brackets: [
				["{", "}"],
				["[", "]"],
				["(", ")"],
			],
		});

		monaco.languages.setMonarchTokensProvider("SnowFall", {
			tokenPostfix: ".sf",
			tokenizer: {
				root: [
					// コメント
					[/\/\/.*/, "comment"], // 1行コメント
					[/\/\*/, "comment", "@comment"], // 複数行コメント開始

					// 文字列
					[/"/, "string.quote", "@string_double"], // "abc"
					[/'/, "string.quote", "@string_single"], // 'abc'
					[/`/, "string", "@string_backtick"], // `abc`

					// 数値
					[/\b0b[01]+(?:\.[01]+)?\b/, "number"],
					[/\b0x[0-9a-fA-F]+(?:\.[0-9a-fA-F]+)?\b/, "number"],
					[/\b(?:0d)?\d+(?:\.\d+)?\b/, "number"],
					[/\b\d+n?\b/, "number"],

					// 型定義（型名だけ強調）
					[/\bfunction\b/, "reserved-words", "@function_declaration"],
					[/\b(let|const)\b(?=\s+[a-zA-Z_]\w*\s*:)/, "reserved-words", "@typeStart"],

					// キーワードや識別子
					[/\b(?:const|let|function|null|true|false)\b/, "reserved-words"],
					[/\b(?:if|else|while|for|return|break|continue|switch|case|default|try|catch|throw|finally)\b/, "keyword"],

					// 識別子
					[/\b(?:[a-zA-Z_]\w*)\b(?=\()/, "function"],
					[/\b[a-zA-Z_]\w*\b/, "identifier"],

					[/=>/, "operator"],
					[/[:=;]/, "operator"],

					// 括弧
					[/[\{\}\[\]\(\)]/, "@brackets"],
				],

				// 複数行コメント状態
				comment: [
					[/[^\/*]+/, "comment"],
					[/\*\//, "comment", "@pop"], // コメント終了
					[/[\/*]/, "comment"],
				],

				// 通常の文字列（ダブルクォート）
				string_double: [
					[/^/, { token: "invalid", next: "@pop" }],
					[/$/, { token: "invalid", next: "@pop" }],

					[/[^\\\"\n\r]+/, "string"],
					[/\\./, "string.escape"],
					[/"/, { token: "string.quote", next: "@pop" }],
					[/\r\n|[\n\r]/, { token: "invalid", next: "@pop" }],
				],

				// シングルクォート文字列
				string_single: [
					[/^/, { token: "invalid", next: "@pop" }],
					[/$/, { token: "invalid", next: "@pop" }],

					[/[^\\\'\n\r]+/, "string"],
					[/\\./, "string.escape"],
					[/'/, { token: "string.quote", next: "@pop" }],
					[/\r\n|[\n\r]/, { token: "invalid", next: "@pop" }],
				],

				// 複数行文字列（バッククォート）
				string_backtick: [
					[/[^\\`]+/, "string"],
					[/\\./, "string.escape"],
					[/`/, "string", "@pop"],
				],

				// 関数宣言の解析を開始
				function_declaration: [
					[/\s+/, ""],
					[/[a-zA-Z_]\w*/, "function"], // 1. 関数名を 'function' としてハイライト
					[/\(/, "@brackets", "@parameter_list"], // 2. '(' を見つけたら引数リストの解析へ

					["", "", "@pop"],
				],

				// 引数リスト (...) の中身を解析
				parameter_list: [
					[/\s+/, ""],
					[/\b[a-zA-Z_]\w*\b/, "identifier"], // 引数名を 'identifier' としてハイライト
					[/:/, "operator", "@type"], // 引数の型定義へ
					[/,/, "delimiter"], // 引数の区切り文字
					[/\)/, "@brackets", "@return_type_check"], // 3. ')' を見つけたら引数リストの終わり。戻り値のチェックへ

					["", "", "@pop"],
				],

				// 戻り値の型 (e.g., ':boolean') があるかチェック
				return_type_check: [
					[/\s+/, ""],
					[/:/, "operator", "@type"], // 4. ':' があれば戻り値の型解析へ
					["", "", "@pop"], // 5. ':' がなければここで終わり。root に戻る
				],

				typeStart: [
					[/[a-zA-Z_]\w*/, "identifier"],
					[/:/, "operator", "@type"],
					[/\s+/, ""],
					[/=/, { token: "operator", next: "@pop" }],
					[/;/, { token: "delimiter", next: "@pop" }],
				],

				type: [
					[/\s+/, ""],

					[/[A-Z_a-z]\w*/, "type.identifier"],

					// 配列型：[]
					[/\[\]/, "keyword.array"],

					// Union型: |
					[/\|/, "delimiter.union"],

					// Generics 開始: <
					[/</, { token: "delimiter.angle", next: "@genericType" }],
					// 型定義終了
					["", "", "@pop"],
				],

				// Generic内
				genericType: [
					// ネストされた generic
					[/</, { token: "delimiter.angle", next: "@genericType" }],

					// 終了
					[/>/, { token: "delimiter.angle", next: "@pop" }],

					// 識別子や型名
					[/[A-Z_a-z]\w*/, "type.identifier"],

					// Union型内の | 演算子
					[/\|/, "delimiter.union"],

					// 配列型：boolean[]
					[/\[\]/, "keyword.array"],

					// カンマ
					[/,/, "delimiter.comma"],

					// 空白
					[/\s+/, "white"],
				],
			},
		});
	}

	static setCompletionProvider() {
		monaco.languages.registerCompletionItemProvider("SnowFall", {
			provideCompletionItems(model, position) {
				const word = model.getWordUntilPosition(position);
				const range = {
					startLineNumber: position.lineNumber,
					endLineNumber: position.lineNumber,
					startColumn: word.startColumn,
					endColumn: word.endColumn,
				};
				return {
					suggestions: [
						{ label: "print", kind: monaco.languages.CompletionItemKind.Function, insertText: "print", range },
						{ label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if", range },
						{ label: "let", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "let;", range },
					],
				};
			},
		});
	}

	static setTheme() {
		monaco.editor.defineTheme("SnowFallTheme-dark", {
			base: "vs-dark",
			inherit: true,
			colors: {
				"editor.foreground": "#d4d4d4",
				"editor.background": "#1e1e1e",
			},
			rules: [
				{ token: "keyword", foreground: "c586c0" },
				{ token: "reserved-words", foreground: "569cd6" },
				{ token: "string.escape", foreground: "ffcc00" },
				{ token: "invalid", foreground: "ff0000", fontStyle: "italic underline" },
				{ token: "type", foreground: "4ec9b0" },
				{ token: "number", foreground: "b5cea8" },
				{ token: "function", foreground: "dcdcaa" },
				{ token: "identifier", foreground: "9cdcfe" },
			],
		});
	}
}

class SnowFallRunner {
	static defaultCode = `
// 定数宣言
const maxNumber:number = 50;
const greet:string = "Hello";
const repeatStr:string = "ha";

// 変数宣言
let count:number = 0;
let message:string = "";
let result:boolean = false;

// print基本
print(greet);
print(repeatStr * 3); // "hahaha"

// 関数：文字列を繰り返して返す
function repeatStrFunc(s:string, times:number) {
  let result:string = "";
  for (let i=0; i<times; i=i+1) {
    result = result + s;
  }
  return result;
}


// switch文の利用例
let grade:string = "B";
switch(grade) {
  case "A":
    print("Excellent!");
    break;
  case "B":
    print("Good job.");
    break;
  case "C":
    print("Not bad.");
    break;
  default:
    print("Try harder.");
}

// 文字列リピートを使った出力
print(repeatStrFunc("ha", 5));

// whileループ例
let i:number = 0;
while (i < 10) {
  if (i % 2 == 0) print("Even number: " + i);
  i = i + 1;
}


// 複雑な文字列処理
let base:string = "foo";
let repeated:string = base * 3; // "foofoofoo"
print("Repeated string: " + repeated);

// 文字列のswitch
let input:string = "hello";
switch(input) {
  case "hello":
    print("Hi there!");
    break;
  case "bye":
    print("Goodbye!");
    break;
  default:
    print("Unknown input");
}

// 関数の入れ子呼び出し
let finalStr = repeatStrFunc(repeatStrFunc("ab", 2), 3);
print(finalStr); // "abababababab"

// 文字列と数値の複合
let val1:number = 5;
let val2:number = 10;
let sum:number = val1 + val2;
print("Sum: " + sum);

// 400行までに満たすため、似た処理を展開

// ここから同様のパターンを繰り返し

let j:number = 0;
while (j < 20) {
  if (j % 3 == 0) print("Divisible by 3: " + j);
  j = j + 1;
}

for (let k=0; k<15; k=k+1) {
  switch(k % 4) {
    case 0: print(k + " mod 4 == 0"); break;
    case 1: print(k + " mod 4 == 1"); break;
    case 2: print(k + " mod 4 == 2"); break;
    case 3: print(k + " mod 4 == 3"); break;
  }
}

// if の1行記法続き
if (sum > 10) print("Sum is big.");
if (sum <= 10) print("Sum is small.");

// 関数で文字列複数回繰り返し
print(repeatStrFunc("xyz", 4));

// 型付き配列（擬似的に）
let arr1:number = 1;
let arr2:number = 2;
let arr3:number = 3;
let arr4:number = 4;
let arr5:number = 5;

print("Array elements:");
print(arr1);
print(arr2);
print(arr3);
print(arr4);
print(arr5);

// さらに関数の呼び出し例
function greetUser(name:string) {
  print("Hello, " + name + "!");
}

greetUser("ChatGPT");
greetUser("User");

// もう少し複雑なループ
for (let m=0; m<5; m=m+1) {
  for (let n=0; n<3; n=n+1) {
    print("m: " + m + ", n: " + n);
  }
}

// switch 文で曜日判定（例）
let day:number = 3;
switch(day) {
  case 1: print("Monday"); break;
  case 2: print("Tuesday"); break;
  case 3: print("Wednesday"); break;
  case 4: print("Thursday"); break;
  case 5: print("Friday"); break;
  case 6: print("Saturday"); break;
  case 7: print("Sunday"); break;
  default: print("Invalid day");
}

// whileでカウントダウン
let countdown:number = 10;
while (countdown > 0) {
  print("Countdown: " + countdown);
  countdown = countdown - 1;
}

if (countdown == 0) print("Blast off!");

// 文字列連結とリピートの複合
let repeatA:string = "A" * 5;
let repeatB:string = "B" * 3;
print(repeatA + repeatB); // "AAAAABBB"

// 型付き変数で数値演算
let baseNum:number = 2;
let power:number = 3;
let powerResult:number = 1;
for (let p = 0; p < power; p = p + 1) {
  powerResult = powerResult * baseNum;
}
print("2^3 = " + powerResult);

print("End of program.");
`;

	static run(sourceCode, compact) {
		let resultText = "";
		let compiledJson = "";
		let decompiled = "";
		let sizeInfo = "";

		const settings = {
			builtInFunctions: {
				print: (...args) => (resultText += args.map(String).join(" ") + "\n"),
				clog: (...args) => console.log("[clog]", ...args),
			},
			output: { compact },
		};

		try {
			const compiled = SnowFall.compile(sourceCode, settings);
			compiledJson = JSON.stringify(compiled, null, 0);
			try {
				decompiled = SnowFall.decompile(compiled);
			} catch (e) {
				console.warn("decompile error: ", e);
			}
			sizeInfo = `${compiledJson.length} bytes (${sourceCode.length} bytes) [decompiled ${decompiled.length} bytes]`;
			SnowFall.run(compiled, settings);
		} catch (e) {
			resultText += "エラー: " + e.message;
			console.error(e);
		}

		return { resultText, compiledJson, decompiled, sizeInfo };
	}
}

AppBootStrapper.start();
