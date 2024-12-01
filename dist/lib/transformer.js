"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transformer = void 0;
class Transformer {
  constructor(operatorRegistry) {
    this.operatorRegistry = operatorRegistry;
  }
  transform(ast) {
    let result = 0;
    let currentOperator = "+";
    ast.forEach(node => {
      if (node.type === "number") {
        // currentOperator が null でないことを確認
        if (currentOperator) {
          const calcFn = this.operatorRegistry.getOperator(currentOperator)?.calc;
          if (calcFn) {
            // 演算子に応じた計算を行う
            result = calcFn(result, node.value);
          }
        }
      } else if (node.type === "operator") {
        currentOperator = node.value.operator;
      }
    });
    return result;
  }
}
exports.Transformer = Transformer;