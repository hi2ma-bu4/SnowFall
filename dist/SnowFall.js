(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],2:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray.js");
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return arrayLikeToArray(r);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":1}],3:[function(require,module,exports){
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],4:[function(require,module,exports){
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
},{"./toPropertyKey.js":11}],5:[function(require,module,exports){
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
},{"./toPropertyKey.js":11}],6:[function(require,module,exports){
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],7:[function(require,module,exports){
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],8:[function(require,module,exports){
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],9:[function(require,module,exports){
var arrayWithoutHoles = require("./arrayWithoutHoles.js");
var iterableToArray = require("./iterableToArray.js");
var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");
var nonIterableSpread = require("./nonIterableSpread.js");
function _toConsumableArray(r) {
  return arrayWithoutHoles(r) || iterableToArray(r) || unsupportedIterableToArray(r) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayWithoutHoles.js":2,"./iterableToArray.js":7,"./nonIterableSpread.js":8,"./unsupportedIterableToArray.js":13}],10:[function(require,module,exports){
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
},{"./typeof.js":12}],11:[function(require,module,exports){
var _typeof = require("./typeof.js")["default"];
var toPrimitive = require("./toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./toPrimitive.js":10,"./typeof.js":12}],12:[function(require,module,exports){
function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],13:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray.js");
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
  }
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":1}],14:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Compiler = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _opcodes = require("../const/opcodes");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SymbolValue = (0, _createClass2["default"])(function SymbolValue(name, depth, index) {
  (0, _classCallCheck2["default"])(this, SymbolValue);
  this.name = name;
  this.depth = depth;
  this.index = index;
});
var SymbolTable = function () {
  function SymbolTable(parent) {
    (0, _classCallCheck2["default"])(this, SymbolTable);
    (0, _defineProperty2["default"])(this, "store", new Map());
    (0, _defineProperty2["default"])(this, "localCount", 0);
    this.parent = parent;
  }
  return (0, _createClass2["default"])(SymbolTable, [{
    key: "define",
    value: function define(name, depth) {
      var symbol = new SymbolValue(name, depth, this.localCount++);
      this.store.set(name, symbol);
      return symbol;
    }
  }, {
    key: "resolve",
    value: function resolve(name) {
      var symbol = this.store.get(name);
      if (symbol) {
        return {
          symbol: symbol,
          isLocal: true
        };
      }
      if (this.parent) {
        return this.parent.resolve(name);
      }
      return null;
    }
  }]);
}();
var Compiler = exports.Compiler = function () {
  function Compiler(ast, settings) {
    var _this = this;
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    (0, _classCallCheck2["default"])(this, Compiler);
    (0, _defineProperty2["default"])(this, "scopeDepth", 0);
    this.ast = ast;
    console.log(ast);
    this.settings = settings;
    this.parentCompiler = parent;
    this.symbolTable = new SymbolTable(parent === null || parent === void 0 ? void 0 : parent.symbolTable);
    this.scopeDepth = parent ? parent.scopeDepth + 1 : 0;
    var funcName = ast.type === "FunctionDeclaration" ? ast.name.name : "main";
    var arity = ast.type === "FunctionDeclaration" ? ast.params.length : 0;
    this.compiledFunction = {
      name: funcName,
      arity: arity,
      chunk: {
        code: [],
        constants: []
      }
    };
    if (ast.type === "FunctionDeclaration") {
      ast.params.forEach(function (p) {
        return _this.symbolTable.define(p.name, _this.scopeDepth);
      });
    }
  }
  return (0, _createClass2["default"])(Compiler, [{
    key: "currentChunk",
    value: function currentChunk() {
      return this.compiledFunction.chunk;
    }
  }, {
    key: "emit",
    value: function emit(_byte) {
      this.currentChunk().code.push(_byte);
    }
  }, {
    key: "emitBytes",
    value: function emitBytes() {
      var _this2 = this;
      for (var _len = arguments.length, bytes = new Array(_len), _key = 0; _key < _len; _key++) {
        bytes[_key] = arguments[_key];
      }
      bytes.forEach(function (b) {
        return _this2.emit(b);
      });
    }
  }, {
    key: "addConstant",
    value: function addConstant(value) {
      var constants = this.currentChunk().constants;
      var existingIndex = constants.findIndex(function (c) {
        return c === value;
      });
      if (existingIndex !== -1) return existingIndex;
      return constants.push(value) - 1;
    }
  }, {
    key: "emitConstant",
    value: function emitConstant(value) {
      this.emitBytes(_opcodes.OpCode.PUSH_CONST, this.addConstant(value));
    }
  }, {
    key: "emitJump",
    value: function emitJump(instruction) {
      this.emit(instruction);
      this.emit(0xff);
      this.emit(0xff);
      return this.currentChunk().code.length - 2;
    }
  }, {
    key: "patchJump",
    value: function patchJump(offset) {
      var jump = this.currentChunk().code.length - offset - 2;
      if (jump > 0xffff) throw new Error("Compiler Error: Too much code to jump over.");
      this.currentChunk().code[offset] = jump >> 8 & 0xff;
      this.currentChunk().code[offset + 1] = jump & 0xff;
    }
  }, {
    key: "emitLoop",
    value: function emitLoop(loopStart) {
      this.emit(_opcodes.OpCode.JUMP);
      var offset = this.currentChunk().code.length - loopStart + 2;
      if (offset > 0xffff) throw new Error("Compiler Error: Loop body too large.");
      this.emit(offset >> 8 & 0xff);
      this.emit(offset & 0xff);
    }
  }, {
    key: "beginScope",
    value: function beginScope() {
      this.scopeDepth++;
    }
  }, {
    key: "endScope",
    value: function endScope() {
      var _this3 = this;
      var popCount = Array.from(this.symbolTable.store.values()).filter(function (s) {
        return s.depth === _this3.scopeDepth;
      }).length;
      for (var i = 0; i < popCount; i++) {
        this.emit(_opcodes.OpCode.POP);
      }
      this.scopeDepth--;
    }
  }, {
    key: "compileNode",
    value: function compileNode(node) {
      switch (node.type) {
        case "Program":
          this.compileStatements(node.body);
          break;
        case "BlockStatement":
          this.compileStatements(node.body);
          break;
        case "ExpressionStatement":
          this.compileExpressionStatement(node);
          break;
        case "VariableDeclaration":
          this.compileVariableDeclaration(node);
          break;
        case "Identifier":
          this.compileIdentifier(node);
          break;
        case "NumericLiteral":
          this.emitConstant(node.value);
          break;
        case "StringLiteral":
          this.emitConstant(node.value);
          break;
        case "IfStatement":
          this.compileIfStatement(node);
          break;
        case "ForStatement":
          this.compileForStatement(node);
          break;
        case "FunctionDeclaration":
          this.compileFunctionDeclaration(node);
          break;
        case "ReturnStatement":
          this.compileReturnStatement(node);
          break;
        case "CallExpression":
          this.compileCallExpression(node);
          break;
        case "UnaryExpression":
          this.compileUnaryExpression(node);
          break;
        case "BinaryExpression":
          this.compileBinaryExpression(node);
          break;
        default:
          throw new Error("Compiler Error: Unknown AST node type: ".concat(node.type));
      }
    }
  }, {
    key: "compileStatements",
    value: function compileStatements(statements) {
      var _this4 = this;
      statements.forEach(function (stmt) {
        return _this4.compileNode(stmt);
      });
    }
  }, {
    key: "compileExpressionStatement",
    value: function compileExpressionStatement(node) {
      this.compileNode(node.expression);
      this.emit(_opcodes.OpCode.POP);
    }
  }, {
    key: "compileVariableDeclaration",
    value: function compileVariableDeclaration(node) {
      if (node.init) {
        this.compileNode(node.init);
      } else {
        this.emit(_opcodes.OpCode.PUSH_NULL);
      }
      if (this.scopeDepth === 0) {
        this.emitBytes(_opcodes.OpCode.DEFINE_GLOBAL, this.addConstant(node.identifier.name));
      } else {
        this.symbolTable.define(node.identifier.name, this.scopeDepth);
      }
    }
  }, {
    key: "compileIdentifier",
    value: function compileIdentifier(node) {
      if (this.settings.builtInFunctions[node.name]) {
        return;
      }
      var resolution = this.symbolTable.resolve(node.name);
      if (resolution) {
        this.emitBytes(_opcodes.OpCode.GET_LOCAL, resolution.symbol.index);
      } else {
        this.emitBytes(_opcodes.OpCode.GET_GLOBAL, this.addConstant(node.name));
      }
    }
  }, {
    key: "compileIfStatement",
    value: function compileIfStatement(node) {
      this.compileNode(node.test);
      var jumpIfFalse = this.emitJump(_opcodes.OpCode.JUMP_IF_FALSE);
      this.compileNode(node.consequence);
      if (node.alternate) {
        var jumpToEnd = this.emitJump(_opcodes.OpCode.JUMP);
        this.patchJump(jumpIfFalse);
        this.compileNode(node.alternate);
        this.patchJump(jumpToEnd);
      } else {
        this.patchJump(jumpIfFalse);
      }
    }
  }, {
    key: "compileForStatement",
    value: function compileForStatement(node) {
      this.beginScope();
      if (node.init) this.compileNode(node.init);
      var loopStart = this.currentChunk().code.length;
      var exitJump = -1;
      if (node.test) {
        this.compileNode(node.test);
        exitJump = this.emitJump(_opcodes.OpCode.JUMP_IF_FALSE);
      }
      this.compileNode(node.body);
      if (node.update) {
        this.compileNode(node.update);
        this.emit(_opcodes.OpCode.POP);
      }
      this.emitLoop(loopStart);
      if (exitJump !== -1) {
        this.patchJump(exitJump);
        this.emit(_opcodes.OpCode.POP);
      }
      this.endScope();
    }
  }, {
    key: "compileFunctionDeclaration",
    value: function compileFunctionDeclaration(node) {
      var funcAST = _objectSpread(_objectSpread({}, node), {}, {
        type: "FunctionDeclaration"
      });
      var compiler = new Compiler(funcAST, this.settings, this);
      compiler.compile();
      var funcConstantIndex = this.addConstant(compiler.compiledFunction);
      this.emitBytes(_opcodes.OpCode.PUSH_CONST, funcConstantIndex);
      if (this.scopeDepth === 0) {
        this.emitBytes(_opcodes.OpCode.DEFINE_GLOBAL, this.addConstant(node.name.name));
      } else {
        this.symbolTable.define(node.name.name, this.scopeDepth);
      }
    }
  }, {
    key: "compileReturnStatement",
    value: function compileReturnStatement(node) {
      if (node.argument) {
        this.compileNode(node.argument);
      } else {
        this.emit(_opcodes.OpCode.PUSH_NULL);
      }
      this.emit(_opcodes.OpCode.RETURN);
    }
  }, {
    key: "compileCallExpression",
    value: function compileCallExpression(node) {
      this.compileNode(node.callee);
      var _iterator = _createForOfIteratorHelper(node.arguments),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var arg = _step.value;
          this.compileNode(arg);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (node.callee.type === "Identifier" && this.settings.builtInFunctions[node.callee.name]) {
        var funcNameIndex = this.addConstant(node.callee.name);
        this.emitBytes(_opcodes.OpCode.CALL_BUILTIN, funcNameIndex, node.arguments.length);
      } else {
        this.emitBytes(_opcodes.OpCode.CALL, node.arguments.length);
      }
    }
  }, {
    key: "compileUnaryExpression",
    value: function compileUnaryExpression(node) {
      this.compileNode(node.right);
      switch (node.operator) {
        case "!":
          this.emit(_opcodes.OpCode.NEGATE);
          break;
        case "-":
          this.emit(_opcodes.OpCode.NEGATE);
          this.emit(_opcodes.OpCode.SUBTRACT);
          break;
        default:
          throw new Error("Compiler Error: Unknown unary operator ".concat(node.operator));
      }
    }
  }, {
    key: "compileBinaryExpression",
    value: function compileBinaryExpression(node) {
      this.compileNode(node.left);
      this.compileNode(node.right);
      switch (node.operator) {
        case "+":
          this.emit(_opcodes.OpCode.ADD);
          break;
        case "-":
          this.emit(_opcodes.OpCode.SUBTRACT);
          break;
        case "*":
          this.emit(_opcodes.OpCode.MULTIPLY);
          break;
        case "/":
          this.emit(_opcodes.OpCode.DIVIDE);
          break;
        case "==":
          this.emit(_opcodes.OpCode.EQUAL);
          break;
        case "!=":
          this.emit(_opcodes.OpCode.NOT_EQUAL);
          break;
        case "<":
          this.emit(_opcodes.OpCode.LESS_THAN);
          break;
        case ">":
          this.emit(_opcodes.OpCode.GREATER_THAN);
          break;
        default:
          throw new Error("Compiler Error: Unknown binary operator ".concat(node.operator));
      }
    }
  }, {
    key: "compile",
    value: function compile() {
      if (this.ast.type === "Program") {
        this.compileNode(this.ast);
        this.emit(_opcodes.OpCode.PUSH_NULL);
        this.emit(_opcodes.OpCode.RETURN);
      } else if (this.ast.type === "FunctionDeclaration") {
        this.compileNode(this.ast.body);
        this.emit(_opcodes.OpCode.PUSH_NULL);
        this.emit(_opcodes.OpCode.RETURN);
      }
      return this.compiledFunction;
    }
  }]);
}();

},{"../const/opcodes":17,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/defineProperty":5,"@babel/runtime/helpers/interopRequireDefault":6}],15:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lexer = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var Lexer = exports.Lexer = function () {
  function Lexer(source) {
    (0, _classCallCheck2["default"])(this, Lexer);
    (0, _defineProperty2["default"])(this, "pos", 0);
    (0, _defineProperty2["default"])(this, "keywords", {
      "let": "KEYWORD",
      "if": "KEYWORD",
      "else": "KEYWORD",
      "for": "KEYWORD",
      "function": "KEYWORD",
      "return": "KEYWORD"
    });
    this.source = source;
    this.currentChar = this.source[this.pos];
  }
  return (0, _createClass2["default"])(Lexer, [{
    key: "advance",
    value: function advance() {
      this.pos++;
      this.currentChar = this.pos < this.source.length ? this.source[this.pos] : null;
    }
  }, {
    key: "peek",
    value: function peek() {
      return this.pos + 1 < this.source.length ? this.source[this.pos + 1] : null;
    }
  }, {
    key: "string",
    value: function string() {
      this.advance();
      var result = "";
      while (this.currentChar !== '"' && this.currentChar !== null) {
        result += this.currentChar;
        this.advance();
      }
      if (this.currentChar === null) {
        throw new Error("Lexer Error: Unterminated string.");
      }
      this.advance();
      return {
        type: "STRING",
        value: result
      };
    }
  }, {
    key: "number",
    value: function number() {
      var result = "";
      while (this.currentChar !== null && /\d/.test(this.currentChar)) {
        result += this.currentChar;
        this.advance();
      }
      return {
        type: "NUMBER",
        value: result
      };
    }
  }, {
    key: "skipWhitespace",
    value: function skipWhitespace() {
      while (this.currentChar !== null && /\s/.test(this.currentChar)) {
        this.advance();
      }
    }
  }, {
    key: "identifier",
    value: function identifier() {
      var result = "";
      while (this.currentChar !== null && /[a-zA-Z_0-9]/.test(this.currentChar)) {
        result += this.currentChar;
        this.advance();
      }
      var type = this.keywords[result] || "IDENTIFIER";
      return {
        type: type,
        value: result
      };
    }
  }, {
    key: "tokenize",
    value: function tokenize() {
      var tokens = [];
      while (this.currentChar !== null) {
        if (/\s/.test(this.currentChar)) {
          this.skipWhitespace();
          continue;
        }
        if (this.currentChar === '"') {
          tokens.push(this.string());
          continue;
        }
        if (/\d/.test(this.currentChar)) {
          tokens.push(this.number());
          continue;
        }
        if (/[a-zA-Z_]/.test(this.currentChar)) {
          tokens.push(this.identifier());
          continue;
        }
        switch (this.currentChar) {
          case "=":
            tokens.push(this.peek() === "=" ? (this.advance(), {
              type: "EQUAL_EQUAL",
              value: "=="
            }) : {
              type: "EQUALS",
              value: "="
            });
            break;
          case "!":
            tokens.push(this.peek() === "=" ? (this.advance(), {
              type: "BANG_EQUAL",
              value: "!="
            }) : {
              type: "BANG",
              value: "!"
            });
            break;
          case ">":
            tokens.push(this.peek() === "=" ? (this.advance(), {
              type: "GREATER_EQUAL",
              value: ">="
            }) : {
              type: "GREATER",
              value: ">"
            });
            break;
          case "<":
            tokens.push(this.peek() === "=" ? (this.advance(), {
              type: "LESS_EQUAL",
              value: "<="
            }) : {
              type: "LESS",
              value: "<"
            });
            break;
          case "+":
            tokens.push({
              type: "PLUS",
              value: "+"
            });
            break;
          case "-":
            tokens.push({
              type: "MINUS",
              value: "-"
            });
            break;
          case "*":
            tokens.push({
              type: "STAR",
              value: "*"
            });
            break;
          case "/":
            tokens.push({
              type: "SLASH",
              value: "/"
            });
            break;
          case "(":
            tokens.push({
              type: "LPAREN",
              value: "("
            });
            break;
          case ")":
            tokens.push({
              type: "RPAREN",
              value: ")"
            });
            break;
          case "{":
            tokens.push({
              type: "LBRACE",
              value: "{"
            });
            break;
          case "}":
            tokens.push({
              type: "RBRACE",
              value: "}"
            });
            break;
          case ";":
            tokens.push({
              type: "SEMICOLON",
              value: ";"
            });
            break;
          case ":":
            tokens.push({
              type: "COLON",
              value: ":"
            });
            break;
          case ",":
            tokens.push({
              type: "COMMA",
              value: ","
            });
            break;
          default:
            throw new Error("Lexer Error: Unknown character: ".concat(this.currentChar));
        }
        this.advance();
      }
      tokens.push({
        type: "EOF",
        value: ""
      });
      return tokens;
    }
  }]);
}();

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/defineProperty":5,"@babel/runtime/helpers/interopRequireDefault":6}],16:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var Precedence;
(function (Precedence) {
  Precedence[Precedence["LOWEST"] = 0] = "LOWEST";
  Precedence[Precedence["EQUALS"] = 1] = "EQUALS";
  Precedence[Precedence["LESSGREATER"] = 2] = "LESSGREATER";
  Precedence[Precedence["SUM"] = 3] = "SUM";
  Precedence[Precedence["PRODUCT"] = 4] = "PRODUCT";
  Precedence[Precedence["PREFIX"] = 5] = "PREFIX";
  Precedence[Precedence["CALL"] = 6] = "CALL";
  Precedence[Precedence["INDEX"] = 7] = "INDEX";
})(Precedence || (Precedence = {}));
var precedences = {
  EQUAL_EQUAL: Precedence.EQUALS,
  BANG_EQUAL: Precedence.EQUALS,
  LESS: Precedence.LESSGREATER,
  GREATER: Precedence.LESSGREATER,
  PLUS: Precedence.SUM,
  MINUS: Precedence.SUM,
  SLASH: Precedence.PRODUCT,
  STAR: Precedence.PRODUCT,
  LPAREN: Precedence.CALL
};
var Parser = exports.Parser = function () {
  function Parser(tokens) {
    var _this = this;
    (0, _classCallCheck2["default"])(this, Parser);
    (0, _defineProperty2["default"])(this, "pos", 0);
    (0, _defineProperty2["default"])(this, "parseIdentifier", function () {
      return {
        type: "Identifier",
        name: _this.currentToken.value
      };
    });
    (0, _defineProperty2["default"])(this, "parseNumericLiteral", function () {
      return {
        type: "NumericLiteral",
        value: parseFloat(_this.currentToken.value)
      };
    });
    (0, _defineProperty2["default"])(this, "parseStringLiteral", function () {
      return {
        type: "StringLiteral",
        value: _this.currentToken.value
      };
    });
    (0, _defineProperty2["default"])(this, "parsePrefixExpression", function () {
      var operator = _this.currentToken.value;
      _this.advance();
      var right = _this.parseExpression(Precedence.PREFIX);
      return {
        type: "UnaryExpression",
        operator: operator,
        right: right
      };
    });
    (0, _defineProperty2["default"])(this, "parseInfixExpression", function (left) {
      var operator = _this.currentToken.value;
      var precedence = _this.currentPrecedence();
      _this.advance();
      var right = _this.parseExpression(precedence);
      return {
        type: "BinaryExpression",
        left: left,
        operator: operator,
        right: right
      };
    });
    (0, _defineProperty2["default"])(this, "parseGroupedExpression", function () {
      _this.advance();
      var exp = _this.parseExpression(Precedence.LOWEST);
      _this.expectPeek("RPAREN");
      return exp;
    });
    (0, _defineProperty2["default"])(this, "parseCallExpression", function (func) {
      var args = _this.parseExpressionList("RPAREN");
      return {
        type: "CallExpression",
        callee: func,
        arguments: args
      };
    });
    (0, _defineProperty2["default"])(this, "parseBlockStatement", function () {
      var body = [];
      _this.advance();
      while (_this.currentToken.type !== "RBRACE" && _this.currentToken.type !== "EOF") {
        var stmt = _this.parseStatement();
        if (stmt) {
          body.push(stmt);
        }
        _this.advance();
      }
      return {
        type: "BlockStatement",
        body: body
      };
    });
    (0, _defineProperty2["default"])(this, "parseVariableDeclaration", function () {
      _this.expectPeek("IDENTIFIER");
      var identifier = {
        type: "Identifier",
        name: _this.currentToken.value
      };
      var typeAnnotation;
      if (_this.peekToken.type === "COLON") {
        _this.advance();
        _this.advance();
        typeAnnotation = _this.parseIdentifier();
      }
      var type = _this.peekToken.type;
      if (type !== "EQUALS") {
        return {
          type: "VariableDeclaration",
          identifier: identifier,
          typeAnnotation: typeAnnotation
        };
      }
      _this.expectPeek("EQUALS");
      _this.advance();
      var init = _this.parseExpression(Precedence.LOWEST);
      if (_this.peekToken.type === "SEMICOLON") {
        _this.advance();
      }
      return {
        type: "VariableDeclaration",
        identifier: identifier,
        typeAnnotation: typeAnnotation,
        init: init
      };
    });
    (0, _defineProperty2["default"])(this, "parseReturnStatement", function () {
      _this.advance();
      if (_this.currentToken.type === "SEMICOLON") {
        return {
          type: "ReturnStatement"
        };
      }
      var argument = _this.parseExpression(Precedence.LOWEST);
      if (_this.peekToken.type === "SEMICOLON") {
        _this.advance();
      }
      return {
        type: "ReturnStatement",
        argument: argument
      };
    });
    (0, _defineProperty2["default"])(this, "parseIfStatement", function () {
      _this.advance();
      _this.expectPeek("LPAREN");
      var test = _this.parseGroupedExpression();
      _this.expectPeek("LBRACE");
      var consequence = _this.parseBlockStatement();
      var alternate;
      var _this$peekToken = _this.peekToken,
        type = _this$peekToken.type,
        value = _this$peekToken.value;
      if (type === "KEYWORD" && value === "else") {
        _this.advance();
        if (_this.peekToken.type === "KEYWORD" && _this.peekToken.value === "if") {
          _this.advance();
          alternate = _this.parseIfStatement();
        } else {
          _this.expectPeek("LBRACE");
          alternate = _this.parseBlockStatement();
        }
      }
      return {
        type: "IfStatement",
        test: test,
        consequence: consequence,
        alternate: alternate
      };
    });
    (0, _defineProperty2["default"])(this, "parseForStatement", function () {
      _this.advance();
      _this.expectPeek("LPAREN");
      _this.advance();
      var init;
      if (_this.currentToken.type !== "SEMICOLON") {
        if (_this.currentToken.type === "KEYWORD" && _this.currentToken.value === "let") {
          init = _this.parseVariableDeclaration();
        } else {
          init = _this.parseExpression(Precedence.LOWEST);
        }
      }
      _this.expectPeek("SEMICOLON");
      _this.advance();
      var test;
      if (_this.currentToken.type !== "SEMICOLON") {
        test = _this.parseExpression(Precedence.LOWEST);
      }
      _this.expectPeek("SEMICOLON");
      _this.advance();
      var update;
      if (_this.currentToken.type !== "RPAREN") {
        update = _this.parseExpression(Precedence.LOWEST);
      }
      _this.expectPeek("RPAREN");
      _this.expectPeek("LBRACE");
      var body = _this.parseBlockStatement();
      return {
        type: "ForStatement",
        init: init,
        test: test,
        update: update,
        body: body
      };
    });
    (0, _defineProperty2["default"])(this, "parseFunctionDeclaration", function () {
      _this.advance();
      var name = _this.parseIdentifier();
      _this.expectPeek("LPAREN");
      var params = [];
      if (_this.peekToken.type !== "RPAREN") {
        _this.advance();
        do {
          _this.advance();
          params.push(_this.parseIdentifier());
        } while (_this.peekToken.type === "COMMA");
      }
      _this.expectPeek("RPAREN");
      _this.expectPeek("LBRACE");
      var body = _this.parseBlockStatement();
      return {
        type: "FunctionDeclaration",
        name: name,
        params: params,
        body: body
      };
    });
    (0, _defineProperty2["default"])(this, "parseExpressionStatement", function () {
      var expression = _this.parseExpression(Precedence.LOWEST);
      if (_this.peekToken.type === "SEMICOLON") {
        _this.advance();
      }
      return {
        type: "ExpressionStatement",
        expression: expression
      };
    });
    this.tokens = tokens;
    this.currentToken = this.tokens[0];
    this.peekToken = this.tokens[1];
    this.prefixParseFns = new Map();
    this.registerPrefix("IDENTIFIER", this.parseIdentifier);
    this.registerPrefix("NUMBER", this.parseNumericLiteral);
    this.registerPrefix("STRING", this.parseStringLiteral);
    this.registerPrefix("BANG", this.parsePrefixExpression);
    this.registerPrefix("MINUS", this.parsePrefixExpression);
    this.registerPrefix("LPAREN", this.parseGroupedExpression);
    this.infixParseFns = new Map();
    this.registerInfix("PLUS", this.parseInfixExpression);
    this.registerInfix("MINUS", this.parseInfixExpression);
    this.registerInfix("SLASH", this.parseInfixExpression);
    this.registerInfix("STAR", this.parseInfixExpression);
    this.registerInfix("EQUAL_EQUAL", this.parseInfixExpression);
    this.registerInfix("BANG_EQUAL", this.parseInfixExpression);
    this.registerInfix("LESS", this.parseInfixExpression);
    this.registerInfix("GREATER", this.parseInfixExpression);
    this.registerInfix("LPAREN", this.parseCallExpression);
  }
  return (0, _createClass2["default"])(Parser, [{
    key: "advance",
    value: function advance() {
      this.pos++;
      this.currentToken = this.peekToken;
      this.peekToken = this.pos + 1 < this.tokens.length ? this.tokens[this.pos + 1] : {
        type: "EOF",
        value: ""
      };
    }
  }, {
    key: "registerPrefix",
    value: function registerPrefix(tokenType, fn) {
      this.prefixParseFns.set(tokenType, fn.bind(this));
    }
  }, {
    key: "registerInfix",
    value: function registerInfix(tokenType, fn) {
      this.infixParseFns.set(tokenType, fn.bind(this));
    }
  }, {
    key: "expectPeek",
    value: function expectPeek(type) {
      if (this.peekToken.type === type) {
        this.advance();
      } else {
        throw new Error("Parser Error: Expected next token to be ".concat(type, ", got ").concat(this.peekToken.type, " instead."));
      }
    }
  }, {
    key: "peekPrecedence",
    value: function peekPrecedence() {
      return precedences[this.peekToken.type] || Precedence.LOWEST;
    }
  }, {
    key: "currentPrecedence",
    value: function currentPrecedence() {
      return precedences[this.currentToken.type] || Precedence.LOWEST;
    }
  }, {
    key: "parseExpression",
    value: function parseExpression(precedence) {
      var prefix = this.prefixParseFns.get(this.currentToken.type);
      if (!prefix) {
        throw new Error("Parser Error: No prefix parse function for ".concat(this.currentToken.type, " found."));
      }
      var leftExp = prefix();
      while (this.peekToken.type !== "SEMICOLON" && precedence < this.peekPrecedence()) {
        var infix = this.infixParseFns.get(this.peekToken.type);
        if (!infix) {
          return leftExp;
        }
        this.advance();
        leftExp = infix(leftExp);
      }
      return leftExp;
    }
  }, {
    key: "parseExpressionList",
    value: function parseExpressionList(endToken) {
      var list = [];
      if (this.peekToken.type === endToken) {
        this.advance();
        return list;
      }
      this.advance();
      list.push(this.parseExpression(Precedence.LOWEST));
      while (this.peekToken.type === "COMMA") {
        this.advance();
        this.advance();
        list.push(this.parseExpression(Precedence.LOWEST));
      }
      this.expectPeek(endToken);
      return list;
    }
  }, {
    key: "parseStatement",
    value: function parseStatement() {
      switch (this.currentToken.type) {
        case "KEYWORD":
          switch (this.currentToken.value) {
            case "let":
              return this.parseVariableDeclaration();
            case "return":
              return this.parseReturnStatement();
            case "if":
              return this.parseIfStatement();
            case "for":
              return this.parseForStatement();
            case "function":
              return this.parseFunctionDeclaration();
          }
        default:
          return this.parseExpressionStatement();
      }
    }
  }, {
    key: "parse",
    value: function parse() {
      var program = {
        type: "Program",
        body: []
      };
      console.log(this.tokens);
      while (this.currentToken.type !== "EOF") {
        var stmt = this.parseStatement();
        if (stmt) {
          program.body.push(stmt);
        }
        this.advance();
      }
      return program;
    }
  }]);
}();

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/defineProperty":5,"@babel/runtime/helpers/interopRequireDefault":6}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpCode = void 0;
var OpCode;
(function (OpCode) {
  OpCode[OpCode["PUSH_CONST"] = 0] = "PUSH_CONST";
  OpCode[OpCode["PUSH_NULL"] = 1] = "PUSH_NULL";
  OpCode[OpCode["ADD"] = 2] = "ADD";
  OpCode[OpCode["SUBTRACT"] = 3] = "SUBTRACT";
  OpCode[OpCode["MULTIPLY"] = 4] = "MULTIPLY";
  OpCode[OpCode["DIVIDE"] = 5] = "DIVIDE";
  OpCode[OpCode["EQUAL"] = 6] = "EQUAL";
  OpCode[OpCode["NOT_EQUAL"] = 7] = "NOT_EQUAL";
  OpCode[OpCode["GREATER_THAN"] = 8] = "GREATER_THAN";
  OpCode[OpCode["LESS_THAN"] = 9] = "LESS_THAN";
  OpCode[OpCode["NEGATE"] = 10] = "NEGATE";
  OpCode[OpCode["POP"] = 11] = "POP";
  OpCode[OpCode["DEFINE_GLOBAL"] = 12] = "DEFINE_GLOBAL";
  OpCode[OpCode["GET_GLOBAL"] = 13] = "GET_GLOBAL";
  OpCode[OpCode["SET_GLOBAL"] = 14] = "SET_GLOBAL";
  OpCode[OpCode["GET_LOCAL"] = 15] = "GET_LOCAL";
  OpCode[OpCode["SET_LOCAL"] = 16] = "SET_LOCAL";
  OpCode[OpCode["JUMP"] = 17] = "JUMP";
  OpCode[OpCode["JUMP_IF_FALSE"] = 18] = "JUMP_IF_FALSE";
  OpCode[OpCode["CALL"] = 19] = "CALL";
  OpCode[OpCode["RETURN"] = 20] = "RETURN";
  OpCode[OpCode["CALL_BUILTIN"] = 21] = "CALL_BUILTIN";
})(OpCode || (exports.OpCode = OpCode = {}));

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _main = require("./main");
if (typeof window !== "undefined") {
  window.SnowFall = _main.SnowFall;
}
var _default = exports["default"] = _main.SnowFall;

},{"./main":19}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnowFall = void 0;
var _compiler = require("./compiler/compiler");
var _lexer = require("./compiler/libs/lexer");
var _parser = require("./compiler/libs/parser");
var _vm = require("./vm/vm");
var defaultSettings = {
  builtInFunctions: {}
};
function compile(source) {
  var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSettings;
  var lexer = new _lexer.Lexer(source);
  var tokens = lexer.tokenize();
  var parser = new _parser.Parser(tokens);
  var ast = parser.parse();
  var compiler = new _compiler.Compiler(ast, settings);
  return compiler.compile();
}
function run(compiled) {
  var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSettings;
  var vm = new _vm.SnowFallVM(compiled, settings);
  return vm.run();
}
function compileAndRun(source) {
  var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSettings;
  var compiled = compile(source, settings);
  return run(compiled, settings);
}
var SnowFall = exports.SnowFall = {
  compile: compile,
  run: run,
  compileAndRun: compileAndRun
};

},{"./compiler/compiler":14,"./compiler/libs/lexer":15,"./compiler/libs/parser":16,"./vm/vm":20}],20:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnowFallVM = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _opcodes = require("../const/opcodes");
var SnowFallVM = exports.SnowFallVM = function () {
  function SnowFallVM(entryFunction, settings) {
    (0, _classCallCheck2["default"])(this, SnowFallVM);
    (0, _defineProperty2["default"])(this, "frames", []);
    (0, _defineProperty2["default"])(this, "stack", []);
    (0, _defineProperty2["default"])(this, "globals", new Map());
    this.settings = settings;
    console.log(entryFunction);
    this.stack.push(entryFunction);
    var frame = {
      func: entryFunction,
      ip: 0,
      stackStart: 0
    };
    this.frames.push(frame);
    this.frame = frame;
  }
  return (0, _createClass2["default"])(SnowFallVM, [{
    key: "readByte",
    value: function readByte() {
      return this.frame.func.chunk.code[this.frame.ip++];
    }
  }, {
    key: "readShort",
    value: function readShort() {
      this.frame.ip += 2;
      var code = this.frame.func.chunk.code;
      return code[this.frame.ip - 2] << 8 | code[this.frame.ip - 1];
    }
  }, {
    key: "readConstant",
    value: function readConstant() {
      return this.frame.func.chunk.constants[this.readByte()];
    }
  }, {
    key: "run",
    value: function run() {
      while (true) {
        var op = this.readByte();
        switch (op) {
          case _opcodes.OpCode.PUSH_CONST:
            this.stack.push(this.readConstant());
            break;
          case _opcodes.OpCode.PUSH_NULL:
            this.stack.push(null);
            break;
          case _opcodes.OpCode.POP:
            this.stack.pop();
            break;
          case _opcodes.OpCode.DEFINE_GLOBAL:
            {
              var name = this.readConstant();
              this.globals.set(name, this.stack[this.stack.length - 1]);
              this.stack.pop();
              break;
            }
          case _opcodes.OpCode.GET_GLOBAL:
            {
              var _name = this.readConstant();
              if (!this.globals.has(_name)) throw new Error("VM Error: Undefined global variable '".concat(_name, "'."));
              this.stack.push(this.globals.get(_name));
              break;
            }
          case _opcodes.OpCode.SET_GLOBAL:
            {
              var _name2 = this.readConstant();
              if (!this.globals.has(_name2)) throw new Error("VM Error: Undefined global variable '".concat(_name2, "'."));
              this.globals.set(_name2, this.stack[this.stack.length - 1]);
              break;
            }
          case _opcodes.OpCode.GET_LOCAL:
            {
              var slot = this.readByte();
              this.stack.push(this.stack[this.frame.stackStart + slot]);
              break;
            }
          case _opcodes.OpCode.SET_LOCAL:
            {
              var _slot = this.readByte();
              this.stack[this.frame.stackStart + _slot] = this.stack[this.stack.length - 1];
              break;
            }
          case _opcodes.OpCode.EQUAL:
            {
              var b = this.stack.pop();
              var a = this.stack.pop();
              this.stack.push(a === b);
              break;
            }
          case _opcodes.OpCode.GREATER_THAN:
            {
              var _b = this.stack.pop();
              var _a = this.stack.pop();
              this.stack.push(_a > _b);
              break;
            }
          case _opcodes.OpCode.LESS_THAN:
            {
              var _b2 = this.stack.pop();
              var _a2 = this.stack.pop();
              this.stack.push(_a2 < _b2);
              break;
            }
          case _opcodes.OpCode.ADD:
            {
              var _b3 = this.stack.pop();
              var _a3 = this.stack.pop();
              if (typeof _a3 === "number" && typeof _b3 === "number") this.stack.push(_a3 + _b3);else if (typeof _a3 === "string" || typeof _b3 === "string") this.stack.push(String(_a3) + String(_b3));else throw new Error("VM Error: Operands must be two numbers or at least one string.");
              break;
            }
          case _opcodes.OpCode.SUBTRACT:
            {
              var _b4 = this.stack.pop();
              var _a4 = this.stack.pop();
              if (typeof _a4 === "number" && typeof _b4 === "number") this.stack.push(_a4 - _b4);else throw new Error("VM Error: Operands must be two numbers.");
              break;
            }
          case _opcodes.OpCode.MULTIPLY:
            {
              var _b5 = this.stack.pop();
              var _a5 = this.stack.pop();
              if (typeof _a5 === "number" && typeof _b5 === "number") this.stack.push(_a5 * _b5);else if (typeof _a5 === "string" && typeof _b5 === "number") this.stack.push(_a5.repeat(_b5));else if (typeof _a5 === "number" && typeof _b5 === "string") this.stack.push(_b5.repeat(_a5));else throw new Error("VM Error: Operands must be two numbers. Or one string and one number.");
              break;
            }
          case _opcodes.OpCode.DIVIDE:
            {
              var _b6 = this.stack.pop();
              var _a6 = this.stack.pop();
              if (typeof _a6 === "number" && typeof _b6 === "number") this.stack.push(_a6 / _b6);else throw new Error("VM Error: Operands must be two numbers.");
              break;
            }
          case _opcodes.OpCode.NEGATE:
            this.stack.push(!this.stack.pop());
            break;
          case _opcodes.OpCode.JUMP:
            {
              var _this$settings$hooks;
              var offset = this.readShort();
              if ((_this$settings$hooks = this.settings.hooks) !== null && _this$settings$hooks !== void 0 && _this$settings$hooks.beforeJump) this.settings.hooks.beforeJump(this, "JUMP");
              this.frame.ip += offset;
              break;
            }
          case _opcodes.OpCode.JUMP_IF_FALSE:
            {
              var _this$settings$hooks2;
              var _offset = this.readShort();
              if ((_this$settings$hooks2 = this.settings.hooks) !== null && _this$settings$hooks2 !== void 0 && _this$settings$hooks2.beforeJump) this.settings.hooks.beforeJump(this, "JUMP_IF_FALSE");
              if (!this.stack[this.stack.length - 1]) {
                this.frame.ip += _offset;
              }
              break;
            }
          case _opcodes.OpCode.CALL:
            {
              var argCount = this.readByte();
              var callee = this.stack[this.stack.length - 1 - argCount];
              if (!(callee && (0, _typeof2["default"])(callee) === "object" && callee.arity !== undefined)) {
                throw new Error("VM Error: Can only call functions.");
              }
              if (argCount !== callee.arity) {
                throw new Error("VM Error: Expected ".concat(callee.arity, " arguments but got ").concat(argCount, "."));
              }
              var newFrame = {
                func: callee,
                ip: 0,
                stackStart: this.stack.length - argCount
              };
              this.frames.push(newFrame);
              this.frame = newFrame;
              break;
            }
          case _opcodes.OpCode.RETURN:
            {
              var result = this.stack.pop();
              this.frames.pop();
              if (this.frames.length === 0) {
                return result;
              }
              this.stack.splice(this.frame.stackStart);
              this.stack.push(result);
              this.frame = this.frames[this.frames.length - 1];
              break;
            }
          case _opcodes.OpCode.CALL_BUILTIN:
            {
              var funcName = this.readConstant();
              var _argCount = this.readByte();
              var args = this.stack.splice(this.stack.length - _argCount, _argCount);
              var func = this.settings.builtInFunctions[funcName];
              if (func) {
                var _result = func.apply(void 0, (0, _toConsumableArray2["default"])(args));
                this.stack.push(_result === undefined ? null : _result);
              } else {
                throw new Error("VM Error: Built-in function ".concat(funcName, " not found."));
              }
              break;
            }
          default:
            throw new Error("VM Error: Unknown opcode ".concat(op));
        }
      }
    }
  }]);
}();

},{"../const/opcodes":17,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/defineProperty":5,"@babel/runtime/helpers/interopRequireDefault":6,"@babel/runtime/helpers/toConsumableArray":9,"@babel/runtime/helpers/typeof":12}]},{},[18])
//# sourceMappingURL=SnowFall.js.map
