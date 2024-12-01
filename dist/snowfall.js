"use strict";

var _lexer = require("./lib/lexer");
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

a a p
`;
const lexer = new _lexer.Lexer(input);
const tokens = lexer.tokenize();
console.log(tokens);