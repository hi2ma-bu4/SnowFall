import { Lexer } from "./lib/lexer";

const input = `
x = 5;
y = 10;
apple = 1;
a = x; // とりあえず、xの値を代入
b = x+2;

/*
    データだよ()
*/

hoge = "fuga";

`;

const lexer = new Lexer(input);
const tokens = lexer.tokenize();

console.log(tokens);
