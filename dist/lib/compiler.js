"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Compiler = void 0;
var _operatorRegistry = require("./operatorRegistry");
var _parser = require("./parser");
var _tokenizer = require("./tokenizer");
var _transformer = require("./transformer");
class Compiler {
  constructor() {
    const operatorRegistry = new _operatorRegistry.OperatorRegistry();
    this.tokenizer = new _tokenizer.Tokenizer(operatorRegistry);
    this.parser = new _parser.Parser(this.tokenizer, operatorRegistry);
    this.transformer = new _transformer.Transformer(operatorRegistry);
  }
  compile(code) {
    const ast = this.parser.parse(code);
    const result = this.transformer.transform(ast);
    return `Result: ${result}`;
  }
}
exports.Compiler = Compiler;