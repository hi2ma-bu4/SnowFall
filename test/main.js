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

const DEFAULT_CODE = `
let a = 1;
let b = 2;
let c = 3;
let count = 0;
let evenCount = 0;
let oddCount = 0;
let primeCount = 0;
let msg = "init";
let temp = 0;

print("Start program.");

if (a < b) {
  print("a is less than b.");
}
if (b < c) {
  print("b is less than c.");
}
if (c > a) {
  print("c is greater than a.");
}

let n1 = 2;
let isPrime1 = true;
if (n1 % 2 == 0 && n1 != 2) {
  isPrime1 = false;
}
if (isPrime1) {
  primeCount = primeCount + 1;
  print("2 is prime.");
}

let n2 = 3;
let isPrime2 = true;
if (n2 % 2 == 0 && n2 != 2) {
  isPrime2 = false;
}
if (isPrime2) {
  primeCount = primeCount + 1;
  print("3 is prime.");
}

let n3 = 4;
let isPrime3 = true;
if (n3 % 2 == 0 && n3 != 2) {
  isPrime3 = false;
}
if (isPrime3) {
  primeCount = primeCount + 1;
  print("4 is prime.");
}

let n4 = 5;
let isPrime4 = true;
if (n4 % 2 == 0 && n4 != 2) {
  isPrime4 = false;
}
if (isPrime4) {
  primeCount = primeCount + 1;
  print("5 is prime.");
}

let value1 = 10;
if (value1 % 2 == 0) {
  evenCount = evenCount + 1;
  print("10 is even.");
} else {
  oddCount = oddCount + 1;
  print("10 is odd.");
}

let value2 = 13;
if (value2 % 2 == 0) {
  evenCount = evenCount + 1;
  print("13 is even.");
} else {
  oddCount = oddCount + 1;
  print("13 is odd.");
}

let value3 = 18;
if (value3 % 2 == 0) {
  evenCount = evenCount + 1;
  print("18 is even.");
} else {
  oddCount = oddCount + 1;
  print("18 is odd.");
}

let status = "ok";
if (status == "ok") {
  print("Status is ok.");
}
if (status == "fail") {
  print("Status is fail.");
}

let title = "report";
print("Title: " + title);

let x = 100;
let y = 200;
let z = 300;
let w = 400;
let v = 500;

print("Values:");
print("x = " + x);
print("y = " + y);
print("z = " + z);
print("w = " + w);
print("v = " + v);

if (x < y) {
  print("x < y");
}
if (y < z) {
  print("y < z");
}
if (z < w) {
  print("z < w");
}
if (w < v) {
  print("w < v");
}

let name = "Alice";
let message = "Hello";
if (name == "Alice") {
  print("Hi, Alice!");
}
if (name == "Bob") {
  print("Hi, Bob!");
}

let total = evenCount + oddCount;
print("Even count: " + evenCount);
print("Odd count: " + oddCount);
print("Total count: " + total);

print("Prime count: " + primeCount);

let a1 = 10;
let a2 = 20;
let a3 = 30;
let a4 = 40;
let a5 = 50;
let a6 = 60;
let a7 = 70;
let a8 = 80;
let a9 = 90;
let a10 = 100;

print("a1 = " + a1);
print("a2 = " + a2);
print("a3 = " + a3);
print("a4 = " + a4);
print("a5 = " + a5);
print("a6 = " + a6);
print("a7 = " + a7);
print("a8 = " + a8);
print("a9 = " + a9);
print("a10 = " + a10);

if (a1 < a2) print("a1 < a2");
if (a2 < a3) print("a2 < a3");
if (a3 < a4) print("a3 < a4");
if (a4 < a5) print("a4 < a5");
if (a5 < a6) print("a5 < a6");
if (a6 < a7) print("a6 < a7");
if (a7 < a8) print("a7 < a8");
if (a8 < a9) print("a8 < a9");
if (a9 < a10) print("a9 < a10");

let s1 = "A";
let s2 = "B";
let s3 = "C";

if (s1 == "A") print("Got A");
if (s2 == "B") print("Got B");
if (s3 == "C") print("Got C");

print("Done!");

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
