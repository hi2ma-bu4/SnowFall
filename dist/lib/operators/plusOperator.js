"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plusOperator = void 0;
const plusOperator = exports.plusOperator = {
  priority: 8,
  operator: "+",
  type: ["{INT}", "+", "{INT}"],
  calc: (a, b) => a + b
};