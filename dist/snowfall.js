(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],2:[function(require,module,exports){
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],3:[function(require,module,exports){
var isNativeReflectConstruct = require("./isNativeReflectConstruct.js");
var setPrototypeOf = require("./setPrototypeOf.js");
function _construct(t, e, r) {
  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./isNativeReflectConstruct.js":10,"./setPrototypeOf.js":12}],4:[function(require,module,exports){
var toPropertyKey = require("./toPropertyKey.js");
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./toPropertyKey.js":14}],5:[function(require,module,exports){
var toPropertyKey = require("./toPropertyKey.js");
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./toPropertyKey.js":14}],6:[function(require,module,exports){
function _getPrototypeOf(t) {
  return module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _getPrototypeOf(t);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],7:[function(require,module,exports){
var setPrototypeOf = require("./setPrototypeOf.js");
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && setPrototypeOf(t, e);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./setPrototypeOf.js":12}],8:[function(require,module,exports){
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],9:[function(require,module,exports){
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],10:[function(require,module,exports){
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],11:[function(require,module,exports){
var _typeof = require("./typeof.js")["default"];
var assertThisInitialized = require("./assertThisInitialized.js");
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return assertThisInitialized(t);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./assertThisInitialized.js":1,"./typeof.js":15}],12:[function(require,module,exports){
function _setPrototypeOf(t, e) {
  return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],13:[function(require,module,exports){
var _typeof = require("./typeof.js")["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./typeof.js":15}],14:[function(require,module,exports){
var _typeof = require("./typeof.js")["default"];
var toPrimitive = require("./toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./toPrimitive.js":13,"./typeof.js":15}],15:[function(require,module,exports){
function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],16:[function(require,module,exports){
var getPrototypeOf = require("./getPrototypeOf.js");
var setPrototypeOf = require("./setPrototypeOf.js");
var isNativeFunction = require("./isNativeFunction.js");
var construct = require("./construct.js");
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? new Map() : void 0;
  return module.exports = _wrapNativeSuper = function _wrapNativeSuper(t) {
    if (null === t || !isNativeFunction(t)) return t;
    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t)) return r.get(t);
      r.set(t, Wrapper);
    }
    function Wrapper() {
      return construct(t, arguments, getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), setPrototypeOf(Wrapper, t);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _wrapNativeSuper(t);
}
module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./construct.js":3,"./getPrototypeOf.js":6,"./isNativeFunction.js":9,"./setPrototypeOf.js":12}],17:[function(require,module,exports){
"use strict";

var _lexer = require("./lib/lexer");
var input = "\nx = 5;\ny = 10;\napple = 1;\na = x; // \u3068\u308A\u3042\u3048\u305A\u3001x\u306E\u5024\u3092\u4EE3\u5165\nb = x+2;\n\n/*\n    \u30C7\u30FC\u30BF\u3060\u3088()\n*/\n\nhoge = \"fuga\";\n\n";
var lexer = new _lexer.Lexer(input);
var tokens = lexer.tokenize();
console.log(tokens);

},{"./lib/lexer":18}],18:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lexer = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var LexerError = function (_Error) {
  function LexerError() {
    (0, _classCallCheck2["default"])(this, LexerError);
    return _callSuper(this, LexerError, arguments);
  }
  (0, _inherits2["default"])(LexerError, _Error);
  return (0, _createClass2["default"])(LexerError);
}((0, _wrapNativeSuper2["default"])(Error));
var Lexer = exports.Lexer = function () {
  function Lexer(input) {
    (0, _classCallCheck2["default"])(this, Lexer);
    (0, _defineProperty2["default"])(this, "position", 0);
    (0, _defineProperty2["default"])(this, "row_counter", 0);
    (0, _defineProperty2["default"])(this, "oldPosition", -1);
    (0, _defineProperty2["default"])(this, "currentChar", null);
    (0, _defineProperty2["default"])(this, "funcList", [this.newline.bind(this), this.string.bind(this), this.identifier.bind(this), this.number.bind(this), this.operator.bind(this), this.semicolon.bind(this)]);
    this.input = input;
    this.input_length = input.length;
    this.advance();
  }
  return (0, _createClass2["default"])(Lexer, [{
    key: "getCurrentChar",
    value: function getCurrentChar() {
      var diff = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (diff) {
        diff--;
        if (this.position + diff >= this.input_length) {
          return null;
        }
        return this.input[this.position + diff];
      }
      return this.currentChar;
    }
  }, {
    key: "advance",
    value: function advance() {
      if (this.position < this.input_length) {
        this.currentChar = this.input[this.position];
        this.position++;
      } else {
        this.currentChar = null;
      }
    }
  }, {
    key: "advanceCommit",
    value: function advanceCommit() {
      this.advance();
      this.commit();
    }
  }, {
    key: "commit",
    value: function commit() {
      if (this.position > this.oldPosition) {
        this.oldPosition = this.position;
      }
    }
  }, {
    key: "rollback",
    value: function rollback() {
      if (this.position > this.oldPosition) {
        this.position = this.oldPosition - 1;
        this.advance();
      }
    }
  }, {
    key: "skipWhitespace",
    value: function skipWhitespace() {
      var currentChar = this.getCurrentChar();
      while (currentChar && /[^\S\n]/.test(currentChar)) {
        this.advance();
        currentChar = this.getCurrentChar();
      }
      this.commit();
    }
  }, {
    key: "skipComment",
    value: function skipComment() {
      if (this.getCurrentChar() === "/") {
        this.advance();
        if (this.getCurrentChar() === "/") {
          this.advance();
          var currentChar = this.getCurrentChar();
          while (this.currentChar && currentChar !== "\n") {
            this.advance();
            currentChar = this.getCurrentChar();
          }
          this.commit();
        } else if (this.getCurrentChar() === "*") {
          this.advance();
          var _currentChar = this.getCurrentChar();
          while (_currentChar && !(_currentChar === "*" && this.getCurrentChar(1) === "/")) {
            if (_currentChar === "\n") {
              this.row_counter++;
            }
            this.advance();
            _currentChar = this.getCurrentChar();
          }
          this.commit();
        }
      }
    }
  }, {
    key: "newline",
    value: function newline() {
      if (this.getCurrentChar() === "\n") {
        this.row_counter++;
        this.advanceCommit();
        return {
          type: "NEWLINE",
          value: "\n"
        };
      }
      return null;
    }
  }, {
    key: "identifier",
    value: function identifier() {
      var idStr = "";
      var currentChar = this.getCurrentChar();
      if (currentChar && /[a-zA-Z_]/.test(currentChar)) {
        idStr += currentChar;
        this.advance();
        currentChar = this.getCurrentChar();
        while (currentChar && /[0-9a-zA-Z_]/.test(currentChar)) {
          idStr += currentChar;
          this.advance();
          currentChar = this.getCurrentChar();
        }
      }
      if (idStr) {
        this.commit();
        return {
          type: "IDENTIFIER",
          value: idStr
        };
      }
      this.rollback();
      return null;
    }
  }, {
    key: "number",
    value: function number() {
      var numberStr = "";
      while (this.currentChar && /[0-9]/.test(this.currentChar)) {
        numberStr += this.currentChar;
        this.advance();
      }
      if (numberStr) {
        this.commit();
        return {
          type: "NUMBER",
          value: parseFloat(numberStr)
        };
      }
      this.rollback();
      return null;
    }
  }, {
    key: "string",
    value: function string() {
      var stringStr = "";
      var quote = this.getCurrentChar();
      var is_multi_line = false;
      if (quote === "`") {
        is_multi_line = true;
      }
      if (quote === '"' || quote === "'" || is_multi_line) {
        this.advance();
        var currentChar = this.getCurrentChar();
        while (currentChar && currentChar !== quote && (is_multi_line || currentChar !== "\n")) {
          stringStr += currentChar;
          if (currentChar === "\n") {
            this.row_counter++;
          }
          this.advance();
          currentChar = this.getCurrentChar();
        }
        if (currentChar === quote) {
          this.advanceCommit();
          return {
            type: "STRING",
            value: stringStr
          };
        }
      }
      this.rollback();
      return null;
    }
  }, {
    key: "operator",
    value: function operator() {
      var currentChar = this.getCurrentChar();
      switch (currentChar) {
        case "+":
          this.advanceCommit();
          return {
            type: "PLUS",
            value: "+"
          };
        case "-":
          this.advanceCommit();
          return {
            type: "MINUS",
            value: "-"
          };
        case "*":
          this.advanceCommit();
          if (this.getCurrentChar() === "*") {
            this.advanceCommit();
            return {
              type: "POWER",
              value: "**"
            };
          }
          return {
            type: "MULTIPLY",
            value: "*"
          };
        case "^":
          this.advanceCommit();
          return {
            type: "POWER",
            value: "^"
          };
        case "/":
          this.advanceCommit();
          return {
            type: "DIVIDE",
            value: "/"
          };
        case "%":
          this.advanceCommit();
          return {
            type: "MODULO",
            value: "%"
          };
        case "|":
          this.advanceCommit();
          if (this.getCurrentChar() === "|") {
            this.advanceCommit();
            return {
              type: "OR",
              value: "||"
            };
          }
          return {
            type: "BIT_OR",
            value: "|"
          };
        case "&":
          this.advanceCommit();
          if (this.getCurrentChar() === "&") {
            this.advanceCommit();
            return {
              type: "AND",
              value: "&&"
            };
          }
          return {
            type: "BIT_AND",
            value: "&"
          };
        case "<":
          this.advanceCommit();
          if (this.getCurrentChar() === "=") {
            this.advanceCommit();
            return {
              type: "LESS_THAN_OR_EQUAL",
              value: "<="
            };
          } else if (this.getCurrentChar() === "<") {
            this.advanceCommit();
            return {
              type: "SHIFT_LEFT",
              value: "<<"
            };
          }
          return {
            type: "LESS_THAN",
            value: "<"
          };
        case ">":
          this.advanceCommit();
          if (this.getCurrentChar() === "=") {
            this.advanceCommit();
            return {
              type: "GREATER_THAN_OR_EQUAL",
              value: ">="
            };
          } else if (this.getCurrentChar() === ">") {
            this.advanceCommit();
            return {
              type: "SHIFT_RIGHT",
              value: ">>"
            };
          }
          return {
            type: "GREATER_THAN",
            value: ">"
          };
        case "=":
          this.advanceCommit();
          if (this.getCurrentChar() === "=") {
            this.advanceCommit();
            if (this.getCurrentChar() === "=") {
              this.advanceCommit();
              return {
                type: "TRIPLE_EQUALS",
                value: "==="
              };
            }
            return {
              type: "EQUALS",
              value: "=="
            };
          }
          return {
            type: "ASSIGN",
            value: "="
          };
        default:
          this.rollback();
          return null;
      }
    }
  }, {
    key: "semicolon",
    value: function semicolon() {
      if (this.currentChar === ";") {
        this.advance();
        return {
          type: "SEMICOLON",
          value: ";"
        };
      }
      return null;
    }
  }, {
    key: "tokenize",
    value: function tokenize() {
      var tokens = [];
      while (this.getCurrentChar() !== null) {
        this.skipWhitespace();
        this.skipComment();
        var token = void 0,
          continueFlag = false;
        var _iterator = _createForOfIteratorHelper(this.funcList),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var func = _step.value;
            if (token = func()) {
              tokens.push(token);
              continueFlag = true;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (continueFlag) {
          continue;
        }
        this.logError("Unknown character: \"".concat(this.getCurrentChar(), "\""));
      }
      return tokens;
    }
  }, {
    key: "logError",
    value: function logError(message) {
      throw new LexerError("".concat(message, " (").concat(this.row_counter, "{").concat(this.position, "})"));
    }
  }]);
}();

},{"@babel/runtime/helpers/classCallCheck":2,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/defineProperty":5,"@babel/runtime/helpers/getPrototypeOf":6,"@babel/runtime/helpers/inherits":7,"@babel/runtime/helpers/interopRequireDefault":8,"@babel/runtime/helpers/possibleConstructorReturn":11,"@babel/runtime/helpers/wrapNativeSuper":16}]},{},[17])
//# sourceMappingURL=snowfall.js.map
