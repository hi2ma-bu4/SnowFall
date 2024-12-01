"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiplyOperator = void 0;
const multiplyOperator = exports.multiplyOperator = {
  priority: 7,
  operator: "*",
  type: ["{INT}", "*", "{INT}"],
  calc: (a, b) => a * b
};