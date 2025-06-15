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
var _compressor = require("../util/compressor");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SymbolValue = (0, _createClass2["default"])(function SymbolValue(name, depth, index, isConst) {
  (0, _classCallCheck2["default"])(this, SymbolValue);
  this.name = name;
  this.depth = depth;
  this.index = index;
  this.isConst = isConst;
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
    value: function define(name, depth, isConst) {
      var symbol = new SymbolValue(name, depth, this.localCount++, isConst);
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
        var resolved = this.parent.resolve(name);
        if (resolved) {
          return _objectSpread(_objectSpread({}, resolved), {}, {
            isLocal: false
          });
        }
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
    (0, _defineProperty2["default"])(this, "loopContext", []);
    this.ast = ast;
    this.currentNode = ast;
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
        constants: [],
        lines: []
      }
    };
    if (ast.type === "FunctionDeclaration") {
      ast.params.forEach(function (p) {
        return _this.symbolTable.define(p.name, _this.scopeDepth, false);
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
      var chunk = this.currentChunk();
      chunk.code.push(_byte);
      chunk.lines.push(this.currentNode.line);
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
      this.emit(_opcodes.OpCode.LOOP);
      var offset = this.currentChunk().code.length - loopStart + 2;
      if (offset > 0xffff) throw new Error("Compiler Error: Loop body too large.");
      this.emit(offset >> 8 & 0xff);
      this.emit(offset & 0xff);
    }
  }, {
    key: "beginScope",
    value: function beginScope() {
      this.scopeDepth++;
      this.symbolTable = new SymbolTable(this.symbolTable);
    }
  }, {
    key: "endScope",
    value: function endScope() {
      var popCount = this.symbolTable.localCount;
      for (var i = 0; i < popCount; i++) {
        this.emit(_opcodes.OpCode.POP);
      }
      this.scopeDepth--;
      if (this.symbolTable.parent) {
        this.symbolTable = this.symbolTable.parent;
      }
    }
  }, {
    key: "compileNode",
    value: function compileNode(node) {
      var previousNode = this.currentNode;
      this.currentNode = node;
      switch (node.type) {
        case "Program":
          this.compileStatements(node.body);
          break;
        case "EmptyStatement":
          break;
        case "BlockStatement":
          this.beginScope();
          this.compileStatements(node.body);
          this.endScope();
          break;
        case "ExpressionStatement":
          this.compileNode(node.expression);
          this.emit(_opcodes.OpCode.POP);
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
        case "BooleanLiteral":
          this.emit(node.value ? _opcodes.OpCode.PUSH_TRUE : _opcodes.OpCode.PUSH_FALSE);
          break;
        case "ArrayLiteral":
          this.compileArrayLiteral(node);
          break;
        case "ObjectLiteral":
          this.compileObjectLiteral(node);
          break;
        case "IfStatement":
          this.compileIfStatement(node);
          break;
        case "ForStatement":
          this.compileForStatement(node);
          break;
        case "WhileStatement":
          this.compileWhileStatement(node);
          break;
        case "SwitchStatement":
          this.compileSwitchStatement(node);
          break;
        case "BreakStatement":
          this.compileBreakStatement(node);
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
        case "MemberExpression":
          this.compileMemberExpression(node);
          break;
        case "AssignmentExpression":
          this.compileAssignmentExpression(node);
          break;
        case "UnaryExpression":
          this.compileUnaryExpression(node);
          break;
        case "UpdateExpression":
          this.compileUpdateExpression(node);
          break;
        case "BinaryExpression":
          this.compileBinaryExpression(node);
          break;
        case "LogicalExpression":
          this.compileLogicalExpression(node);
          break;
        case "TryStatement":
          this.compileTryStatement(node);
          break;
        default:
          throw new Error("Compiler Error: Unknown AST node type: ".concat(node.type));
      }
      this.currentNode = previousNode;
    }
  }, {
    key: "compileStatements",
    value: function compileStatements(statements) {
      var _this3 = this;
      statements.forEach(function (stmt) {
        return _this3.compileNode(stmt);
      });
    }
  }, {
    key: "compileVariableDeclaration",
    value: function compileVariableDeclaration(node) {
      if (node.init) {
        this.compileNode(node.init);
      } else {
        this.emit(_opcodes.OpCode.PUSH_NULL);
      }
      if (node.typeAnnotation) {
        var typeName = node.typeAnnotation.name;
        if (typeName.toLowerCase() !== "any") {
          this.emitBytes(_opcodes.OpCode.CHECK_TYPE, this.addConstant(typeName));
        }
      }
      if (this.scopeDepth === 0) {
        this.emitBytes(_opcodes.OpCode.DEFINE_GLOBAL, this.addConstant(node.identifier.name));
      } else {
        this.symbolTable.define(node.identifier.name, this.scopeDepth, node.kind === "const");
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
    key: "compileAssignmentExpression",
    value: function compileAssignmentExpression(node) {
      this.compileNode(node.right);
      if (node.left.type === "Identifier") {
        var name = node.left.name;
        var resolution = this.symbolTable.resolve(name);
        if (resolution) {
          if (resolution.symbol.isConst) {
            throw new Error("Compiler Error: Cannot assign to constant variable '".concat(name, "'."));
          }
          this.emitBytes(_opcodes.OpCode.SET_LOCAL, resolution.symbol.index);
        } else {
          this.emitBytes(_opcodes.OpCode.SET_GLOBAL, this.addConstant(name));
        }
      } else if (node.left.type === "MemberExpression") {
        var memberNode = node.left;
        this.compileNode(memberNode.object);
        this.compileNode(memberNode.property);
        this.emit(_opcodes.OpCode.SET_PROPERTY);
      } else {
        throw new Error("Compiler Error: Invalid assignment target.");
      }
    }
  }, {
    key: "compileUpdateExpression",
    value: function compileUpdateExpression(node) {
      var argument = node.argument,
        operator = node.operator,
        prefix = node.prefix;
      var resolution = this.symbolTable.resolve(argument.name);
      var isLocal = resolution !== null;
      if (isLocal && resolution.symbol.isConst) {
        throw new Error("Compiler Error: Cannot assign to constant variable '".concat(argument.name, "'."));
      }
      var getOp = isLocal ? _opcodes.OpCode.GET_LOCAL : _opcodes.OpCode.GET_GLOBAL;
      var getArg = isLocal ? resolution.symbol.index : this.addConstant(argument.name);
      var setOp = isLocal ? _opcodes.OpCode.SET_LOCAL : _opcodes.OpCode.SET_GLOBAL;
      var setArg = isLocal ? resolution.symbol.index : this.addConstant(argument.name);
      this.emitBytes(getOp, getArg);
      if (!prefix) {
        this.emitBytes(getOp, getArg);
      }
      this.emitConstant(1);
      this.emit(operator === "++" ? _opcodes.OpCode.ADD : _opcodes.OpCode.SUBTRACT);
      this.emitBytes(setOp, setArg);
      if (prefix) {} else {
        this.emit(_opcodes.OpCode.POP);
      }
    }
  }, {
    key: "compileArrayLiteral",
    value: function compileArrayLiteral(node) {
      var _this4 = this;
      node.elements.forEach(function (el) {
        return _this4.compileNode(el);
      });
      this.emitBytes(_opcodes.OpCode.BUILD_ARRAY, node.elements.length);
    }
  }, {
    key: "compileObjectLiteral",
    value: function compileObjectLiteral(node) {
      var _this5 = this;
      node.properties.forEach(function (prop) {
        _this5.emitConstant(prop.key.value);
        _this5.compileNode(prop.value);
      });
      this.emitBytes(_opcodes.OpCode.BUILD_OBJECT, node.properties.length);
    }
  }, {
    key: "compileMemberExpression",
    value: function compileMemberExpression(node) {
      this.compileNode(node.object);
      if (node.property.type === "Identifier") {
        this.emitConstant(node.property.name);
      } else {
        this.compileNode(node.property);
      }
      this.emit(_opcodes.OpCode.GET_PROPERTY);
    }
  }, {
    key: "compileIfStatement",
    value: function compileIfStatement(node) {
      this.compileNode(node.test);
      var jumpIfFalse = this.emitJump(_opcodes.OpCode.JUMP_IF_FALSE);
      this.emit(_opcodes.OpCode.POP);
      this.compileNode(node.consequence);
      var jumpToEnd = this.emitJump(_opcodes.OpCode.JUMP);
      this.patchJump(jumpIfFalse);
      this.emit(_opcodes.OpCode.POP);
      if (node.alternate) {
        this.compileNode(node.alternate);
      }
      this.patchJump(jumpToEnd);
    }
  }, {
    key: "compileForStatement",
    value: function compileForStatement(node) {
      var _this6 = this;
      this.beginScope();
      if (node.init) this.compileNode(node.init);
      var loopStart = this.currentChunk().code.length;
      this.loopContext.push({
        loopStart: loopStart,
        exitJumps: []
      });
      var exitJump = -1;
      if (node.test) {
        this.compileNode(node.test);
        exitJump = this.emitJump(_opcodes.OpCode.JUMP_IF_FALSE);
        this.emit(_opcodes.OpCode.POP);
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
      var currentLoop = this.loopContext.pop();
      currentLoop.exitJumps.forEach(function (offset) {
        return _this6.patchJump(offset);
      });
      this.endScope();
    }
  }, {
    key: "compileWhileStatement",
    value: function compileWhileStatement(node) {
      var _this7 = this;
      var loopStart = this.currentChunk().code.length;
      this.loopContext.push({
        loopStart: loopStart,
        exitJumps: []
      });
      this.compileNode(node.test);
      var exitJump = this.emitJump(_opcodes.OpCode.JUMP_IF_FALSE);
      this.emit(_opcodes.OpCode.POP);
      this.compileNode(node.body);
      this.emitLoop(loopStart);
      this.patchJump(exitJump);
      this.emit(_opcodes.OpCode.POP);
      var currentLoop = this.loopContext.pop();
      currentLoop.exitJumps.forEach(function (offset) {
        return _this7.patchJump(offset);
      });
    }
  }, {
    key: "compileSwitchStatement",
    value: function compileSwitchStatement(node) {
      var _this8 = this;
      this.compileNode(node.discriminant);
      this.loopContext.push({
        loopStart: -1,
        exitJumps: []
      });
      var caseJumps = [];
      var caseEnds = [];
      var _iterator = _createForOfIteratorHelper(node.cases),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var switchCase = _step.value;
          if (switchCase.test) {
            this.emitBytes(_opcodes.OpCode.GET_LOCAL, this.symbolTable.localCount);
            this.compileNode(switchCase.test);
            this.emit(_opcodes.OpCode.EQUAL);
            var nextCaseJump = this.emitJump(_opcodes.OpCode.JUMP_IF_FALSE);
            this.emit(_opcodes.OpCode.POP);
            this.compileStatements(switchCase.consequent);
            caseEnds.push(this.emitJump(_opcodes.OpCode.JUMP));
            this.patchJump(nextCaseJump);
            this.emit(_opcodes.OpCode.POP);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var defaultCase = node.cases.find(function (c) {
        return c.test === null;
      });
      if (defaultCase) {
        this.compileStatements(defaultCase.consequent);
      }
      caseEnds.forEach(function (offset) {
        return _this8.patchJump(offset);
      });
      var currentLoop = this.loopContext.pop();
      currentLoop.exitJumps.forEach(function (offset) {
        return _this8.patchJump(offset);
      });
      this.emit(_opcodes.OpCode.POP);
    }
  }, {
    key: "compileBreakStatement",
    value: function compileBreakStatement(node) {
      if (this.loopContext.length === 0) {
        throw new Error("Compiler Error: 'break' statement outside of a loop or switch.");
      }
      var exitJump = this.emitJump(_opcodes.OpCode.JUMP);
      this.loopContext[this.loopContext.length - 1].exitJumps.push(exitJump);
    }
  }, {
    key: "compileFunctionDeclaration",
    value: function compileFunctionDeclaration(node) {
      var compiler = new Compiler(node, this.settings, this);
      compiler.compile();
      var funcConstantIndex = this.addConstant(compiler.compiledFunction);
      this.emitBytes(_opcodes.OpCode.PUSH_CONST, funcConstantIndex);
      if (this.scopeDepth === 0) {
        this.emitBytes(_opcodes.OpCode.DEFINE_GLOBAL, this.addConstant(node.name.name));
      } else {
        this.symbolTable.define(node.name.name, this.scopeDepth, false);
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
      var _iterator2 = _createForOfIteratorHelper(node.arguments),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var arg = _step2.value;
          this.compileNode(arg);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
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
          this.emitConstant(0);
          this.emit(_opcodes.OpCode.ADD);
          this.emit(_opcodes.OpCode.SUBTRACT);
          this.emit(_opcodes.OpCode.NEGATE);
          break;
        default:
          throw new Error("Compiler Error: Unknown unary operator ".concat(node.operator));
      }
    }
  }, {
    key: "compileBinaryExpression",
    value: function compileBinaryExpression(node) {
      if (node.left.type === "NumericLiteral" && node.right.type === "NumericLiteral") {
        var leftVal = node.left.value;
        var rightVal = node.right.value;
        var result = null;
        switch (node.operator) {
          case "+":
            result = leftVal + rightVal;
            break;
          case "-":
            result = leftVal - rightVal;
            break;
          case "*":
            result = leftVal * rightVal;
            break;
          case "/":
            result = rightVal !== 0 ? leftVal / rightVal : null;
            break;
        }
        if (result !== null) {
          this.emitConstant(result);
          return;
        }
      }
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
        case "%":
          this.emit(_opcodes.OpCode.MODULO);
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
        case "<=":
          this.emit(_opcodes.OpCode.LESS_EQUAL);
          break;
        case ">":
          this.emit(_opcodes.OpCode.GREATER_THAN);
          break;
        case ">=":
          this.emit(_opcodes.OpCode.GREATER_EQUAL);
          break;
        case "&":
          this.emit(_opcodes.OpCode.BITWISE_AND);
          break;
        case "|":
          this.emit(_opcodes.OpCode.BITWISE_OR);
          break;
        default:
          throw new Error("Compiler Error: Unknown binary operator ".concat(node.operator));
      }
    }
  }, {
    key: "compileLogicalExpression",
    value: function compileLogicalExpression(node) {
      if (node.operator === "&&") {
        this.compileNode(node.left);
        var endJump = this.emitJump(_opcodes.OpCode.JUMP_IF_FALSE);
        this.emit(_opcodes.OpCode.POP);
        this.compileNode(node.right);
        this.patchJump(endJump);
      } else if (node.operator === "||") {
        this.compileNode(node.left);
        var elseJump = this.emitJump(_opcodes.OpCode.JUMP_IF_FALSE);
        var _endJump = this.emitJump(_opcodes.OpCode.JUMP);
        this.patchJump(elseJump);
        this.emit(_opcodes.OpCode.POP);
        this.compileNode(node.right);
        this.patchJump(_endJump);
      }
    }
  }, {
    key: "compileTryStatement",
    value: function compileTryStatement(node) {
      var catchJump = this.emitJump(_opcodes.OpCode.SETUP_EXCEPTION);
      this.compileNode(node.tryBlock);
      this.emit(_opcodes.OpCode.TEARDOWN_EXCEPTION);
      var endJump = this.emitJump(_opcodes.OpCode.JUMP);
      this.patchJump(catchJump);
      if (node.catchClause) {
        this.beginScope();
        this.symbolTable.define(node.catchClause.param.name, this.scopeDepth, false);
        this.compileNode(node.catchClause.body);
        this.endScope();
      }
      this.patchJump(endJump);
      if (node.finallyBlock) {
        this.compileNode(node.finallyBlock);
      }
    }
  }, {
    key: "compressData",
    value: function compressData() {
      var _this$settings$output;
      if (!((_this$settings$output = this.settings.output) !== null && _this$settings$output !== void 0 && _this$settings$output.compact)) {
        return this.compiledFunction;
      }
      return {
        name: this.compiledFunction.name,
        arity: this.compiledFunction.arity,
        code: _compressor.Compressor.encodeNumbers(this.compiledFunction.chunk.code),
        constants: _compressor.Compressor.encodeJSON(this.compiledFunction.chunk.constants),
        lines: _compressor.Compressor.encodeSmartPack(this.compiledFunction.chunk.lines)
      };
    }
  }, {
    key: "compile",
    value: function compile() {
      this.compileNode(this.ast);
      if (this.ast.type === "Program" || this.ast.type === "FunctionDeclaration") {
        this.emit(_opcodes.OpCode.PUSH_NULL);
        this.emit(_opcodes.OpCode.RETURN);
      }
      return this.compressData();
    }
  }]);
}();

},{"../const/opcodes":17,"../util/compressor":25,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/defineProperty":5,"@babel/runtime/helpers/interopRequireDefault":6}],15:[function(require,module,exports){
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
    (0, _defineProperty2["default"])(this, "line", 1);
    (0, _defineProperty2["default"])(this, "column", 1);
    (0, _defineProperty2["default"])(this, "keywords", {
      "let": "KEYWORD",
      "const": "KEYWORD",
      "if": "KEYWORD",
      "else": "KEYWORD",
      "for": "KEYWORD",
      "while": "KEYWORD",
      "switch": "KEYWORD",
      "case": "KEYWORD",
      "default": "KEYWORD",
      "break": "KEYWORD",
      "function": "KEYWORD",
      "return": "KEYWORD",
      "true": "TRUE",
      "false": "FALSE",
      "try": "KEYWORD",
      "catch": "KEYWORD",
      "finally": "KEYWORD",
      "throw": "KEYWORD"
    });
    this.source = source;
    this.currentChar = this.source[this.pos];
  }
  return (0, _createClass2["default"])(Lexer, [{
    key: "advance",
    value: function advance() {
      if (this.currentChar === "\n") {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
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
      return this.createToken("STRING", result);
    }
  }, {
    key: "number",
    value: function number() {
      var result = "";
      while (this.currentChar !== null && /\d/.test(this.currentChar)) {
        result += this.currentChar;
        this.advance();
      }
      if (this.currentChar === "." && this.peek() !== null && /\d/.test(this.peek())) {
        result += this.currentChar;
        this.advance();
        while (this.currentChar !== null && /\d/.test(this.currentChar)) {
          result += this.currentChar;
          this.advance();
        }
      }
      return this.createToken("NUMBER", result);
    }
  }, {
    key: "skipWhitespace",
    value: function skipWhitespace() {
      while (this.currentChar !== null && /\s/.test(this.currentChar)) {
        this.advance();
      }
    }
  }, {
    key: "createToken",
    value: function createToken(type, value) {
      return {
        type: type,
        value: value,
        line: this.line,
        column: this.column
      };
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
      return this.createToken(type, result);
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
            tokens.push(this.peek() === "=" ? (this.advance(), this.createToken("EQUAL_EQUAL", "==")) : this.createToken("EQUALS", "="));
            break;
          case "!":
            tokens.push(this.peek() === "=" ? (this.advance(), this.createToken("BANG_EQUAL", "!=")) : this.createToken("BANG", "!"));
            break;
          case ">":
            tokens.push(this.peek() === "=" ? (this.advance(), this.createToken("GREATER_EQUAL", ">=")) : this.createToken("GREATER", ">"));
            break;
          case "<":
            tokens.push(this.peek() === "=" ? (this.advance(), this.createToken("LESS_EQUAL", "<=")) : this.createToken("LESS", "<"));
            break;
          case "&":
            tokens.push(this.peek() === "&" ? (this.advance(), this.createToken("AND", "&&")) : this.createToken("AMPERSAND", "&"));
            break;
          case "|":
            tokens.push(this.peek() === "|" ? (this.advance(), this.createToken("OR", "||")) : this.createToken("PIPE", "|"));
            break;
          case "+":
            tokens.push(this.peek() === "+" ? (this.advance(), this.createToken("PLUS_PLUS", "++")) : this.createToken("PLUS", "+"));
            break;
          case "-":
            tokens.push(this.peek() === "-" ? (this.advance(), this.createToken("MINUS_MINUS", "--")) : this.createToken("MINUS", "-"));
            break;
          case "*":
            tokens.push(this.createToken("STAR", "*"));
            break;
          case "/":
            tokens.push(this.createToken("SLASH", "/"));
            break;
          case "%":
            tokens.push(this.createToken("PERCENT", "%"));
            break;
          case "(":
            tokens.push(this.createToken("LPAREN", "("));
            break;
          case ")":
            tokens.push(this.createToken("RPAREN", ")"));
            break;
          case "{":
            tokens.push(this.createToken("LBRACE", "{"));
            break;
          case "}":
            tokens.push(this.createToken("RBRACE", "}"));
            break;
          case "[":
            tokens.push(this.createToken("LBRACKET", "["));
            break;
          case "]":
            tokens.push(this.createToken("RBRACKET", "]"));
            break;
          case ";":
            tokens.push(this.createToken("SEMICOLON", ";"));
            break;
          case ":":
            tokens.push(this.createToken("COLON", ":"));
            break;
          case ",":
            tokens.push(this.createToken("COMMA", ","));
            break;
          default:
            throw new Error("Lexer Error: Unknown character: ".concat(this.currentChar));
        }
        this.advance();
      }
      tokens.push(this.createToken("EOF", ""));
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Precedence;
(function (Precedence) {
  Precedence[Precedence["LOWEST"] = 0] = "LOWEST";
  Precedence[Precedence["ASSIGNMENT"] = 1] = "ASSIGNMENT";
  Precedence[Precedence["OR"] = 2] = "OR";
  Precedence[Precedence["AND"] = 3] = "AND";
  Precedence[Precedence["BITWISE_OR"] = 4] = "BITWISE_OR";
  Precedence[Precedence["BITWISE_AND"] = 5] = "BITWISE_AND";
  Precedence[Precedence["EQUALS"] = 6] = "EQUALS";
  Precedence[Precedence["LESS_GREATER"] = 7] = "LESS_GREATER";
  Precedence[Precedence["SUM"] = 8] = "SUM";
  Precedence[Precedence["PRODUCT"] = 9] = "PRODUCT";
  Precedence[Precedence["PREFIX"] = 10] = "PREFIX";
  Precedence[Precedence["POSTFIX"] = 11] = "POSTFIX";
  Precedence[Precedence["CALL"] = 12] = "CALL";
  Precedence[Precedence["INDEX"] = 13] = "INDEX";
})(Precedence || (Precedence = {}));
var precedences = {
  EQUALS: Precedence.ASSIGNMENT,
  OR: Precedence.OR,
  AND: Precedence.AND,
  PIPE: Precedence.BITWISE_OR,
  AMPERSAND: Precedence.BITWISE_AND,
  EQUAL_EQUAL: Precedence.EQUALS,
  BANG_EQUAL: Precedence.EQUALS,
  GREATER: Precedence.LESS_GREATER,
  GREATER_EQUAL: Precedence.LESS_GREATER,
  LESS: Precedence.LESS_GREATER,
  LESS_EQUAL: Precedence.LESS_GREATER,
  PLUS: Precedence.SUM,
  MINUS: Precedence.SUM,
  STAR: Precedence.PRODUCT,
  SLASH: Precedence.PRODUCT,
  PERCENT: Precedence.PRODUCT,
  PLUS_PLUS: Precedence.POSTFIX,
  MINUS_MINUS: Precedence.POSTFIX,
  LPAREN: Precedence.CALL,
  LBRACKET: Precedence.INDEX,
  DOT: Precedence.INDEX
};
var Parser = exports.Parser = function () {
  function Parser(tokens) {
    var _this = this;
    (0, _classCallCheck2["default"])(this, Parser);
    (0, _defineProperty2["default"])(this, "pos", 0);
    (0, _defineProperty2["default"])(this, "parseIdentifier", function () {
      return _this.createNode("Identifier", {
        name: _this.currentToken.value
      });
    });
    (0, _defineProperty2["default"])(this, "parseNumericLiteral", function () {
      return _this.createNode("NumericLiteral", {
        value: parseFloat(_this.currentToken.value)
      });
    });
    (0, _defineProperty2["default"])(this, "parseStringLiteral", function () {
      return _this.createNode("StringLiteral", {
        value: _this.currentToken.value
      });
    });
    (0, _defineProperty2["default"])(this, "parseBooleanLiteral", function () {
      return _this.createNode("BooleanLiteral", {
        value: _this.currentToken.type === "TRUE"
      });
    });
    (0, _defineProperty2["default"])(this, "parseAssignmentExpression", function (left) {
      if (left.type !== "Identifier" && left.type !== "MemberExpression") {
        throw new Error("Parser Error: Invalid assignment target.");
      }
      var precedence = _this.currentPrecedence();
      _this.advance();
      var right = _this.parseExpression(precedence - 1);
      return _this.createNode("AssignmentExpression", {
        left: left,
        right: right
      });
    });
    (0, _defineProperty2["default"])(this, "parsePrefixExpression", function () {
      var operator = _this.currentToken.value;
      _this.advance();
      var right = _this.parseExpression(Precedence.PREFIX);
      return _this.createNode("UnaryExpression", {
        operator: operator,
        right: right
      });
    });
    (0, _defineProperty2["default"])(this, "parseUpdateExpression", function (left) {
      if (left) {
        if (left.type !== "Identifier") {
          throw new Error("Parser Error: The left-hand side of a postfix operator must be an identifier.");
        }
        return _this.createNode("UpdateExpression", {
          operator: _this.currentToken.value,
          argument: left,
          prefix: false
        });
      } else {
        var operator = _this.currentToken.value;
        _this.advance();
        if (_this.currentToken.type !== "IDENTIFIER") {
          throw new Error("Parser Error: The right-hand side of a prefix operator must be an identifier.");
        }
        var argument = _this.parseIdentifier();
        return _this.createNode("UpdateExpression", {
          operator: operator,
          argument: argument,
          prefix: true
        });
      }
    });
    (0, _defineProperty2["default"])(this, "parseInfixExpression", function (left) {
      var operator = _this.currentToken.value;
      var precedence = _this.currentPrecedence();
      _this.advance();
      var right = _this.parseExpression(precedence);
      return _this.createNode("BinaryExpression", {
        left: left,
        operator: operator,
        right: right
      });
    });
    (0, _defineProperty2["default"])(this, "parseLogicalExpression", function (left) {
      var operator = _this.currentToken.value;
      var precedence = _this.currentPrecedence();
      _this.advance();
      var right = _this.parseExpression(precedence);
      return _this.createNode("LogicalExpression", {
        left: left,
        operator: operator,
        right: right
      });
    });
    (0, _defineProperty2["default"])(this, "parseGroupedOrTupleExpression", function () {
      _this.advance();
      if (_this.peekToken.type === "RPAREN") {
        _this.advance();
        return _this.createNode("TupleLiteral", {
          elements: []
        });
      }
      var exp = _this.parseExpression(Precedence.LOWEST);
      if (_this.peekToken.type === "COMMA") {
        var elements = [exp];
        while (_this.peekToken.type === "COMMA") {
          _this.advance();
          _this.advance();
          elements.push(_this.parseExpression(Precedence.LOWEST));
        }
        _this.expectPeek("RPAREN");
        return _this.createNode("TupleLiteral", {
          elements: elements
        });
      }
      if (_this.currentToken.type !== "RPAREN") {
        throw new Error("Parser Error: Expected ')' after expression.");
      }
      return exp;
    });
    (0, _defineProperty2["default"])(this, "parseCallExpression", function (func) {
      var args = _this.parseExpressionList("RPAREN");
      return _this.createNode("CallExpression", {
        callee: func,
        arguments: args
      });
    });
    (0, _defineProperty2["default"])(this, "parseMemberExpression", function (object) {
      var property;
      var isBracketAccess = _this.currentToken.type === "LBRACKET";
      _this.advance();
      if (isBracketAccess) {
        property = _this.parseExpression(Precedence.LOWEST);
        _this.expectPeek("RBRACKET");
      } else {
        if (_this.currentToken.type !== "IDENTIFIER") {
          throw new Error("Parser Error: Expected identifier after '.'.");
        }
        property = _this.parseIdentifier();
      }
      return _this.createNode("MemberExpression", {
        object: object,
        property: property
      });
    });
    (0, _defineProperty2["default"])(this, "parseArrayLiteral", function () {
      var elements = _this.parseExpressionList("RBRACKET");
      return _this.createNode("ArrayLiteral", {
        elements: elements
      });
    });
    (0, _defineProperty2["default"])(this, "parseObjectLiteral", function () {
      var properties = [];
      if (_this.peekToken.type === "RBRACE") {
        _this.advance();
        return _this.createNode("ObjectLiteral", {
          properties: properties
        });
      }
      _this.advance();
      do {
        _this.advance();
        if (_this.currentToken.type !== "IDENTIFIER" && _this.currentToken.type !== "STRING") {
          throw new Error("Parser Error: Invalid key in object literal. Must be an identifier or a string.");
        }
        var key = _this.currentToken.type === "IDENTIFIER" ? _this.parseIdentifier() : _this.parseStringLiteral();
        _this.expectPeek("COLON");
        _this.advance();
        var value = _this.parseExpression(Precedence.LOWEST);
        properties.push({
          key: key,
          value: value
        });
      } while (_this.peekToken.type === "COMMA");
      _this.expectPeek("RBRACE");
      return _this.createNode("ObjectLiteral", {
        properties: properties
      });
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
      return _this.createNode("BlockStatement", {
        body: body
      });
    });
    (0, _defineProperty2["default"])(this, "parseCondition", function () {
      _this.expectPeek("LPAREN");
      _this.advance();
      var expression = _this.parseExpression(Precedence.LOWEST);
      _this.expectPeek("RPAREN");
      return expression;
    });
    (0, _defineProperty2["default"])(this, "parseVariableDeclaration", function () {
      var kind = _this.currentToken.value;
      _this.expectPeek("IDENTIFIER");
      var identifier = _this.createNode("Identifier", {
        name: _this.currentToken.value
      });
      var typeAnnotation;
      if (_this.peekToken.type === "COLON") {
        _this.advance();
        _this.advance();
        typeAnnotation = _this.parseIdentifier();
      }
      var type = _this.peekToken.type;
      if (type !== "EQUALS") {
        return _this.createNode("VariableDeclaration", {
          kind: kind,
          identifier: identifier,
          typeAnnotation: typeAnnotation
        });
      }
      _this.expectPeek("EQUALS");
      _this.advance();
      var init = _this.parseExpression(Precedence.LOWEST);
      if (_this.peekToken.type === "SEMICOLON") {
        _this.advance();
      }
      return _this.createNode("VariableDeclaration", {
        kind: kind,
        identifier: identifier,
        typeAnnotation: typeAnnotation,
        init: init
      });
    });
    (0, _defineProperty2["default"])(this, "parseReturnStatement", function () {
      _this.advance();
      if (_this.currentToken.type === "SEMICOLON") {
        return _this.createNode("ReturnStatement", {});
      }
      var argument = _this.parseExpression(Precedence.LOWEST);
      if (_this.peekToken.type === "SEMICOLON") {
        _this.advance();
      }
      return _this.createNode("ReturnStatement", {
        argument: argument
      });
    });
    (0, _defineProperty2["default"])(this, "parseBreakStatement", function () {
      return _this.createNode("BreakStatement", {});
    });
    (0, _defineProperty2["default"])(this, "parseIfStatement", function () {
      var test = _this.parseCondition();
      var consequence;
      if (_this.peekToken.type === "LBRACE") {
        _this.expectPeek("LBRACE");
        consequence = _this.parseBlockStatement();
      } else {
        _this.advance();
        consequence = _this.parseStatement();
      }
      if (consequence === null) {
        throw new Error("Parser Error: Consequence of 'if' statement is empty.");
      }
      var alternate;
      var _this$peekToken = _this.peekToken,
        type = _this$peekToken.type,
        value = _this$peekToken.value;
      if (type === "KEYWORD" && value === "else") {
        _this.advance();
        if (_this.peekToken.type === "KEYWORD" && _this.peekToken.value === "if") {
          _this.advance();
          alternate = _this.parseIfStatement();
        } else if (_this.peekToken.type === "LBRACE") {
          _this.expectPeek("LBRACE");
          alternate = _this.parseBlockStatement();
        } else {
          _this.advance();
          alternate = _this.parseStatement() || undefined;
        }
      }
      return _this.createNode("IfStatement", {
        test: test,
        consequence: consequence,
        alternate: alternate
      });
    });
    (0, _defineProperty2["default"])(this, "parseForStatement", function () {
      _this.expectPeek("LPAREN");
      _this.advance();
      var init;
      if (_this.currentToken.type !== "SEMICOLON") {
        if (_this.currentToken.type === "KEYWORD" && (_this.currentToken.value === "let" || _this.currentToken.value === "const")) {
          init = _this.parseVariableDeclaration();
        } else {
          init = _this.parseExpression(Precedence.LOWEST);
        }
      }
      _this.expectPeek("SEMICOLON");
      _this.advance();
      var test;
      if (_this.currentToken.type !== "SEMICOLON") {
        var _test = _this.parseExpression(Precedence.LOWEST);
      }
      _this.expectPeek("SEMICOLON");
      _this.advance();
      var update;
      if (_this.currentToken.type !== "RPAREN") {
        update = _this.parseExpression(Precedence.LOWEST);
      }
      _this.expectPeek("RPAREN");
      var body;
      if (_this.peekToken.type === "LBRACE") {
        _this.expectPeek("LBRACE");
        body = _this.parseBlockStatement();
      } else {
        _this.advance();
        body = _this.parseStatement();
      }
      if (body === null) {
        throw new Error("Parser Error: Body of 'for' statement is empty.");
      }
      return _this.createNode("ForStatement", {
        init: init,
        test: test,
        update: update,
        body: body
      });
    });
    (0, _defineProperty2["default"])(this, "parseWhileStatement", function () {
      var test = _this.parseCondition();
      var body;
      if (_this.peekToken.type === "LBRACE") {
        _this.expectPeek("LBRACE");
        body = _this.parseBlockStatement();
      } else {
        _this.advance();
        body = _this.parseStatement();
      }
      if (body === null) {
        throw new Error("Parser Error: Body of 'while' statement is empty.");
      }
      return _this.createNode("WhileStatement", {
        test: test,
        body: body
      });
    });
    (0, _defineProperty2["default"])(this, "parseSwitchStatement", function () {
      var discriminant = _this.parseCondition();
      _this.expectPeek("LBRACE");
      _this.advance();
      var cases = [];
      while (_this.currentToken.type !== "RBRACE" && _this.currentToken.type !== "EOF") {
        var test = null;
        if (_this.currentToken.type === "KEYWORD" && _this.currentToken.value === "case") {
          _this.advance();
          test = _this.parseExpression(Precedence.LOWEST);
        } else if (_this.currentToken.type === "KEYWORD" && _this.currentToken.value === "default") {
          _this.advance();
        } else {
          throw new Error("Parser Error: Expected 'case' or 'default', got ".concat(_this.currentToken.type));
        }
        _this.expectPeek("COLON");
        _this.advance();
        var consequent = [];
        while (_this.currentToken.type !== "RBRACE" && !(_this.currentToken.type === "KEYWORD" && (_this.currentToken.value === "case" || _this.currentToken.value === "default"))) {
          var stmt = _this.parseStatement();
          if (stmt) consequent.push(stmt);
          _this.advance();
        }
        cases.push(_this.createNode("SwitchCase", {
          test: test,
          consequent: consequent
        }));
      }
      return _this.createNode("SwitchStatement", {
        discriminant: discriminant,
        cases: cases
      });
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
      return _this.createNode("FunctionDeclaration", {
        name: name,
        params: params,
        body: body
      });
    });
    (0, _defineProperty2["default"])(this, "parseTryStatement", function () {
      _this.expectPeek("LBRACE");
      var tryBlock = _this.parseBlockStatement();
      var catchClause = null;
      if (_this.peekToken.type === "KEYWORD" && _this.peekToken.value === "catch") {
        _this.advance();
        _this.expectPeek("LPAREN");
        _this.advance();
        var param = _this.parseIdentifier();
        _this.expectPeek("RPAREN");
        _this.expectPeek("LBRACE");
        var body = _this.parseBlockStatement();
        catchClause = {
          param: param,
          body: body
        };
      }
      var finallyBlock = null;
      if (_this.peekToken.type === "KEYWORD" && _this.peekToken.value === "finally") {
        _this.advance();
        _this.expectPeek("LBRACE");
        finallyBlock = _this.parseBlockStatement();
      }
      if (!catchClause && !finallyBlock) {
        throw new Error("Parser Error: 'try' must have at least a 'catch' or 'finally' block.");
      }
      return _this.createNode("TryStatement", {
        tryBlock: tryBlock,
        catchClause: catchClause,
        finallyBlock: finallyBlock
      });
    });
    (0, _defineProperty2["default"])(this, "parseExpressionStatement", function () {
      var expression = _this.parseExpression(Precedence.LOWEST);
      if (_this.peekToken.type === "SEMICOLON") {
        _this.advance();
      }
      return _this.createNode("ExpressionStatement", {
        expression: expression
      });
    });
    this.tokens = tokens;
    this.currentToken = this.tokens[0];
    this.peekToken = this.tokens[1];
    this.prefixParseFns = new Map();
    this.registerPrefix("IDENTIFIER", this.parseIdentifier);
    this.registerPrefix("NUMBER", this.parseNumericLiteral);
    this.registerPrefix("STRING", this.parseStringLiteral);
    this.registerPrefix("TRUE", this.parseBooleanLiteral);
    this.registerPrefix("FALSE", this.parseBooleanLiteral);
    this.registerPrefix("BANG", this.parsePrefixExpression);
    this.registerPrefix("MINUS", this.parsePrefixExpression);
    this.registerPrefix("PLUS_PLUS", this.parseUpdateExpression);
    this.registerPrefix("MINUS_MINUS", this.parseUpdateExpression);
    this.registerPrefix("LPAREN", this.parseGroupedOrTupleExpression);
    this.registerPrefix("LBRACKET", this.parseArrayLiteral);
    this.registerPrefix("LBRACE", this.parseObjectLiteral);
    this.infixParseFns = new Map();
    this.registerInfix("EQUALS", this.parseAssignmentExpression);
    this.registerInfix("PLUS", this.parseInfixExpression);
    this.registerInfix("MINUS", this.parseInfixExpression);
    this.registerInfix("STAR", this.parseInfixExpression);
    this.registerInfix("SLASH", this.parseInfixExpression);
    this.registerInfix("PERCENT", this.parseInfixExpression);
    this.registerInfix("EQUAL_EQUAL", this.parseInfixExpression);
    this.registerInfix("BANG_EQUAL", this.parseInfixExpression);
    this.registerInfix("GREATER", this.parseInfixExpression);
    this.registerInfix("GREATER_EQUAL", this.parseInfixExpression);
    this.registerInfix("LESS", this.parseInfixExpression);
    this.registerInfix("LESS_EQUAL", this.parseInfixExpression);
    this.registerInfix("AMPERSAND", this.parseInfixExpression);
    this.registerInfix("PIPE", this.parseInfixExpression);
    this.registerInfix("AND", this.parseLogicalExpression);
    this.registerInfix("OR", this.parseLogicalExpression);
    this.registerInfix("PLUS_PLUS", this.parseUpdateExpression);
    this.registerInfix("MINUS_MINUS", this.parseUpdateExpression);
    this.registerInfix("LPAREN", this.parseCallExpression);
    this.registerInfix("LBRACKET", this.parseMemberExpression);
    this.registerInfix("DOT", this.parseMemberExpression);
  }
  return (0, _createClass2["default"])(Parser, [{
    key: "createNode",
    value: function createNode(type, props) {
      return _objectSpread(_objectSpread({
        type: type
      }, props), {}, {
        line: this.currentToken.line,
        column: this.currentToken.column
      });
    }
  }, {
    key: "advance",
    value: function advance() {
      this.pos++;
      this.currentToken = this.peekToken;
      if (this.pos + 1 < this.tokens.length) {
        this.peekToken = this.tokens[this.pos + 1];
      } else {
        this.peekToken = {
          type: "EOF",
          value: "",
          line: this.currentToken.line,
          column: this.currentToken.column + 1
        };
      }
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
      var isPrefix = true;
      var prefix = this.prefixParseFns.get(this.currentToken.type);
      if (!prefix) {
        isPrefix = false;
      }
      var leftExp;
      if (isPrefix) {
        leftExp = prefix();
      } else {
        var updateFn = this.infixParseFns.get(this.currentToken.type);
        if (updateFn && (this.currentToken.type === "PLUS_PLUS" || this.currentToken.type === "MINUS_MINUS")) {
          throw new Error("Postfix operators must follow an expression.");
        } else {
          throw new Error("Parser Error: No prefix parse function for ".concat(this.currentToken.type, " found."));
        }
      }
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
      if (this.currentToken.type === "SEMICOLON") {
        return this.createNode("EmptyStatement", {});
      }
      switch (this.currentToken.type) {
        case "KEYWORD":
          switch (this.currentToken.value) {
            case "let":
            case "const":
              return this.parseVariableDeclaration();
            case "return":
              return this.parseReturnStatement();
            case "if":
              return this.parseIfStatement();
            case "for":
              return this.parseForStatement();
            case "while":
              return this.parseWhileStatement();
            case "switch":
              return this.parseSwitchStatement();
            case "break":
              return this.parseBreakStatement();
            case "function":
              return this.parseFunctionDeclaration();
            case "try":
              return this.parseTryStatement();
          }
        default:
          return this.parseExpressionStatement();
      }
    }
  }, {
    key: "parse",
    value: function parse() {
      var program = this.createNode("Program", {
        body: []
      });
      console.log(this.tokens);
      while (this.currentToken.type !== "EOF") {
        if (this.currentToken.type === "SEMICOLON") {
          this.advance();
          continue;
        }
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
  OpCode[OpCode["PUSH_TRUE"] = 2] = "PUSH_TRUE";
  OpCode[OpCode["PUSH_FALSE"] = 3] = "PUSH_FALSE";
  OpCode[OpCode["ADD"] = 4] = "ADD";
  OpCode[OpCode["SUBTRACT"] = 5] = "SUBTRACT";
  OpCode[OpCode["MULTIPLY"] = 6] = "MULTIPLY";
  OpCode[OpCode["DIVIDE"] = 7] = "DIVIDE";
  OpCode[OpCode["MODULO"] = 8] = "MODULO";
  OpCode[OpCode["EQUAL"] = 9] = "EQUAL";
  OpCode[OpCode["NOT_EQUAL"] = 10] = "NOT_EQUAL";
  OpCode[OpCode["GREATER_THAN"] = 11] = "GREATER_THAN";
  OpCode[OpCode["GREATER_EQUAL"] = 12] = "GREATER_EQUAL";
  OpCode[OpCode["LESS_THAN"] = 13] = "LESS_THAN";
  OpCode[OpCode["LESS_EQUAL"] = 14] = "LESS_EQUAL";
  OpCode[OpCode["NEGATE"] = 15] = "NEGATE";
  OpCode[OpCode["BITWISE_AND"] = 16] = "BITWISE_AND";
  OpCode[OpCode["BITWISE_OR"] = 17] = "BITWISE_OR";
  OpCode[OpCode["POP"] = 18] = "POP";
  OpCode[OpCode["DEFINE_GLOBAL"] = 19] = "DEFINE_GLOBAL";
  OpCode[OpCode["GET_GLOBAL"] = 20] = "GET_GLOBAL";
  OpCode[OpCode["SET_GLOBAL"] = 21] = "SET_GLOBAL";
  OpCode[OpCode["GET_LOCAL"] = 22] = "GET_LOCAL";
  OpCode[OpCode["SET_LOCAL"] = 23] = "SET_LOCAL";
  OpCode[OpCode["BUILD_ARRAY"] = 24] = "BUILD_ARRAY";
  OpCode[OpCode["BUILD_OBJECT"] = 25] = "BUILD_OBJECT";
  OpCode[OpCode["GET_PROPERTY"] = 26] = "GET_PROPERTY";
  OpCode[OpCode["SET_PROPERTY"] = 27] = "SET_PROPERTY";
  OpCode[OpCode["JUMP"] = 28] = "JUMP";
  OpCode[OpCode["JUMP_IF_FALSE"] = 29] = "JUMP_IF_FALSE";
  OpCode[OpCode["LOOP"] = 30] = "LOOP";
  OpCode[OpCode["CALL"] = 31] = "CALL";
  OpCode[OpCode["RETURN"] = 32] = "RETURN";
  OpCode[OpCode["CALL_BUILTIN"] = 33] = "CALL_BUILTIN";
  OpCode[OpCode["CHECK_TYPE"] = 34] = "CHECK_TYPE";
  OpCode[OpCode["SETUP_EXCEPTION"] = 35] = "SETUP_EXCEPTION";
  OpCode[OpCode["TEARDOWN_EXCEPTION"] = 36] = "TEARDOWN_EXCEPTION";
  OpCode[OpCode["THROW"] = 37] = "THROW";
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

},{"./main":24}],19:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var config = _interopRequireWildcard(require("./config"));
var util = _interopRequireWildcard(require("./util"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Compressor = exports["default"] = function () {
  function Compressor(options) {
    (0, _classCallCheck2["default"])(this, Compressor);
    (0, _defineProperty2["default"])(this, "_data", null);
    (0, _defineProperty2["default"])(this, "_table", null);
    (0, _defineProperty2["default"])(this, "_result", null);
    (0, _defineProperty2["default"])(this, "_offset", 0);
    (0, _defineProperty2["default"])(this, "_dataLen", 0);
    (0, _defineProperty2["default"])(this, "_index", 0);
    (0, _defineProperty2["default"])(this, "_length", 0);
    this._init(options);
  }
  return (0, _createClass2["default"])(Compressor, [{
    key: "_init",
    value: function _init(options) {
      options = options || {};
      this._data = null;
      this._table = null;
      this._result = null;
      this._onDataCallback = options.onData;
      this._onEndCallback = options.onEnd;
    }
  }, {
    key: "_createTable",
    value: function _createTable() {
      var table = util.createBuffer(8, config.TABLE_LENGTH);
      for (var i = 0; i < config.TABLE_LENGTH; i++) {
        table[i] = config.BASE62TABLE.charCodeAt(i);
      }
      return table;
    }
  }, {
    key: "_onData",
    value: function _onData(buffer, length) {
      var chunk = util.bufferToString_fast(buffer, length);
      if (this._onDataCallback) {
        this._onDataCallback(chunk);
      } else if (this._result !== null) {
        this._result += chunk;
      }
    }
  }, {
    key: "_onEnd",
    value: function _onEnd() {
      if (this._onEndCallback) {
        this._onEndCallback();
      }
      this._data = this._table = null;
    }
  }, {
    key: "_search",
    value: function _search() {
      var i = 2;
      var data = this._data;
      var offset = this._offset;
      var len = config.BUFFER_MAX;
      if (this._dataLen - offset < len) {
        len = this._dataLen - offset;
      }
      if (i > len) {
        return false;
      }
      var pos = offset - config.WINDOW_BUFFER_MAX;
      var win = data.substring(pos, offset + len);
      var limit = offset + i - 3 - pos;
      var j, s, index, lastIndex, bestIndex, winPart;
      do {
        if (i === 2) {
          s = data.charAt(offset) + data.charAt(offset + 1);
          index = win.indexOf(s);
          if (index === -1 || index > limit) {
            break;
          }
        } else if (i === 3) {
          s = s + data.charAt(offset + 2);
        } else {
          s = data.substr(offset, i);
        }
        if (config.STRING_LASTINDEXOF_BUG) {
          winPart = data.substring(pos, offset + i - 1);
          lastIndex = winPart.lastIndexOf(s);
        } else {
          lastIndex = win.lastIndexOf(s, limit);
        }
        if (lastIndex === -1) {
          break;
        }
        bestIndex = lastIndex;
        j = pos + lastIndex;
        do {
          if (data.charCodeAt(offset + i) !== data.charCodeAt(j + i)) {
            break;
          }
        } while (++i < len);
        if (index === lastIndex) {
          i++;
          break;
        }
      } while (++i < len);
      if (i === 2) {
        return false;
      }
      this._index = config.WINDOW_BUFFER_MAX - bestIndex;
      this._length = i - 1;
      return true;
    }
  }, {
    key: "compress",
    value: function compress(data) {
      if (data == null || data.length === 0) {
        return "";
      }
      var result = "";
      var table = this._createTable();
      var win = util.createWindow();
      var buffer = util.createBuffer(8, config.COMPRESS_CHUNK_SIZE);
      var i = 0;
      this._result = "";
      this._offset = win.length;
      this._data = win + data;
      this._dataLen = this._data.length;
      var index = -1;
      var lastIndex = -1;
      var c, c1, c2, c3, c4;
      while (this._offset < this._dataLen) {
        if (!this._search()) {
          c = this._data.charCodeAt(this._offset++);
          if (c < config.LATIN_BUFFER_MAX) {
            if (c < config.UNICODE_CHAR_MAX) {
              c1 = c;
              index = config.LATIN_INDEX;
            } else {
              c1 = c % config.UNICODE_CHAR_MAX;
              c2 = (c - c1) / config.UNICODE_CHAR_MAX;
              index = c2 + config.LATIN_INDEX;
            }
            if (lastIndex === index) {
              buffer[i++] = table[c1];
            } else {
              buffer[i++] = table[index - config.LATIN_INDEX_START];
              buffer[i++] = table[c1];
              lastIndex = index;
            }
          } else {
            if (c < config.UNICODE_BUFFER_MAX) {
              index = config.UNICODE_INDEX;
              c1 = c;
            } else {
              c1 = c % config.UNICODE_BUFFER_MAX;
              c2 = (c - c1) / config.UNICODE_BUFFER_MAX;
              index = c2 + config.UNICODE_INDEX;
            }
            if (c1 < config.UNICODE_CHAR_MAX) {
              c3 = c1;
              c4 = 0;
            } else {
              c3 = c1 % config.UNICODE_CHAR_MAX;
              c4 = (c1 - c3) / config.UNICODE_CHAR_MAX;
            }
            if (lastIndex === index) {
              buffer[i++] = table[c3];
              buffer[i++] = table[c4];
            } else {
              buffer[i++] = table[config.CHAR_START];
              buffer[i++] = table[index - config.TABLE_LENGTH];
              buffer[i++] = table[c3];
              buffer[i++] = table[c4];
              lastIndex = index;
            }
          }
        } else {
          if (this._index < config.BUFFER_MAX) {
            c1 = this._index;
            c2 = 0;
          } else {
            c1 = this._index % config.BUFFER_MAX;
            c2 = (this._index - c1) / config.BUFFER_MAX;
          }
          if (this._length === 2) {
            buffer[i++] = table[c2 + config.COMPRESS_FIXED_START];
            buffer[i++] = table[c1];
          } else {
            buffer[i++] = table[c2 + config.COMPRESS_START];
            buffer[i++] = table[c1];
            buffer[i++] = table[this._length];
          }
          this._offset += this._length;
          if (~lastIndex) {
            lastIndex = -1;
          }
        }
        if (i >= config.COMPRESS_CHUNK_MAX) {
          this._onData(buffer, i);
          i = 0;
        }
      }
      if (i > 0) {
        this._onData(buffer, i);
      }
      this._onEnd();
      result = this._result;
      this._result = null;
      return result === null ? "" : result;
    }
  }]);
}();

},{"./config":20,"./util":23,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/defineProperty":5,"@babel/runtime/helpers/interopRequireDefault":6,"@babel/runtime/helpers/typeof":12}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WINDOW_MAX = exports.WINDOW_BUFFER_MAX = exports.UNICODE_INDEX = exports.UNICODE_CHAR_MAX = exports.UNICODE_BUFFER_MAX = exports.TABLE_LENGTH = exports.TABLE_DIFF = exports.STRING_LASTINDEXOF_BUG = exports.LATIN_INDEX_START = exports.LATIN_INDEX = exports.LATIN_DECODE_MAX = exports.LATIN_BUFFER_MAX = exports.HAS_TYPED = exports.DECOMPRESS_CHUNK_SIZE = exports.DECOMPRESS_CHUNK_MAX = exports.DECODE_MAX = exports.COMPRESS_START = exports.COMPRESS_INDEX = exports.COMPRESS_FIXED_START = exports.COMPRESS_CHUNK_SIZE = exports.COMPRESS_CHUNK_MAX = exports.CHAR_START = exports.CAN_CHARCODE_APPLY_TYPED = exports.CAN_CHARCODE_APPLY = exports.BUFFER_MAX = exports.BASE62TABLE = exports.APPLY_BUFFER_SIZE_OK = exports.APPLY_BUFFER_SIZE = void 0;
exports.setApplyBufferSizeOk = setApplyBufferSizeOk;
var HAS_TYPED = exports.HAS_TYPED = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined";
var canCharCodeApply = false;
try {
  if (String.fromCharCode.apply(null, [0x61]) === "a") {
    canCharCodeApply = true;
  }
} catch (e) {}
var CAN_CHARCODE_APPLY = exports.CAN_CHARCODE_APPLY = canCharCodeApply;
var canCharCodeApplyTyped = false;
if (HAS_TYPED) {
  try {
    if (String.fromCharCode.apply(null, new Uint8Array([0x61])) === "a") {
      canCharCodeApplyTyped = true;
    }
  } catch (e) {}
}
var CAN_CHARCODE_APPLY_TYPED = exports.CAN_CHARCODE_APPLY_TYPED = canCharCodeApplyTyped;
var APPLY_BUFFER_SIZE = exports.APPLY_BUFFER_SIZE = 65533;
var APPLY_BUFFER_SIZE_OK = exports.APPLY_BUFFER_SIZE_OK = null;
function setApplyBufferSizeOk(value) {
  exports.APPLY_BUFFER_SIZE_OK = APPLY_BUFFER_SIZE_OK = value;
}
var stringLastIndexOfBug = false;
if ("abc\u307B\u3052".lastIndexOf("\u307B\u3052", 1) !== -1) {
  stringLastIndexOfBug = true;
}
var STRING_LASTINDEXOF_BUG = exports.STRING_LASTINDEXOF_BUG = stringLastIndexOfBug;
var BASE62TABLE = exports.BASE62TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var TABLE_LENGTH = exports.TABLE_LENGTH = BASE62TABLE.length;
var TABLE_DIFF = exports.TABLE_DIFF = Math.max(TABLE_LENGTH, 62) - Math.min(TABLE_LENGTH, 62);
var BUFFER_MAX = exports.BUFFER_MAX = TABLE_LENGTH - 1;
var WINDOW_MAX = exports.WINDOW_MAX = 1024;
var WINDOW_BUFFER_MAX = exports.WINDOW_BUFFER_MAX = 304;
var COMPRESS_CHUNK_SIZE = exports.COMPRESS_CHUNK_SIZE = APPLY_BUFFER_SIZE;
var COMPRESS_CHUNK_MAX = exports.COMPRESS_CHUNK_MAX = COMPRESS_CHUNK_SIZE - TABLE_LENGTH;
var DECOMPRESS_CHUNK_SIZE = exports.DECOMPRESS_CHUNK_SIZE = APPLY_BUFFER_SIZE;
var DECOMPRESS_CHUNK_MAX = exports.DECOMPRESS_CHUNK_MAX = DECOMPRESS_CHUNK_SIZE + WINDOW_MAX * 2;
var LATIN_CHAR_MAX = 11;
var LATIN_BUFFER_MAX = exports.LATIN_BUFFER_MAX = LATIN_CHAR_MAX * (LATIN_CHAR_MAX + 1);
var UNICODE_CHAR_MAX = exports.UNICODE_CHAR_MAX = 40;
var UNICODE_BUFFER_MAX = exports.UNICODE_BUFFER_MAX = UNICODE_CHAR_MAX * (UNICODE_CHAR_MAX + 1);
var LATIN_INDEX = exports.LATIN_INDEX = TABLE_LENGTH + 1;
var LATIN_INDEX_START = exports.LATIN_INDEX_START = TABLE_DIFF + 20;
var UNICODE_INDEX = exports.UNICODE_INDEX = TABLE_LENGTH + 5;
var DECODE_MAX = exports.DECODE_MAX = TABLE_LENGTH - TABLE_DIFF - 19;
var LATIN_DECODE_MAX = exports.LATIN_DECODE_MAX = UNICODE_CHAR_MAX + 7;
var CHAR_START = exports.CHAR_START = LATIN_DECODE_MAX + 1;
var COMPRESS_START = exports.COMPRESS_START = CHAR_START + 1;
var COMPRESS_FIXED_START = exports.COMPRESS_FIXED_START = COMPRESS_START + 5;
var COMPRESS_INDEX = exports.COMPRESS_INDEX = COMPRESS_FIXED_START + 5;

},{}],21:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var config = _interopRequireWildcard(require("./config"));
var util = _interopRequireWildcard(require("./util"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Decompressor = exports["default"] = function () {
  function Decompressor(options) {
    (0, _classCallCheck2["default"])(this, Decompressor);
    (0, _defineProperty2["default"])(this, "_result", null);
    this._init(options);
  }
  return (0, _createClass2["default"])(Decompressor, [{
    key: "_init",
    value: function _init(options) {
      options = options || {};
      this._result = null;
      this._onDataCallback = options.onData;
      this._onEndCallback = options.onEnd;
    }
  }, {
    key: "_createTable",
    value: function _createTable() {
      var table = {};
      for (var i = 0; i < config.TABLE_LENGTH; i++) {
        table[config.BASE62TABLE.charAt(i)] = i;
      }
      return table;
    }
  }, {
    key: "_onData",
    value: function _onData() {
      var ended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this._onDataCallback || !this._result) {
        return;
      }
      var chunk;
      if (ended) {
        chunk = this._result;
        this._result = [];
      } else {
        var len = config.DECOMPRESS_CHUNK_SIZE - config.WINDOW_MAX;
        chunk = this._result.slice(config.WINDOW_MAX, config.WINDOW_MAX + len);
        this._result = this._result.slice(0, config.WINDOW_MAX).concat(this._result.slice(config.WINDOW_MAX + len));
      }
      if (chunk.length > 0) {
        this._onDataCallback(util.bufferToString_fast(chunk));
      }
    }
  }, {
    key: "_onEnd",
    value: function _onEnd() {
      if (this._onEndCallback) {
        this._onEndCallback();
      }
    }
  }, {
    key: "decompress",
    value: function decompress(data) {
      if (data == null || data.length === 0) {
        return "";
      }
      this._result = util.stringToArray(util.createWindow());
      var result = "";
      var table = this._createTable();
      var out = false;
      var index = null;
      var len = data.length;
      var offset = 0;
      var i, c, c2, c3;
      var code, pos, length, sub, subLen, expandLen;
      for (; offset < len; offset++) {
        c = table[data.charAt(offset)];
        if (c === undefined) {
          continue;
        }
        if (c < config.DECODE_MAX) {
          if (!out) {
            code = index * config.UNICODE_CHAR_MAX + c;
          } else {
            c3 = table[data.charAt(++offset)];
            code = c3 * config.UNICODE_CHAR_MAX + c + config.UNICODE_BUFFER_MAX * index;
          }
          this._result[this._result.length] = code;
        } else if (c < config.LATIN_DECODE_MAX) {
          index = c - config.DECODE_MAX;
          out = false;
        } else if (c === config.CHAR_START) {
          c2 = table[data.charAt(++offset)];
          index = c2 - 5;
          out = true;
        } else if (c < config.COMPRESS_INDEX) {
          c2 = table[data.charAt(++offset)];
          if (c < config.COMPRESS_FIXED_START) {
            pos = (c - config.COMPRESS_START) * config.BUFFER_MAX + c2;
            length = table[data.charAt(++offset)];
          } else {
            pos = (c - config.COMPRESS_FIXED_START) * config.BUFFER_MAX + c2;
            length = 2;
          }
          sub = this._result.slice(-pos);
          if (sub.length > length) {
            sub.length = length;
          }
          subLen = sub.length;
          if (sub.length > 0) {
            expandLen = 0;
            while (expandLen < length) {
              for (i = 0; i < subLen; i++) {
                this._result[this._result.length] = sub[i];
                if (++expandLen >= length) {
                  break;
                }
              }
            }
          }
          index = null;
        }
        if (this._result.length >= config.DECOMPRESS_CHUNK_MAX) {
          this._onData();
        }
      }
      this._result = this._result.slice(config.WINDOW_MAX);
      this._onData(true);
      this._onEnd();
      result = util.bufferToString_fast(this._result);
      this._result = null;
      return result;
    }
  }]);
}();

},{"./config":20,"./util":23,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/defineProperty":5,"@babel/runtime/helpers/interopRequireDefault":6,"@babel/runtime/helpers/typeof":12}],22:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compress = compress;
exports.decompress = decompress;
exports.version = exports["default"] = void 0;
var _compressor = _interopRequireDefault(require("./compressor"));
var _decompressor = _interopRequireDefault(require("./decompressor"));
var version = exports.version = "2.0.0-ts";
function compress(data, options) {
  return new _compressor["default"](options).compress(data);
}
function decompress(data, options) {
  return new _decompressor["default"](options).decompress(data);
}
/**
 * forked from lzbase62
 * @module lzbase62
 * @see https://github.com/polygonplanet/lzbase62
 * @license MIT
 * @version 2.0.0
 */
var _default = exports["default"] = {
  compress: compress,
  decompress: decompress
};

},{"./compressor":19,"./decompressor":21,"@babel/runtime/helpers/interopRequireDefault":6}],23:[function(require,module,exports){
"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferToString_chunked = bufferToString_chunked;
exports.bufferToString_fast = bufferToString_fast;
exports.bufferToString_slow = bufferToString_slow;
exports.createBuffer = createBuffer;
exports.createWindow = createWindow;
exports.stringToArray = stringToArray;
exports.truncateBuffer = truncateBuffer;
var config = _interopRequireWildcard(require("./config"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var fromCharCode = String.fromCharCode;
function createBuffer(bits, size) {
  if (config.HAS_TYPED) {
    switch (bits) {
      case 8:
        return new Uint8Array(size);
      case 16:
        return new Uint16Array(size);
    }
  }
  return new Array(size);
}
function truncateBuffer(buffer, length) {
  if (buffer.length === length) {
    return buffer;
  }
  if (buffer.subarray) {
    return buffer.subarray(0, length);
  }
  buffer.length = length;
  return buffer;
}
function bufferToString_fast(buffer, length) {
  if (length == null) {
    length = buffer.length;
  } else {
    buffer = truncateBuffer(buffer, length);
  }
  if (config.CAN_CHARCODE_APPLY && config.CAN_CHARCODE_APPLY_TYPED) {
    var len = buffer.length;
    if (len < config.APPLY_BUFFER_SIZE && config.APPLY_BUFFER_SIZE_OK) {
      return fromCharCode.apply(null, buffer);
    }
    if (config.APPLY_BUFFER_SIZE_OK === null) {
      try {
        var s = fromCharCode.apply(null, buffer);
        if (len > config.APPLY_BUFFER_SIZE) {
          config.setApplyBufferSizeOk(true);
        }
        return s;
      } catch (e) {
        config.setApplyBufferSizeOk(false);
      }
    }
  }
  return bufferToString_chunked(buffer);
}
function bufferToString_chunked(buffer) {
  var string = "";
  var length = buffer.length;
  var i = 0;
  var sub;
  while (i < length) {
    if (!Array.isArray(buffer) && buffer.subarray) {
      sub = buffer.subarray(i, i + config.APPLY_BUFFER_SIZE);
    } else {
      sub = buffer.slice(i, i + config.APPLY_BUFFER_SIZE);
    }
    i += config.APPLY_BUFFER_SIZE;
    if (config.APPLY_BUFFER_SIZE_OK) {
      string += fromCharCode.apply(null, sub);
      continue;
    }
    if (config.APPLY_BUFFER_SIZE_OK === null) {
      try {
        string += fromCharCode.apply(null, sub);
        if (sub.length > config.APPLY_BUFFER_SIZE) {
          config.setApplyBufferSizeOk(true);
        }
        continue;
      } catch (e) {
        config.setApplyBufferSizeOk(false);
      }
    }
    return bufferToString_slow(buffer);
  }
  return string;
}
function bufferToString_slow(buffer) {
  var string = "";
  var length = buffer.length;
  for (var i = 0; i < length; i++) {
    string += fromCharCode(buffer[i]);
  }
  return string;
}
function stringToArray(string) {
  if (!string) {
    return [];
  }
  var array = [];
  var len = string ? string.length : 0;
  for (var i = 0; i < len; i++) {
    array[i] = string.charCodeAt(i);
  }
  return array;
}
function createWindow() {
  var i = config.WINDOW_MAX >> 7;
  var win = "        ";
  while (!(i & config.WINDOW_MAX)) {
    win += win;
    i <<= 1;
  }
  return win;
}

},{"./config":20,"@babel/runtime/helpers/typeof":12}],24:[function(require,module,exports){
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

},{"./compiler/compiler":14,"./compiler/libs/lexer":15,"./compiler/libs/parser":16,"./vm/vm":28}],25:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Compressor = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _index = _interopRequireDefault(require("../libs/lzbase62/src/index"));
var _smartpack = _interopRequireDefault(require("./compressor/smartpack"));
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var Compressor = exports.Compressor = function () {
  function Compressor() {
    (0, _classCallCheck2["default"])(this, Compressor);
  }
  return (0, _createClass2["default"])(Compressor, null, [{
    key: "encodeNumbers",
    value: function encodeNumbers(arr) {
      var result = "";
      var _iterator = _createForOfIteratorHelper(arr),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var num = _step.value;
          var n = num;
          var bytes = [];
          do {
            var _byte = n & this.BYTE_MASK;
            n >>>= 7;
            if (n > 0) _byte |= this.BYTE_MSB;
            bytes.push(_byte);
          } while (n > 0);
          for (var _i = 0, _bytes = bytes; _i < _bytes.length; _i++) {
            var b = _bytes[_i];
            result += String.fromCharCode(b);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return this.encodeString(result);
    }
  }, {
    key: "encodeSmartPack",
    value: function encodeSmartPack(arr) {
      var bytes = _smartpack["default"].encode(arr);
      var result = "";
      var _iterator2 = _createForOfIteratorHelper(bytes),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var b = _step2.value;
          result += String.fromCharCode(b);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return this.encodeString(result);
    }
  }, {
    key: "encodeJSON",
    value: function encodeJSON(data) {
      return this.encodeString(JSON.stringify(data));
    }
  }, {
    key: "encodeString",
    value: function encodeString(data) {
      return _index["default"].compress(data);
    }
  }, {
    key: "decodeNumbers",
    value: function decodeNumbers(str) {
      if (str.length === 0) return [];
      var decodeStr = this.decodeString(str);
      var result = [];
      var n = 0;
      var shift = 0;
      for (var i = 0; i < decodeStr.length; i++) {
        var _byte2 = decodeStr.charCodeAt(i);
        n |= (_byte2 & this.BYTE_MASK) << shift;
        if ((_byte2 & this.BYTE_MSB) === 0) {
          result.push(n);
          n = 0;
          shift = 0;
        } else {
          shift += 7;
        }
      }
      return result;
    }
  }, {
    key: "decodeSmartPack",
    value: function decodeSmartPack(str) {
      var decodeStr = this.decodeString(str);
      var bytes = [];
      for (var i = 0; i < decodeStr.length; i++) {
        bytes.push(decodeStr.charCodeAt(i));
      }
      return _smartpack["default"].decode(new Uint8Array(bytes));
    }
  }, {
    key: "decodeJSON",
    value: function decodeJSON(str) {
      return JSON.parse(this.decodeString(str));
    }
  }, {
    key: "decodeString",
    value: function decodeString(str) {
      return _index["default"].decompress(str);
    }
  }]);
}();
(0, _defineProperty2["default"])(Compressor, "BYTE_MASK", 0x7f);
(0, _defineProperty2["default"])(Compressor, "BYTE_MSB", 0x80);

},{"../libs/lzbase62/src/index":22,"./compressor/smartpack":27,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/defineProperty":5,"@babel/runtime/helpers/interopRequireDefault":6}],26:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitWriter = exports.BitReader = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var BitWriter = exports.BitWriter = function () {
  function BitWriter() {
    (0, _classCallCheck2["default"])(this, BitWriter);
    (0, _defineProperty2["default"])(this, "buffer", []);
    (0, _defineProperty2["default"])(this, "currentByte", 0);
    (0, _defineProperty2["default"])(this, "bitsFilled", 0);
  }
  return (0, _createClass2["default"])(BitWriter, [{
    key: "writeBits",
    value: function writeBits(value, bitLength) {
      for (var i = bitLength - 1; i >= 0; i--) {
        var bit = value >> i & 1;
        this.currentByte = this.currentByte << 1 | bit;
        this.bitsFilled++;
        if (this.bitsFilled === 8) {
          this.buffer.push(this.currentByte);
          this.currentByte = 0;
          this.bitsFilled = 0;
        }
      }
    }
  }, {
    key: "finish",
    value: function finish() {
      if (this.bitsFilled > 0) {
        this.currentByte <<= 8 - this.bitsFilled;
        this.buffer.push(this.currentByte);
      }
      return Uint8Array.from(this.buffer);
    }
  }]);
}();
var BitReader = exports.BitReader = function () {
  function BitReader(buffer) {
    (0, _classCallCheck2["default"])(this, BitReader);
    (0, _defineProperty2["default"])(this, "byteIndex", 0);
    (0, _defineProperty2["default"])(this, "bitsLeft", 0);
    (0, _defineProperty2["default"])(this, "currentByte", 0);
    this.buffer = buffer;
  }
  return (0, _createClass2["default"])(BitReader, [{
    key: "readBits",
    value: function readBits(bitLength) {
      var result = 0;
      while (bitLength > 0) {
        if (this.bitsLeft === 0) {
          if (this.byteIndex >= this.buffer.length) throw new Error("EOF");
          this.currentByte = this.buffer[this.byteIndex++];
          this.bitsLeft = 8;
        }
        var take = Math.min(bitLength, this.bitsLeft);
        var shift = this.bitsLeft - take;
        result = result << take | this.currentByte >> shift & (1 << take) - 1;
        this.bitsLeft -= take;
        this.currentByte &= (1 << this.bitsLeft) - 1;
        bitLength -= take;
      }
      return result;
    }
  }]);
}();

},{"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/defineProperty":5,"@babel/runtime/helpers/interopRequireDefault":6}],27:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _bitwriter = require("./bitwriter");
var SmartPackRLE = exports["default"] = function () {
  function SmartPackRLE() {
    (0, _classCallCheck2["default"])(this, SmartPackRLE);
  }
  return (0, _createClass2["default"])(SmartPackRLE, null, [{
    key: "_encodeSigned",
    value: function _encodeSigned(val, bits) {
      var offset = 1 << bits - 1;
      return val + offset;
    }
  }, {
    key: "_decodeSigned",
    value: function _decodeSigned(val, bits) {
      var offset = 1 << bits - 1;
      return val - offset;
    }
  }, {
    key: "encode",
    value: function encode(input) {
      if (input.length === 0) return new Uint8Array();
      var deltas = [input[0]];
      for (var _i = 1; _i < input.length; _i++) {
        deltas.push(input[_i] - input[_i - 1]);
      }
      var writer = new _bitwriter.BitWriter();
      var i = 0;
      while (i < deltas.length) {
        var count = 1;
        while (i + count < deltas.length && deltas[i + count] === deltas[i]) count++;
        if (count >= 3) {
          var val = deltas[i];
          var bits = Math.ceil(Math.log2(Math.abs(val) + 1)) + 1;
          writer.writeBits(1, 1);
          writer.writeBits(bits, 5);
          writer.writeBits(count, 8);
          writer.writeBits(this._encodeSigned(val, bits), bits);
          i += count;
        } else {
          var block = [];
          var start = i;
          while (i < deltas.length && block.length < 255 && (i + 2 >= deltas.length || deltas[i] !== deltas[i + 1] || deltas[i] !== deltas[i + 2])) {
            block.push(deltas[i++]);
          }
          var min = Math.min.apply(Math, block);
          var max = Math.max.apply(Math, block);
          var _bits = Math.ceil(Math.log2(Math.max(Math.abs(min), Math.abs(max)) + 1)) + 1;
          writer.writeBits(0, 1);
          writer.writeBits(_bits, 5);
          writer.writeBits(block.length, 8);
          for (var _i2 = 0, _block = block; _i2 < _block.length; _i2++) {
            var v = _block[_i2];
            writer.writeBits(this._encodeSigned(v, _bits), _bits);
          }
        }
      }
      return writer.finish();
    }
  }, {
    key: "decode",
    value: function decode(data) {
      var reader = new _bitwriter.BitReader(data);
      var deltas = [];
      while (true) {
        try {
          var isRLE = reader.readBits(1);
          var bits = reader.readBits(5);
          var count = reader.readBits(8);
          if (isRLE) {
            var val = this._decodeSigned(reader.readBits(bits), bits);
            for (var i = 0; i < count; i++) deltas.push(val);
          } else {
            for (var _i3 = 0; _i3 < count; _i3++) {
              deltas.push(this._decodeSigned(reader.readBits(bits), bits));
            }
          }
        } catch (e) {
          break;
        }
      }
      var result = [];
      for (var _i4 = 0; _i4 < deltas.length; _i4++) {
        result[_i4] = _i4 === 0 ? deltas[0] : result[_i4 - 1] + deltas[_i4];
      }
      return result;
    }
  }]);
}();

},{"./bitwriter":26,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/interopRequireDefault":6}],28:[function(require,module,exports){
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
var _compressor = require("../util/compressor");
var SnowFallVM = exports.SnowFallVM = function () {
  function SnowFallVM(entryFunction, settings) {
    (0, _classCallCheck2["default"])(this, SnowFallVM);
    (0, _defineProperty2["default"])(this, "frames", []);
    (0, _defineProperty2["default"])(this, "stack", []);
    (0, _defineProperty2["default"])(this, "globals", new Map());
    (0, _defineProperty2["default"])(this, "handlerStack", []);
    this.settings = settings;
    console.log(entryFunction);
    var func = this.decompressData(entryFunction);
    this.stack.push(func);
    var frame = {
      func: func,
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
    key: "runtimeError",
    value: function runtimeError(message) {
      var trace = "\n--- Stack Trace ---\n";
      for (var i = this.frames.length - 1; i >= 0; i--) {
        var frame = this.frames[i];
        var funcName = frame.func.name || "(script)";
        var line = frame.func.chunk.lines[frame.ip - 1] || "unknown";
        trace += "  at ".concat(funcName, " (line ").concat(line, ")\n");
      }
      return new Error("".concat(message, "\n").concat(trace));
    }
  }, {
    key: "run",
    value: function run() {
      try {
        while (true) {
          var op = this.readByte();
          switch (op) {
            case _opcodes.OpCode.CHECK_TYPE:
              {
                var expectedType = this.readConstant().toLowerCase();
                var _value = this.stack[this.stack.length - 1];
                var actualType = void 0;
                if (_value === null) actualType = "null";else if (Array.isArray(_value)) actualType = "array";else actualType = (0, _typeof2["default"])(_value);
                if (expectedType !== actualType) {
                  throw this.runtimeError("TypeError: Expected type '".concat(expectedType, "' but got '").concat(actualType, "'."));
                }
                break;
              }
            case _opcodes.OpCode.PUSH_TRUE:
              this.stack.push(true);
              break;
            case _opcodes.OpCode.PUSH_FALSE:
              this.stack.push(false);
              break;
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
            case _opcodes.OpCode.BUILD_ARRAY:
              {
                var itemCount = this.readByte();
                var array = this.stack.splice(this.stack.length - itemCount, itemCount);
                this.stack.push(array);
                break;
              }
            case _opcodes.OpCode.BUILD_OBJECT:
              {
                var pairCount = this.readByte();
                var obj = {};
                for (var i = 0; i < pairCount; i++) {
                  var _value2 = this.stack.pop();
                  var key = this.stack.pop();
                  obj[key] = _value2;
                }
                this.stack.push(obj);
                break;
              }
            case _opcodes.OpCode.GET_PROPERTY:
              {
                var property = this.stack.pop();
                var object = this.stack.pop();
                if (object === null || object === undefined) throw new Error("VM Error: Cannot read property of null or undefined.");
                this.stack.push(object[property]);
                break;
              }
            case _opcodes.OpCode.SET_PROPERTY:
              {
                var _value3 = this.stack.pop();
                var _property = this.stack.pop();
                var _object = this.stack.pop();
                if (_object === null || _object === undefined) throw new Error("VM Error: Cannot set property of null or undefined.");
                _object[_property] = _value3;
                this.stack.push(_value3);
                break;
              }
            case _opcodes.OpCode.EQUAL:
              {
                var b = this.stack.pop();
                var a = this.stack.pop();
                this.stack.push(a === b);
                break;
              }
            case _opcodes.OpCode.NOT_EQUAL:
              {
                var _b = this.stack.pop();
                var _a = this.stack.pop();
                this.stack.push(_a !== _b);
                break;
              }
            case _opcodes.OpCode.GREATER_THAN:
              {
                var _b2 = this.stack.pop();
                var _a2 = this.stack.pop();
                this.stack.push(_a2 > _b2);
                break;
              }
            case _opcodes.OpCode.GREATER_EQUAL:
              {
                var _b3 = this.stack.pop();
                var _a3 = this.stack.pop();
                this.stack.push(_a3 >= _b3);
                break;
              }
            case _opcodes.OpCode.LESS_THAN:
              {
                var _b4 = this.stack.pop();
                var _a4 = this.stack.pop();
                this.stack.push(_a4 < _b4);
                break;
              }
            case _opcodes.OpCode.LESS_EQUAL:
              {
                var _b5 = this.stack.pop();
                var _a5 = this.stack.pop();
                this.stack.push(_a5 <= _b5);
                break;
              }
            case _opcodes.OpCode.BITWISE_AND:
              {
                var _b6 = this.stack.pop();
                var _a6 = this.stack.pop();
                if (typeof _a6 === "number" && typeof _b6 === "number") this.stack.push(_a6 & _b6);else throw new Error("VM Error: Operands must be two numbers for bitwise AND.");
                break;
              }
            case _opcodes.OpCode.BITWISE_OR:
              {
                var _b7 = this.stack.pop();
                var _a7 = this.stack.pop();
                if (typeof _a7 === "number" && typeof _b7 === "number") this.stack.push(_a7 | _b7);else throw new Error("VM Error: Operands must be two numbers for bitwise OR.");
                break;
              }
            case _opcodes.OpCode.ADD:
              {
                var _b8 = this.stack.pop();
                var _a8 = this.stack.pop();
                if (typeof _a8 === "number" && typeof _b8 === "number") this.stack.push(_a8 + _b8);else if (typeof _a8 === "string" || typeof _b8 === "string") this.stack.push(String(_a8) + String(_b8));else throw new Error("VM Error: Operands must be two numbers or at least one string.");
                break;
              }
            case _opcodes.OpCode.SUBTRACT:
              {
                var _b9 = this.stack.pop();
                var _a9 = this.stack.pop();
                if (typeof _a9 === "number" && typeof _b9 === "number") this.stack.push(_a9 - _b9);else throw new Error("VM Error: Operands must be two numbers.");
                break;
              }
            case _opcodes.OpCode.MULTIPLY:
              {
                var _b0 = this.stack.pop();
                var _a0 = this.stack.pop();
                if (typeof _a0 === "number" && typeof _b0 === "number") this.stack.push(_a0 * _b0);else if (typeof _a0 === "string" && typeof _b0 === "number") this.stack.push(_a0.repeat(_b0));else if (typeof _a0 === "number" && typeof _b0 === "string") this.stack.push(_b0.repeat(_a0));else throw new Error("VM Error: Operands must be two numbers. Or one string and one number.");
                break;
              }
            case _opcodes.OpCode.DIVIDE:
              {
                var _b1 = this.stack.pop();
                var _a1 = this.stack.pop();
                if (typeof _a1 === "number" && typeof _b1 === "number") {
                  if (_b1 === 0) throw new Error("VM Error: Division by zero.");
                  this.stack.push(_a1 / _b1);
                } else throw new Error("VM Error: Operands must be two numbers.");
                break;
              }
            case _opcodes.OpCode.MODULO:
              {
                var _b10 = this.stack.pop();
                var _a10 = this.stack.pop();
                if (typeof _a10 === "number" && typeof _b10 === "number") {
                  if (_b10 === 0) throw new Error("VM Error: Division by zero.");
                  this.stack.push(_a10 % _b10);
                } else throw new Error("VM Error: Operands must be two numbers.");
                break;
              }
            case _opcodes.OpCode.NEGATE:
              var value = this.stack.pop();
              if (typeof value === "number") this.stack.push(-value);else this.stack.push(!value);
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
            case _opcodes.OpCode.LOOP:
              {
                var _offset2 = this.readShort();
                this.frame.ip -= _offset2;
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
                  func: this.decompressData(callee),
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
                var frameToPop = this.frames.pop();
                if (this.frames.length === 0) {
                  return result;
                }
                this.stack.splice(frameToPop.stackStart);
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
            case _opcodes.OpCode.SETUP_EXCEPTION:
              {
                var catchOffset = this.readShort();
                this.handlerStack.push({
                  catchAddress: this.frame.ip + catchOffset,
                  finallyAddress: null,
                  stackDepth: this.stack.length
                });
                break;
              }
            case _opcodes.OpCode.TEARDOWN_EXCEPTION:
              {
                this.handlerStack.pop();
                break;
              }
            default:
              throw new Error("VM Error: Unknown opcode ".concat(op));
          }
        }
      } catch (error) {
        if (!error.message.includes("--- Stack Trace ---")) {
          console.error(this.runtimeError(error.message));
        } else {
          console.error(error.message);
        }
      }
    }
  }, {
    key: "decompressData",
    value: function decompressData(cfData) {
      if (cfData.chunk !== undefined) return cfData;
      return {
        name: cfData.name,
        arity: cfData.arity,
        chunk: {
          code: _compressor.Compressor.decodeNumbers(cfData.code),
          constants: _compressor.Compressor.decodeJSON(cfData.constants),
          lines: _compressor.Compressor.decodeSmartPack(cfData.lines)
        }
      };
    }
  }]);
}();

},{"../const/opcodes":17,"../util/compressor":25,"@babel/runtime/helpers/classCallCheck":3,"@babel/runtime/helpers/createClass":4,"@babel/runtime/helpers/defineProperty":5,"@babel/runtime/helpers/interopRequireDefault":6,"@babel/runtime/helpers/toConsumableArray":9,"@babel/runtime/helpers/typeof":12}]},{},[18])
//# sourceMappingURL=SnowFall.js.map
