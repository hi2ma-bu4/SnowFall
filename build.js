const browserify = require("browserify");
const babelify = require("babelify");
const tsify = require("tsify");
const fs = require("fs");
const path = require("path");
const exorcist = require("exorcist");

// 入出力ファイルの設定
const entryFile = path.join(__dirname, "src", "index.ts");
const outputFile = path.join(__dirname, "dist", "snowfall.js");
const outputSourceMap = path.join(__dirname, "dist", "snowfall.js.map");

// Browserifyの設定
browserify({ debug: true, extensions: [".ts", ".js"] }) // TypeScript拡張子を追加
	.add(entryFile) // エントリーポイント
	.plugin(tsify) // TypeScriptを処理
	.transform(babelify, {
		presets: ["@babel/preset-env", "@babel/preset-typescript"],
		extensions: [".ts", ".js"], // Babelifyが処理する拡張子を指定
	})
	.bundle()
	.pipe(exorcist(outputSourceMap))
	.pipe(fs.createWriteStream(outputFile))
	.on("finish", () => {
		console.log("バンドルが完了しました！");
	});
