"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minusOperator = void 0;
const minusOperator = exports.minusOperator = {
  priority: 8,
  operator: "-",
  type: ["{INT}", "-", "{INT}"],
  calc: (a, b) => a - b
};