const browserify = require("browserify");
const babelify = require("babelify");
const exorcist = require("exorcist");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const terser = require("terser");
const tsify = require("tsify");

// 入出力ファイルの設定
const entryFile = path.join(__dirname, "src", "index.ts");
const outputDir = path.join(__dirname, "dist");
const outputFile = path.join(__dirname, "dist", "snowfall.js");
const outputMinFile = path.join(__dirname, "dist", "snowfall.min.js");
const outputSourceMap = path.join(__dirname, "dist", "snowfall.js.map");
const outputSourceMinMap = path.join(__dirname, "dist", "snowfall.min.js.map");

// 出力ディレクトリをクリーンアップ
rimraf.sync(outputDir);
fs.mkdirSync(outputDir, { recursive: true }); // 必要ならディレクトリを再作成

// Browserifyの設定
browserify({
	debug: true,
	extensions: [".ts", ".js"], // TypeScript拡張子を追加
	fullPaths: false, // モジュールのフルパスを保持しない
	dedupe: true, // 重複するモジュールを排除
})
	.add(entryFile) // エントリーポイント
	.plugin(tsify) // TypeScriptを処理
	.transform(babelify, {
		// Babelで変換
		presets: ["@babel/preset-env", "@babel/preset-typescript"],
		extensions: [".ts", ".js"], // Babelifyが処理する拡張子を指定
		plugins: [
			[
				"@babel/plugin-transform-runtime",
				{
					corejs: false, // polyfill を外部化しない
					helpers: true, // ヘルパーコードを共有
					regenerator: true, // async/await 用のヘルパーを共有
					//useESModules: true, // ESモジュール形式を使用
				},
			],
		],
	})
	.bundle()
	.pipe(exorcist(outputSourceMap))
	.pipe(fs.createWriteStream(outputFile))
	.on("finish", () => {
		console.log("バンドルが完了しました！");

		terser
			.minify(fs.readFileSync(outputFile, "utf-8"), {
				toplevel: true,
				sourceMap: {
					filename: "snowfall.min.js",
					url: "snowfall.min.js.map",
					content: fs.readFileSync(outputSourceMap, "utf8"),
				},
			})
			.then((result) => {
				fs.writeFileSync(outputMinFile, result.code);
				fs.writeFileSync(outputSourceMinMap, result.map);
				console.log("圧縮が完了しました！");
			})
			.catch((err) => {
				console.error("圧縮エラー:", err);
			});
	})
	.on("error", (err) => {
		console.error("エラーが発生しました:", err.message);
	});
