"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperatorRegistry = void 0;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// 演算子を動的にインポート
class OperatorRegistry {
  operators = {};
  constructor() {
    this.loadOperators();
  }

  // 演算子を遅延ロード
  async loadOperators() {
    const plusOperator = await Promise.resolve().then(() => _interopRequireWildcard(require("./operators/plusOperator")));
    const minusOperator = await Promise.resolve().then(() => _interopRequireWildcard(require("./operators/minusOperator")));
    this.registerOperator(plusOperator.plusOperator);
    this.registerOperator(minusOperator.minusOperator);
  }

  // 演算子の登録
  registerOperator(operator) {
    this.operators[operator.operator] = operator;
  }

  // 演算子の取得
  getOperator(operator) {
    return this.operators[operator];
  }

  // 演算子の正規表現をエスケープして生成
  escapeRegExp(str) {
    return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&");
  }

  // 全ての演算子の正規表現を生成
  generateRegex() {
    const operatorPatterns = Object.values(this.operators).map(op => `(${this.escapeRegExp(op.operator)})`).join("|");
    return operatorPatterns;
  }
}
exports.OperatorRegistry = OperatorRegistry;