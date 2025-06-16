const browserify = require("browserify");
const babelify = require("babelify");
const exorcist = require("exorcist");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const terser = require("terser");
const tsify = require("tsify");
const { execSync } = require("child_process");
const { rollup } = require("rollup");
const dts = require("rollup-plugin-dts").default;

const checkIllegalStrings = require("./build/checkIllegalStrings");

const script_name = "SnowFall";

const baseDir = path.join(__dirname, "..");
const tmpDir = path.join(__dirname, "tmp");

// 入出力ファイルの設定
const entryFile = path.join(baseDir, "src", "index.ts");
const outputDir = path.join(baseDir, "dist");
const outputFile = path.join(baseDir, "dist", `${script_name}.js`);
const outputMinFile = path.join(baseDir, "dist", `${script_name}.min.js`);
const outputSourceMap = path.join(baseDir, "dist", `${script_name}.js.map`);
const outputSourceMinMap = path.join(baseDir, "dist", `${script_name}.min.js.map`);

const typesTmpDir = path.join(tmpDir, "types");
const typesDir = path.join(baseDir, "types");

const typesEntryFile = path.join(typesTmpDir, "index.d.ts");
const typesOutputFile = path.join(typesDir, `${script_name}.d.ts`);

// ディレクトリのクリーン＆作成
function prepareDir(dir) {
	rimraf.sync(dir);
	fs.mkdirSync(dir, { recursive: true });
}

function bundle() {
	return new Promise((resolve, reject) => {
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
			.on("finish", resolve)
			.on("error", reject);
	});
}

async function minifyCode() {
	const result = await terser.minify(fs.readFileSync(outputFile, "utf-8"), {
		toplevel: true,
		sourceMap: {
			filename: path.basename(outputMinFile),
			url: path.basename(outputSourceMinMap),
			content: fs.readFileSync(outputSourceMap, "utf8"),
		},
	});
	fs.writeFileSync(outputMinFile, result.code);
	fs.writeFileSync(outputSourceMinMap, result.map);
}

(async () => {
	try {
		console.log("🧹 distクリーンアップ中...");
		prepareDir(outputDir);
		console.log("📦 バンドル中...");
		await bundle();
		console.log("┗✅ バンドル完了！");

		console.log("🗂️ ファイルのminify中...");
		await minifyCode();
		console.log("┗✅ ファイルのminify完了");

		console.log("🧹 typesTmpクリーンアップ中...");
		prepareDir(typesTmpDir);
		console.log("📄 型定義ファイルを出力中...");
		execSync(`npx tsc --emitDeclarationOnly --declaration --outDir ${typesTmpDir} --project ${baseDir}/tsconfig.json`, {
			stdio: "inherit",
		});
		console.log("┗✅ 型定義ファイルの出力完了");

		{
			console.log("📦 型定義ファイルをバンドル中...");
			const bundle = await rollup({
				input: path.resolve(typesEntryFile),
				plugins: [dts()],
			});
			await bundle.write({
				file: typesOutputFile,
				format: "es",
			});
			console.log("┗✅ 型定義の単一ファイル出力完了！");

			console.log("🧹 typesTmpリセット中...");
			prepareDir(typesTmpDir);
		}

		console.log("🌵 違法文字列を検出中...");
		checkIllegalStrings(baseDir);
		console.log("┗✅ 違法文字列の検出完了！");
	} catch (e) {
		console.error("エラーが発生しました:", e.message);
		process.exit(1);
	}
})();
