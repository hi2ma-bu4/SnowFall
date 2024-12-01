"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.divideOperator = void 0;
const divideOperator = exports.divideOperator = {
  priority: 7,
  operator: "/",
  type: ["{INT}", "/", "{INT}"],
  calc: (a, b) => a / b
};