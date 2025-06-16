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

document.addEventListener("keydown", function (ev) {
	if ((ev.key != "Tab" && ev.key != " ") || ev.ctrlKey || ev.altKey) {
		return true;
	}
	ev.preventDefault();
	const str = ev.key == " " ? " " : "\t",
		TAB_WIDTH = 4,
		CRLF = [13, 10];
	let e = ev.target,
		start = e.selectionStart,
		end = e.selectionEnd,
		sContents = e.value,
		top = e.scrollTop;
	if (start == end || !sContents.includes("\n")) {
		e.setRangeText(str, start, end, "end");
		return;
	}
	if (CRLF.indexOf(sContents.charCodeAt(end - 1)) < 0) {
		for (; end < sContents.length; end++) {
			if (CRLF.indexOf(sContents.charCodeAt(end)) >= 0) {
				break;
			}
		}
	}
	for (; start > 0; start--) {
		if (CRLF.indexOf(sContents.charCodeAt(start - 1)) >= 0) {
			break;
		}
	}
	let v = sContents.substring(start, end).split("\n");
	for (let i = 0; i < v.length; i++) {
		if (v[i] == "") {
			continue;
		}
		if (!ev.shiftKey) {
			//indent
			v[i] = str + v[i];
		} else {
			//unindent
			if (str == "\t") {
				for (let j = 0, c = " "; j < TAB_WIDTH && c == " "; j++) {
					c = v[i].substring(0, 1);
					if (c == " " || (j == 0 && c == "\t")) {
						v[i] = v[i].substring(1);
					}
				}
			} else if (v[i].substring(0, 1) == " ") {
				v[i] = v[i].substring(1);
			}
		}
	}
	e.setRangeText(v.join("\n"), start, end, "select");
});

// functionのreturnを動作させる
// 型定義は持続させる&undefinedはどの型でも許容する
// TODO: 配列、連想配列、タプルは独自型を作成

const DEFAULT_CODE = `
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
function repeatStrFunc(s, times) {
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
function greetUser(name) {
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

jasc.on("DOMContentLoaded", () => {
	const editor = jasc.acq("#code-editor");
	const compileOutput = jasc.acq("#compile-output");
	const compileSize = jasc.acq("#compile-size");
	const output = jasc.acq("#output");
	const runButton = jasc.acq("#run-button");
	const isCompact = jasc.acq("#is-compact");

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
					//console.log(...args); // 念のためコンソールにも
				},
				clog(...args) {
					console.log("[clog]", ...args);
				},
			},
			output: {
				compact: isCompact.checked,
			},
		};

		try {
			// SnowFallライブラリのAPIを呼び出す
			const compiled = SnowFall.compile(sourceCode, mySettings);

			const stringified = JSON.stringify(compiled, null, 0);
			compileOutput.textContent = stringified;
			compileSize.textContent = `${stringified.length} bytes (${sourceCode.length} bytes)`;

			SnowFall.run(compiled, mySettings);
		} catch (e) {
			outputHtml += "エラー: " + e.message;
			console.error(e);
		}
		output.textContent = outputHtml;
	});
});
