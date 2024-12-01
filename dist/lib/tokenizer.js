"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tokenizer = void 0;
class Tokenizer {
  constructor(operatorRegistry) {
    this.operatorRegistry = operatorRegistry;
  }
  tokenize(code) {
    // 演算子の正規表現を取得
    const operatorRegex = this.operatorRegistry.generateRegex();

    // 数字と演算子を分割するための正規表現
    const regex = new RegExp(`(\\d+|${operatorRegex})`, "g");

    // コードをトークン化
    return code.match(regex) || [];
  }
}
exports.Tokenizer = Tokenizer;