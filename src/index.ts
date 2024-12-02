import { Lexer } from "./lib/lexer";
import { Parser } from "./lib/parser";

declare global {
	interface Window {
		Lexer: typeof Lexer;
	}
}

if (typeof window !== "undefined") {
	window.Lexer = Lexer;
}

const input = `
int x = 5;
int y = 10;
int apple = 1;
int a = x; // とりあえず、xの値を代入
int b = apple;

/*
    データだよ()
*/

string hoge = "fuga";

`;

const lexer = new Lexer(input);
const tokens = lexer.tokenize();
console.log(tokens);

const parser = new Parser(tokens);
const ast = parser.parse();
console.log(ast);
