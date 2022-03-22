(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dompp"] = factory();
	else
		root["dompp"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/assert/build/assert.js":
/*!*********************************************!*\
  !*** ./node_modules/assert/build/assert.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(/*! ./internal/errors */ "./node_modules/assert/build/internal/errors.js"),
    _require$codes = _require.codes,
    ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
    ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;

var AssertionError = __webpack_require__(/*! ./internal/assert/assertion_error */ "./node_modules/assert/build/internal/assert/assertion_error.js");

var _require2 = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require2.inspect;

var _require$types = __webpack_require__(/*! util/ */ "./node_modules/util/util.js").types,
    isPromise = _require$types.isPromise,
    isRegExp = _require$types.isRegExp;

var objectAssign = Object.assign ? Object.assign : __webpack_require__(/*! es6-object-assign */ "./node_modules/es6-object-assign/index.js").assign;
var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;

function lazyLoadComparison() {
  var comparison = __webpack_require__(/*! ./internal/util/comparisons */ "./node_modules/assert/build/internal/util/comparisons.js");

  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
} // Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex


var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"];

var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};

var warned = false; // The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {}; // All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}

function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;

  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }

    if (argsLen === 2) operator = '!=';
  }

  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };

  if (message !== undefined) {
    errArgs.message = message;
  }

  var err = new AssertionError(errArgs);

  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }

  throw err;
}

assert.fail = fail; // The AssertionError is defined in internal/error.

assert.AssertionError = AssertionError;

function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;

    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }

    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
} // Pure assertion tests whether a value is truthy, as determined
// by !!value.


function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  innerOk.apply(void 0, [ok, args.length].concat(args));
}

assert.ok = ok; // The equality assertion tests shallow, coercive equality with ==.

/* eslint-disable no-restricted-properties */

assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
}; // The non-equality assertion tests for whether two objects are not
// equal with !=.


assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
}; // The equivalence assertion tests a deep equality relation.


assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
}; // The non-equivalence assertion tests for any deep inequality.


assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */


assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;

function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};

var Comparison = function Comparison(obj, keys, actual) {
  var _this = this;

  _classCallCheck(this, Comparison);

  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && obj[key].test(actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
};

function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }

    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}

function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return expected.test(actual); // assert.doesNotThrow does not accept objects.

    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    } // Handle primitives properly.


    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }

    var keys = Object.keys(expected); // Special handle errors to make sure the name and the message are compared
    // as well.

    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }

    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && expected[key].test(actual[key])) {
        return;
      }

      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  } // Guard instanceof against arrow functions as they don't have a prototype.


  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }

  try {
    fn();
  } catch (e) {
    return e;
  }

  return NO_EXCEPTION_SENTINEL;
}

function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.
  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.
  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;

    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn(); // Fail in case no promise is returned.

      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }

    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}

function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }

    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }

    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }

  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';

    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }

    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }

  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}

function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;

  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }

  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }

  throw actual;
}

assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};

assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};

assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};

assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};

assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';

    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }

    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    }); // Make sure we actually have a stack trace!

    var origStack = err.stack;

    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift(); // Filter all frames existing in err.stack.

      var tmp1 = newErr.stack.split('\n');

      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);

        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }

      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }

    throw newErr;
  }
}; // Expose a strict only variant of assert


function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  innerOk.apply(void 0, [strict, args.length].concat(args));
}

assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ "./node_modules/assert/build/internal/assert/assertion_error.js":
/*!**********************************************************************!*\
  !*** ./node_modules/assert/build/internal/assert/assertion_error.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require.inspect;

var _require2 = __webpack_require__(/*! ../errors */ "./node_modules/assert/build/internal/errors.js"),
    ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat


function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));

  while (count) {
    str += str;
    count--;
  }

  str += str.substring(0, maxCount - str.length);
  return str;
}

var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
}; // Comparing short primitives should just show === / !== instead of using the
// diff.

var kMaxShortLength = 10;

function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}

function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}

function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = ''; // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.

  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  } // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.


  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length; // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.

    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;

      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        } // Ignore the first characters.


        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  } // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).


  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];

  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }

    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }

  var maxLines = Math.max(actualLines.length, expectedLines.length); // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })

  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n'); // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.


    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);

      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }

    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }

  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }

  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }

  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");

  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;

    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the expected line to the cache.

      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++; // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the actual line to the result.

      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++; // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i]; // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.

      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine); // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //

      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }

      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }

          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        } // Mark the current line as the last diverging one.


        lastPos = i; // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.

        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2; // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = ''; // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.

        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    } // Inspected object to big (Show ~20 rows max)


    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }

  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}

var AssertionError =
/*#__PURE__*/
function (_Error) {
  _inherits(AssertionError, _Error);

  function AssertionError(options) {
    var _this;

    _classCallCheck(this, AssertionError);

    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }

    var message = options.message,
        operator = options.operator,
        stackStartFn = options.stackStartFn;
    var actual = options.actual,
        expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;

    if (message != null) {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, String(message)));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      } // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.


      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }

      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, createErrDiff(actual, expected, operator)));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n'); // In case "actual" is an object, it should not be reference equal.

        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        } // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.


        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);

          while (res.length > 27) {
            res.pop();
          }
        } // Only print a single input.


        if (res.length === 1) {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, " ").concat(res[0])));
        } else {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n")));
        }
      } else {
        var _res = inspectValue(actual);

        var other = '';
        var knownOperators = kReadableOperator[operator];

        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);

          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));

          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }

          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }

          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }

        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(_res).concat(other)));
      }
    }

    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;

    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    } // Create error message including the error code in the name.


    _this.stack; // Reset the name.

    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }

  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: inspect.custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread({}, ctx, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);

  return AssertionError;
}(_wrapNativeSuper(Error));

module.exports = AssertionError;

/***/ }),

/***/ "./node_modules/assert/build/internal/errors.js":
/*!******************************************************!*\
  !*** ./node_modules/assert/build/internal/errors.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */

/* eslint node-core/alphabetize-errors: "error" */

/* eslint node-core/prefer-util-format-errors: "error" */
 // The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var codes = {}; // Lazy loaded

var assert;
var util;

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inherits(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      var _this;

      _classCallCheck(this, NodeError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError).call(this, getMessage(arg1, arg2, arg3)));
      _this.code = code;
      return _this;
    }

    return NodeError;
  }(Base);

  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(typeof name === 'string', "'name' must be a string"); // determiner: 'must be' or 'must not be'

  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } // TODO(BridgeAR): Improve the output by showing `null` and similar.


  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(/*! util/ */ "./node_modules/util/util.js");
  var inspected = util.inspect(value);

  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }

  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;

  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }

  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });

  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;

    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;

    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }

  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ "./node_modules/assert/build/internal/util/comparisons.js":
/*!****************************************************************!*\
  !*** ./node_modules/assert/build/internal/util/comparisons.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var regexFlagsSupported = /a/g.flags !== undefined;

var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};

var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};

var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(/*! is-nan */ "./node_modules/is-nan/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);

var _require$types = __webpack_require__(/*! util/ */ "./node_modules/util/util.js").types,
    isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
    isArrayBufferView = _require$types.isArrayBufferView,
    isDate = _require$types.isDate,
    isMap = _require$types.isMap,
    isRegExp = _require$types.isRegExp,
    isSet = _require$types.isSet,
    isNativeError = _require$types.isNativeError,
    isBoxedPrimitive = _require$types.isBoxedPrimitive,
    isNumberObject = _require$types.isNumberObject,
    isStringObject = _require$types.isStringObject,
    isBooleanObject = _require$types.isBooleanObject,
    isBigIntObject = _require$types.isBigIntObject,
    isSymbolObject = _require$types.isSymbolObject,
    isFloat32Array = _require$types.isFloat32Array,
    isFloat64Array = _require$types.isFloat64Array;

function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;

  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  } // The maximum size for an array is 2 ** 32 -1.


  return key.length === 10 && key >= Math.pow(2, 32);
}

function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
} // Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */


function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }

  if (y < x) {
    return 1;
  }

  return 0;
}

var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3; // Check if they have the same source and flags

function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}

function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }

  return true;
}

function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}

function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}

function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }

  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }

  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }

  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }

  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
} // Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.


function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  } // Check more closely if val1 and val2 are equal.


  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }

    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }

    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }

      return false;
    }

    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }

  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);

  if (val1Tag !== val2Tag) {
    return false;
  }

  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }

    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  } // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.


  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }

  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    } // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.


    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);

    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (_keys.length !== _keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }

  return keyCheck(val1, val2, strict, memos, kNoIterator);
}

function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}

function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2); // The pair must have the same number of owned properties.

    if (aKeys.length !== bKeys.length) {
      return false;
    }
  } // Cheap key test


  var i = 0;

  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }

  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);

    if (symbolKeysA.length !== 0) {
      var count = 0;

      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];

        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }

          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }

      var symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }

  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  } // Use memos to handle cycles.


  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);

    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);

      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }

    memos.position++;
  }

  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}

function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];

    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }

  return false;
} // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').


function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;

    case 'object':
      // Only pass in null as object!
      return undefined;

    case 'symbol':
      return false;

    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through

    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }

  }

  return true;
}

function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}

function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);

  if (altValue != null) {
    return altValue;
  }

  var curB = b.get(altValue);

  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }

  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}

function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);

  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i]; // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.

    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      } // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.


      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false; // Fast path to detect missing string, symbol, undefined and null values.

      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }

      if (set === null) {
        set = new Set();
      }

      set.add(val);
    }
  }

  if (set !== null) {
    var bValues = arrayFromSet(b);

    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i]; // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.

      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];

    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }

  return false;
}

function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);

  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
        key = _aEntries$i[0],
        item1 = _aEntries$i[1];

    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }

      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);

      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false; // Fast path to detect missing string, symbol, undefined and null
        // keys.

        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;

        if (set === null) {
          set = new Set();
        }

        set.add(key);
      }
    }
  }

  if (set !== null) {
    var bEntries = arrayFromMap(b);

    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
          key = _bEntries$_i[0],
          item = _bEntries$_i[1];

      if (_typeof(key) === 'object' && key !== null) {
        if (!mapHasEqualEntry(set, a, key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;

  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);

        for (; i < keysA.length; i++) {
          var key = keysA[i];

          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }

        if (keysA.length !== Object.keys(b).length) {
          return false;
        }

        return true;
      }
    }
  } // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:


  for (i = 0; i < keys.length; i++) {
    var _key = keys[i];

    if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
      return false;
    }
  }

  return true;
}

function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}

function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}

module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/data-tree/index.js":
/*!*****************************************!*\
  !*** ./node_modules/data-tree/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Tree = __webpack_require__(/*! ./src/tree */ "./node_modules/data-tree/src/tree.js");
module.exports = dataTree = (function(){
  return {
    create: function(){
      return new Tree();
    }
  };
}());


/***/ }),

/***/ "./node_modules/data-tree/src/traverser.js":
/*!*************************************************!*\
  !*** ./node_modules/data-tree/src/traverser.js ***!
  \*************************************************/
/***/ ((module) => {


module.exports = (function(){

  // Flag bad practises
  'use strict';

  // ------------------------------------
  // Basic Setup
  // ------------------------------------

  /**
   * @class Traverser
   * @constructor
   * @classdesc Represents a traverser which searches/traverses the tree in BFS and DFS fashion.
   * @param tree - {@link Tree} that has to be traversed or search.
   */
  function Traverser(tree){

    if(!tree)
    throw new Error('Could not find a tree that is to be traversed');

    /**
     * Represents the {@link Tree} which has to be traversed.
     *
     * @property _tree
     * @type {object}
     * @default "null"
     */
    this._tree = tree;

  }

  // ------------------------------------
  // Methods
  // ------------------------------------

  /**
   * Searches a tree in DFS fashion. Requires a search criteria to be provided.
   *
   * @method searchDFS
   * @memberof Traverser
   * @instance
   * @param {function} criteria - MUST BE a callback function that specifies the search criteria.
   * Criteria callback here receives {@link TreeNode#_data} in parameter and MUST return boolean
   * indicating whether that data satisfies your criteria.
   * @return {object} - first {@link TreeNode} in tree that matches the given criteria.
   * @example
   * // Search DFS
   * var node = tree.traverser().searchDFS(function(data){
   *  return data.key === '#greenapple';
   * });
   */
  Traverser.prototype.searchDFS = function(criteria){

    // Hold the node when found
    var foundNode = null;

    // Find node recursively
    (function recur(node){
      if(node.matchCriteria(criteria)){
        foundNode = node;
        return foundNode;
      } else {
        node._childNodes.some(recur);
      }
    }(this._tree._rootNode));

    return foundNode;
  };

  /**
   * Searches a tree in BFS fashion. Requires a search criteria to be provided.
   *
   * @method searchBFS
   * @memberof Traverser
   * @instance
   * @param {function} criteria - MUST BE a callback function that specifies the search criteria.
   * Criteria callback here receives {@link TreeNode#_data} in parameter and MUST return boolean
   * indicating whether that data satisfies your criteria.
   * @return {object} - first {@link TreeNode} in tree that matches the given criteria.
   * @example
   * // Search BFS
   * var node = tree.traverser().searchBFS(function(data){
   *  return data.key === '#greenapple';
   * });
   */
  Traverser.prototype.searchBFS = function(criteria){

    // Hold the node when found
    var foundNode = null;

    // Find nodes recursively
    (function expand(queue){
      while(queue.length){
        var current = queue.splice(0, 1)[0];
        if(current.matchCriteria(criteria)){
          foundNode = current;
          return;
        }
        current._childNodes.forEach(function(_child){
          queue.push(_child);
        });
      }
    }([this._tree._rootNode]));


    return foundNode;

  };

  /**
   * Traverses an entire tree in DFS fashion.
   *
   * @method traverseDFS
   * @memberof Traverser
   * @instance
   * @param {function} callback - Gets triggered when @{link TreeNode} is explored. Explored node is passed as parameter to callback.
   * @example
   * // Traverse DFS
   * tree.traverser().traverseDFS(function(node){
   *  console.log(node.data);
   * });
   */
  Traverser.prototype.traverseDFS = function(callback){
    (function recur(node){
      callback(node);
      node._childNodes.forEach(recur);
    }(this._tree._rootNode));
  };

  /**
   * Traverses an entire tree in BFS fashion.
   *
   * @method traverseBFS
   * @memberof Traverser
   * @instance
   * @param {function} callback - Gets triggered when node is explored. Explored node is passed as parameter to callback.
   * @example
   * // Traverse BFS
   * tree.traverser().traverseBFS(function(node){
   *  console.log(node.data);
   * });
   */
  Traverser.prototype.traverseBFS = function(callback){
    (function expand(queue){
      while(queue.length){
        var current = queue.splice(0, 1)[0];
        callback(current);
        current._childNodes.forEach(function(_child){
          queue.push(_child);
        });
      }
    }([this._tree._rootNode]));
  };

  // ------------------------------------
  // Export
  // ------------------------------------

  return Traverser;

}());


/***/ }),

/***/ "./node_modules/data-tree/src/tree-node.js":
/*!*************************************************!*\
  !*** ./node_modules/data-tree/src/tree-node.js ***!
  \*************************************************/
/***/ ((module) => {


module.exports = (function(){

  // Flag bad practises
  'use strict';

  // ------------------------------------
  // Basic Setup
  // ------------------------------------

  /**
   * @class TreeNode
   * @classdesc Represents a node in the tree.
   * @constructor
   * @param {object} data - that is to be stored in a node
   */
  function TreeNode(data){

    /**
     * Represents the parent node
     *
     * @property _parentNode
     * @type {object}
     * @default "null"
     */
    this._parentNode = null;

    /**
     * Represents the child nodes
     *
     * @property _childNodes
     * @type {array}
     * @default "[]"
     */
    this._childNodes = [];

    /**
     * Represents the data node has
     *
     * @property _data
     * @type {object}
     * @default "null"
     */
    this._data = data;

    /**
     * Depth of the node represents level in hierarchy
     *
     * @property _depth
     * @type {number}
     * @default -1
     */
    this._depth = -1;

  }

  // ------------------------------------
  // Getters and Setters
  // ------------------------------------

  /**
   * Returns a parent node of current node
   *
   * @method parentNode
   * @memberof TreeNode
   * @instance
   * @return {TreeNode} - parent of current node
   */
  TreeNode.prototype.parentNode = function(){
    return this._parentNode;
  };

  /**
   * Returns an array of child nodes
   *
   * @method childNodes
   * @memberof TreeNode
   * @instance
   * @return {array} - array of child nodes
   */
  TreeNode.prototype.childNodes = function(){
    return this._childNodes;
  };

  /**
   * Sets or gets the data belonging to this node. Data is what user sets using `insert` and `insertTo` methods.
   *
   * @method data
   * @memberof TreeNode
   * @instance
   * @param {object | array | string | number | null} data - data which is to be stored
   * @return {object | array | string | number | null} - data belonging to this node
   */
  TreeNode.prototype.data = function(data){
    if(arguments.length > 0){
      this._data = data;
    } else {
      return this._data;
    }
  };

  /**
   * Depth of the node. Indicates the level at which node lies in a tree.
   *
   * @method depth
   * @memberof TreeNode
   * @instance
   * @return {number} - depth of node
   */
  TreeNode.prototype.depth = function(){
    return this._depth;
  };

  // ------------------------------------
  // Methods
  // ------------------------------------

  /**
   * Indicates whether this node matches the specified criteria. It triggers a callback criteria function that returns something.
   *
   * @method matchCriteria
   * @memberof TreeNode
   * @instance
   * @param {function} callback - Callback function that specifies some criteria. It receives {@link TreeNode#_data} in parameter and expects different values in different scenarios.
   * `matchCriteria` is used by following functions and expects:
   * 1. {@link Tree#searchBFS} - {boolean} in return indicating whether given node satisfies criteria.
   * 2. {@link Tree#searchDFS} - {boolean} in return indicating whether given node satisfies criteria.
   * 3. {@link Tree#export} - {object} in return indicating formatted data object.
   */
  TreeNode.prototype.matchCriteria = function(criteria){
    return criteria(this._data);
  };

  /**
   * get sibling nodes.
   *
   * @method siblings
   * @memberof TreeNode
   * @instance
   * @return {array} - array of instances of {@link TreeNode}
   */
  TreeNode.prototype.siblings = function(){
    var thiss = this;
    return !this._parentNode ? [] : this._parentNode._childNodes.filter(function(_child){
      return _child !== thiss;
    });
  };

  /**
   * Finds distance of node from root node
   *
   * @method distanceToRoot
   * @memberof TreeNode
   * @instance
   * @return {array} - array of instances of {@link TreeNode}
   */
  TreeNode.prototype.distanceToRoot = function(){

    // Initialize Distance and Node
    var distance = 0,
        node = this;

    // Loop Over Ancestors
    while(node.parentNode()){
      distance++;
      node = node.parentNode();
    }

    // Return
    return distance;

  };

  /**
   * Gets an array of all ancestor nodes including current node
   *
   * @method getAncestry
   * @memberof TreeNode
   * @instance
   * @return {Array} - array of ancestor nodes
   */
  TreeNode.prototype.getAncestry = function(){

    // Initialize empty array and node
    var ancestors = [this],
        node = this;

    // Loop over ancestors and add them in array
    while(node.parentNode()){
      ancestors.push(node.parentNode());
      node = node.parentNode();
    }

    // Return
    return ancestors;

  };

  /**
   * Exports the node data in format specified. It maintains herirachy by adding
   * additional "children" property to returned value of `criteria` callback.
   *
   * @method export
   * @memberof TreeNode
   * @instance
   * @param {TreeNode~criteria} criteria - Callback function that receives data in parameter
   * and MUST return a formatted data that has to be exported. A new property "children" is added to object returned
   * that maintains the heirarchy of nodes.
   * @return {object} - {@link TreeNode}.
   * @example
   *
   * var rootNode = tree.insert({
   *   key: '#apple',
   *   value: { name: 'Apple', color: 'Red'}
   * });
   *
   * tree.insert({
   *   key: '#greenapple',
   *   value: { name: 'Green Apple', color: 'Green'}
   * });
   *
   * tree.insertToNode(rootNode,  {
   *  key: '#someanotherapple',
   *  value: { name: 'Some Apple', color: 'Some Color' }
   * });
   *
   * // Export the tree
   * var exported = rootNode.export(function(data){
   *  return { name: data.value.name };
   * });
   *
   * // Result in `exported`
   * {
   * "name": "Apple",
   * "children": [
   *   {
   *     "name": "Green Apple",
   *     "children": []
   *   },
   *   {
   *     "name": "Some Apple",
   *     "children": []
   *  }
   * ]
   *}
   *
   */
  TreeNode.prototype.export = function(criteria){

    // Check if criteria is specified
    if(!criteria || typeof criteria !== 'function')
      throw new Error('Export criteria not specified');

    // Export every node recursively
    var exportRecur = function(node){
      var exported = node.matchCriteria(criteria);
      if(!exported || typeof exported !== 'object'){
        throw new Error('Export criteria should always return an object and it cannot be null.');
      } else {
        exported.children = [];
        node._childNodes.forEach(function(_child){
          exported.children.push(exportRecur(_child));
        });

        return exported;
      }
    };

    return exportRecur(this);
  };

  // ------------------------------------
  // Export
  // ------------------------------------

  return TreeNode;

}());


/***/ }),

/***/ "./node_modules/data-tree/src/tree.js":
/*!********************************************!*\
  !*** ./node_modules/data-tree/src/tree.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TreeNode = __webpack_require__(/*! ./tree-node */ "./node_modules/data-tree/src/tree-node.js");
var Traverser = __webpack_require__(/*! ./traverser */ "./node_modules/data-tree/src/traverser.js");
module.exports = (function(){

  // Flag bad practises
  'use strict';

  // ------------------------------------
  // Basic Setup
  // ------------------------------------

  /**
   * @class Tree
   * @classdesc Represents the tree in which data nodes can be inserted
   * @constructor
   */
   function Tree(){

    /**
     * Represents the root node of the tree.
     *
     * @member
     * @type {object}
     * @default "null"
     */
    this._rootNode = null;

    /**
     * Represents the current node in question. `_currentNode` points to most recent
     * node inserted or parent node of most recent node removed.
     *
     * @member
    * @memberof Tree.
     * @type {object}
     * @default "null"
     */
    this._currentNode = null;

    /**
     * Represents the traverser which search/traverse a tree in DFS and BFS fashion.
     *
     * @member
     * @memberof Tree
     * @type {object}
     * @instance
     * @default {@link Traverser}
     */
    this._traverser = new Traverser(this);

  }

  // ------------------------------------
  // Getters and Setters
  // ------------------------------------

  /**
   * Returns a root node of the tree.
   *
   * @method rootNode
   * @memberof Tree
   * @instance
   * @return {TreeNode} - root node of the tree.
   */
  Tree.prototype.rootNode = function(){
    return this._rootNode;
  };

  /**
   * Returns a current node in a tree
   *
   * @method currentNode
   * @memberof Tree
   * @instance
   * @return {TreeNode} - current node of the tree.
   */
  Tree.prototype.currentNode = function(){
    return this._currentNode;
  };

  /**
   * Getter function that returns {@link Traverser}.
   *
   * @method traverser
   * @memberof Tree
   * @instance
   * @return {@link Traverser} for the tree.
   */
  Tree.prototype.traverser = function(){
    return this._traverser;
  };

  // ------------------------------------
  // Methods
  // ------------------------------------

  /**
   * Checks whether tree is empty.
   *
   * @method isEmpty
   * @memberof Tree
   * @instance
   * @return {boolean} whether tree is empty.
   */
  Tree.prototype.isEmpty = function(){
    return this._rootNode === null && this._currentNode === null;
  };

  /**
   * Empties the tree. Removes all nodes from tree.
   *
   * @method pruneAllNodes
   * @memberof Tree
   * @instance
   * @return {@link Tree} empty tree.
   */
  Tree.prototype.pruneAllNodes = function(){
    if(this._rootNode && this._currentNode) this.trimBranchFrom(this._rootNode);
    return this;
  };

  /**
   * Creates a {@link TreeNode} that contains the data provided and insert it in a tree.
   * New node gets inserted to the `_currentNode` which updates itself upon every insertion and deletion.
   *
   * @method insert
   * @memberof Tree
   * @instance
   * @param {object} data - data that has to be stored in tree-node.
   * @return {object} - instance of {@link TreeNode} that represents node inserted.
   * @example
   *
   * // Insert single value
   * tree.insert(183);
   *
   * // Insert array of values
   * tree.insert([34, 565, 78]);
   *
  * // Insert complex data
   * tree.insert({
   *   key: '#berries',
   *   value: { name: 'Apple', color: 'Red'}
   * });
   */
  Tree.prototype.insert = function(data){
    var node = new TreeNode(data);
    if(this._rootNode === null && this._currentNode === null){
      node._depth = 1;
      this._rootNode = this._currentNode = node;
    } else {
      node._parentNode = this._currentNode;
      this._currentNode._childNodes.push(node);
      this._currentNode = node;
      node.depth = node._parentNode._depth + 1;
    }
    return node;
  };

  /**
   * Removes a node from tree and updates `_currentNode` to parent node of node removed.
   *
   * @method remove
   * @memberof Tree
   * @instance
   * @param {object} node - {@link TreeNode} that has to be removed.
   * @param {boolean} trim - indicates whether to remove entire branch from the specified node.
   */
  Tree.prototype.remove = function(node, trim){
    if(trim || node === this._rootNode){

      // Trim Entire branch
      this.trimBranchFrom(node);

    } else {

      // Upate children's parent to grandparent
      node._childNodes.forEach(function(_child){
        _child._parentNode = node._parentNode;
        node._parentNode._childNodes.push(_child);
      });

      // Delete itslef from parent child array
      node._parentNode._childNodes.splice(node._parentNode._childNodes.indexOf(node), 1);

      // Update Current Node
      this._currentNode = node._parentNode;

      // Clear Child Array
      node._childNodes = [];
      node._parentNode = null;
      node._data = null;

    }
  };

  /**
   * Remove an entire branch starting with specified node.
   *
   * @method trimBranchFrom
   * @memberof Tree
   * @instance
   * @param {object} node - {@link TreeNode} from which entire branch has to be removed.
   */
  Tree.prototype.trimBranchFrom = function(node){

    // Hold `this`
    var thiss = this;

    // trim brach recursively
    (function recur(node){
      node._childNodes.forEach(recur);
      node._childNodes = [];
      node._data = null;
    }(node));

    // Update Current Node
    if(node._parentNode){
      node._parentNode._childNodes.splice(node._parentNode._childNodes.indexOf(node), 1);
      thiss._currentNode = node._parentNode;
    } else {
      thiss._rootNode = thiss._currentNode = null;
    }
  };

  /**
   * Inserts node to a particular node present in the tree. Particular node here is searched
   * in the tree based on the criteria provided.
   *
   * @method insertTo
   * @memberof Tree
   * @instance
   * @param {function} criteria - Callback function that specifies the search criteria
   * for node to which new node is to be inserted. Criteria callback here receives {@link TreeNode#_data}
   * in parameter and MUST return boolean indicating whether that data satisfies your criteria.
   * @param {object} data - that has to be stored in tree-node.
   * @return {object} - instance of {@link TreeNode} that represents node inserted.
   * @example
   *
   * // Insert data
   * tree.insert({
   *   key: '#apple',
   *   value: { name: 'Apple', color: 'Red'}
   * });
   *
   * // New Data
   * var greenApple = {
   *  key: '#greenapple',
   *  value: { name: 'Green Apple', color: 'Green' }
   * };
   *
   * // Insert data to node which has `key` = #apple
   * tree.insertTo(function(data){
   *  return data.key === '#apple'
   * }, greenApple);
   */
  Tree.prototype.insertTo = function(criteria, data){
    var node = this.traverser().searchDFS(criteria);
    return this.insertToNode(node, data);
  };

  /**
   * Inserts node to a particular node present in the tree. Particular node here is an instance of {@link TreeNode}
   *
   * @method insertToNode
   * @memberof Tree
   * @instance
   * @param {function} node -  {@link TreeNode} to which data node is to be inserted.
   * @param {object} data - that has to be stored in tree-node.
   * @return {object} - instance of {@link TreeNode} that represents node inserted.
   * @example
   *
   * // Insert data
   * var node = tree.insert({
   *   key: '#apple',
   *   value: { name: 'Apple', color: 'Red'}
   * });
   *
   * // New Data
   * var greenApple = {
   *  key: '#greenapple',
   *  value: { name: 'Green Apple', color: 'Green' }
   * };
   *
   * // Insert data to node
   * tree.insertToNode(node, greenApple);
   */
  Tree.prototype.insertToNode = function(node, data){
    var newNode = new TreeNode(data);
    newNode._parentNode = node;
    newNode._depth = newNode._parentNode._depth + 1;
    node._childNodes.push(newNode);
    this._currentNode = newNode;
    return newNode;
  };

  /**
   * Finds a distance between two nodes
   *
   * @method distanceBetween
   * @memberof Tree
   * @instance
   * @param {@link TreeNode} fromNode -  Node from which distance is to be calculated
   * @param {@link TreeNode} toNode - Node to which distance is to be calculated
   * @return {Number} - distance(number of hops) between two nodes.
   */
  Tree.prototype.distanceBetween = function(fromNode, toNode){
    return fromNode.distanceToRoot() + toNode.distanceToRoot() - 2 *  this.findCommonParent(fromNode, toNode).distanceToRoot();
  };

  /**
   * Finds a common parent between nodes
   *
   * @method findCommonParent
   * @memberof Tree
   * @instance
   * @param {@link TreeNode} fromNode
   * @param {@link TreeNode} toNode
   * @return {@link TreeNode} - common parent
   */
  Tree.prototype.findCommonParent = function(fromNode, toNode){

    // Get ancestory of both nodes
    var fromNodeAncestors = fromNode.getAncestry();
    var toNodeAncestors = toNode.getAncestry();

    // Find Commont
    var common = null;
    fromNodeAncestors.some(function(ancestor){
      if(toNodeAncestors.indexOf(ancestor) !== -1){
        common = ancestor;
        return true;
      }
    });

    // Return Common
    return common;

  };

  /**
   * Exports the tree data in format specified. It maintains herirachy by adding
   * additional "children" property to returned value of `criteria` callback.
   *
   * @method export
   * @memberof Tree
   * @instance
   * @param {Tree~criteria} criteria - Callback function that receives data in parameter
   * and MUST return a formatted data that has to be exported. A new property "children" is added to object returned
   * that maintains the heirarchy of nodes.
   * @return {object} - {@link TreeNode}.
   * @example
   *
   * var rootNode = tree.insert({
   *   key: '#apple',
   *   value: { name: 'Apple', color: 'Red'}
   * });
   *
   * tree.insert({
   *   key: '#greenapple',
   *   value: { name: 'Green Apple', color: 'Green'}
   * });
   *
   * tree.insertToNode(rootNode,  {
   *  key: '#someanotherapple',
   *  value: { name: 'Some Apple', color: 'Some Color' }
   * });
   *
   * // Export the tree
   * var exported = tree.export(function(data){
   *  return { name: data.value.name };
   * });
   *
   * // Result in `exported`
   * {
   * "name": "Apple",
   * "children": [
   *   {
   *     "name": "Green Apple",
   *     "children": []
   *   },
   *   {
   *     "name": "Some Apple",
   *     "children": []
   *  }
   * ]
   *}
   *
   */
  Tree.prototype.export = function(criteria){

    // Check if rootNode is not null
    if(!this._rootNode){
      return null;
    }

    return this._rootNode.export(criteria);
  };

  /**
   * Returns a new compressed tree. While compressing it considers nodes that
   * satisfies given criteria and skips the rest of the nodes, making tree compressed.
   *
   * @method compress
   * @memberof Tree
   * @instance
   * @param {Tree~criteria} criteria - Callback function that checks whether node satifies certain criteria. MUST return boolean.
   * @return {@link Tree} - A new compressed tree.
   */
  Tree.prototype.compress = function(criteria){

    // Check if criteria is specified
    if(!criteria || typeof criteria !== 'function')
      throw new Error('Compress criteria not specified');

    // Check if tree is not empty
    if(this.isEmpty()){
      return null;
    }

    // Create New Tree
    var tree = new Tree();

    // Hold `this`
    var thiss = this;

    // Recur DFS
    (function recur(node, parent){

      // Check-in
      var checkIn = thiss.rootNode() === node || node.matchCriteria(criteria);

      // Check if checked-in
      if(checkIn){
        if(tree.isEmpty()){
          parent = tree.insert(node.data());
        } else {
          parent = tree.insertToNode(parent, node.data());
        }
      } else {
        parent._data.hasCompressedNodes = true;
      }

      // For all child nodes
      node.childNodes().forEach(function(_child){
        recur(_child, parent);
      });

    }(this.rootNode(), null));

    return tree;

  };

  /**
   * Imports the JSON data into a tree using the criteria provided.
   * A property indicating the nesting of object must be specified.
   *
   * @method import
   * @memberof Tree
   * @instance
   * @param {object} data - JSON data that has be imported
   * @param {string} childProperty - Name of the property that holds the nested data.
   * @param {Tree~criteria} criteria - Callback function that receives data in parameter
   * and MUST return a formatted data that has to be imported in a tree.
   * @return {object} - {@link Tree}.
   * @example
   *
   * var data = {
   *   "trailId": "h2e67d4ea-f85f40e2ae4a06f4777864de",
   *   "initiatedAt": 1448393492488,
   *   "snapshots": {
   *      "snapshotId": "b3d132131-213c20f156339ea7bdcb6273",
   *      "capturedAt": 1448393495353,
   *      "thumbnail": "data:img",
   *      "children": [
   *       {
   *        "snapshotId": "yeb7ab27c-b36ff1b04aefafa9661243de",
   *        "capturedAt": 1448393499685,
   *        "thumbnail": "data:image/",
   *        "children": [
   *          {
   *            "snapshotId": "a00c9828f-e2be0fc4732f56471e77947a",
   *            "capturedAt": 1448393503061,
   *            "thumbnail": "data:image/png;base64",
   *            "children": []
   *          }
   *        ]
   *      }
   *     ]
   *   }
   * };
   *
   *  // Import
   *  // This will result in a tree having nodes containing `id` and `thumbnail` as data
   *  tree.import(data, 'children', function(nodeData){
   *    return {
   *      id: nodeData.snapshotId,
   *      thumbnail: nodeData.thumbnail
   *     }
   *  });
   *
   */
  Tree.prototype.import = function(data, childProperty, criteria){

    // Empty all tree
    if(this._rootNode) this.trimBranchFrom(this._rootNode);

    // Set Current Node to root node as null
    this._currentNode = this._rootNode = null;

    // Hold `this`
    var thiss = this;

    // Import recursively
    (function importRecur(node, recurData){

      // Format data from given criteria
      var _data = criteria(recurData);

      // Create Root Node
      if(!node){
        node = thiss.insert(_data);
      } else {
        node = thiss.insertToNode(node, _data);
      }

      // For Every Child
      recurData[childProperty].forEach(function(_child){
        importRecur(node, _child);
      });

    }(this._rootNode, data));

    // Set Current Node to root node
    this._currentNode = this._rootNode;

    return this;

  };

  /**
   * Callback that receives a node data in parameter and expects user to return one of following:
   * 1. {@link Traverser#searchBFS} - {boolean} in return indicating whether given node satisfies criteria.
   * 2. {@link Traverser#searchDFS} - {boolean} in return indicating whether given node satisfies criteria.
   * 3. {@link Tree#export} - {object} in return indicating formatted data object.
   * @callback criteria
   * @param data {object} - data of particular {@link TreeNode}
   */

   // ------------------------------------
   // Export
   // ------------------------------------

  return Tree;

}());


/***/ }),

/***/ "./node_modules/define-properties/index.js":
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "./node_modules/es6-object-assign/index.js":
/*!*************************************************!*\
  !*** ./node_modules/es6-object-assign/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),

/***/ "./node_modules/foreach/index.js":
/*!***************************************!*\
  !*** ./node_modules/foreach/index.js ***!
  \***************************************/
/***/ ((module) => {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "./node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has-tostringtag/shams.js":
/*!***********************************************!*\
  !*** ./node_modules/has-tostringtag/shams.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ "./node_modules/has/src/index.js":
/*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/is-arguments/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "./node_modules/is-generator-function/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ "./node_modules/is-nan/implementation.js":
/*!***********************************************!*\
  !*** ./node_modules/is-nan/implementation.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ "./node_modules/is-nan/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-nan/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/is-nan/shim.js");

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/is-nan/polyfill.js":
/*!*****************************************!*\
  !*** ./node_modules/is-nan/polyfill.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ "./node_modules/is-nan/shim.js":
/*!*************************************!*\
  !*** ./node_modules/is-nan/shim.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/is-typed-array/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = __webpack_require__(/*! es-abstract/helpers/getOwnPropertyDescriptor */ "./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js");
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/object-is/implementation.js":
/*!**************************************************!*\
  !*** ./node_modules/object-is/implementation.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ "./node_modules/object-is/index.js":
/*!*****************************************!*\
  !*** ./node_modules/object-is/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/object-is/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/object-is/polyfill.js":
/*!********************************************!*\
  !*** ./node_modules/object-is/polyfill.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ "./node_modules/object-is/shim.js":
/*!****************************************!*\
  !*** ./node_modules/object-is/shim.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/support/types.js":
/*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "./node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "./node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "./node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "./node_modules/which-typed-array/index.js":
/*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = __webpack_require__(/*! es-abstract/helpers/getOwnPropertyDescriptor */ "./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js");
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof g[typedArray] === 'function') {
			var arr = new g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/available-typed-arrays/index.js":
/*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ }),

/***/ "./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./index.mjs":
/*!*******************!*\
  !*** ./index.mjs ***!
  \*******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getVerdict": () => (/* binding */ getVerdict),
/* harmony export */   "evaluateDom": () => (/* binding */ evaluateDom),
/* harmony export */   "getTreeFromWitness": () => (/* binding */ getTreeFromWitness),
/* harmony export */   "serializeArray": () => (/* binding */ serializeArray),
/* harmony export */   "deserializeArray": () => (/* binding */ deserializeArray),
/* harmony export */   "assertDomppCondition": () => (/* binding */ assertDomppCondition),
/* harmony export */   "AbstractFunction": () => (/* reexport safe */ _modules_function_mjs__WEBPACK_IMPORTED_MODULE_2__.AbstractFunction),
/* harmony export */   "Addition": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.Addition),
/* harmony export */   "All": () => (/* reexport safe */ _modules_designator_mjs__WEBPACK_IMPORTED_MODULE_1__.All),
/* harmony export */   "And": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.And),
/* harmony export */   "AndNode": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.AndNode),
/* harmony export */   "Argument": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.Argument),
/* harmony export */   "ArgumentValue": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.ArgumentValue),
/* harmony export */   "AtomicFunction": () => (/* reexport safe */ _modules_atomic_function_mjs__WEBPACK_IMPORTED_MODULE_4__.AtomicFunction),
/* harmony export */   "AtomicFunctionReturnValue": () => (/* reexport safe */ _modules_atomic_function_mjs__WEBPACK_IMPORTED_MODULE_4__.AtomicFunctionReturnValue),
/* harmony export */   "BackgroundColor": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.BackgroundColor),
/* harmony export */   "BackgroundImage": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.BackgroundImage),
/* harmony export */   "BooleanAnd": () => (/* reexport safe */ _modules_booleans_mjs__WEBPACK_IMPORTED_MODULE_5__.BooleanAnd),
/* harmony export */   "BooleanNot": () => (/* reexport safe */ _modules_booleans_mjs__WEBPACK_IMPORTED_MODULE_5__.BooleanNot),
/* harmony export */   "BooleanOr": () => (/* reexport safe */ _modules_booleans_mjs__WEBPACK_IMPORTED_MODULE_5__.BooleanOr),
/* harmony export */   "BorderColor": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.BorderColor),
/* harmony export */   "BorderRadius": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.BorderRadius),
/* harmony export */   "BorderStyle": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.BorderStyle),
/* harmony export */   "BorderWidth": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.BorderWidth),
/* harmony export */   "ClientOffsetTop": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.ClientOffsetTop),
/* harmony export */   "ClientOffsetLeft": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.ClientOffsetLeft),
/* harmony export */   "CssPropertyFunction": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.CssPropertyFunction),
/* harmony export */   "CssRecursivePropertyFunction": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.CssRecursivePropertyFunction),
/* harmony export */   "Color": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Color),
/* harmony export */   "ComposedFunction": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.ComposedFunction),
/* harmony export */   "ComposedFunctionValue": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.ComposedFunctionValue),
/* harmony export */   "CompoundDesignator": () => (/* reexport safe */ _modules_designator_mjs__WEBPACK_IMPORTED_MODULE_1__.CompoundDesignator),
/* harmony export */   "ConstantFunction": () => (/* reexport safe */ _modules_function_mjs__WEBPACK_IMPORTED_MODULE_2__.ConstantFunction),
/* harmony export */   "ConstantDesignator": () => (/* reexport safe */ _modules_value_mjs__WEBPACK_IMPORTED_MODULE_3__.ConstantDesignator),
/* harmony export */   "ConstantValue": () => (/* reexport safe */ _modules_value_mjs__WEBPACK_IMPORTED_MODULE_3__.ConstantValue),
/* harmony export */   "Current": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Current),
/* harmony export */   "CurrentNode": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.CurrentNode),
/* harmony export */   "Designator": () => (/* reexport safe */ _modules_designator_mjs__WEBPACK_IMPORTED_MODULE_1__.Designator),
/* harmony export */   "DesignatedObject": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.DesignatedObject),
/* harmony export */   "DimensionHeight": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.DimensionHeight),
/* harmony export */   "DimensionWidth": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.DimensionWidth),
/* harmony export */   "Display": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Display),
/* harmony export */   "Division": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.Division),
/* harmony export */   "ElementAttribute": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.ElementAttribute),
/* harmony export */   "ElementAttributeValue": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.ElementAttributeValue),
/* harmony export */   "Enumerate": () => (/* reexport safe */ _modules_enumerate_mjs__WEBPACK_IMPORTED_MODULE_8__.Enumerate),
/* harmony export */   "EnumeratedValue": () => (/* reexport safe */ _modules_enumerate_mjs__WEBPACK_IMPORTED_MODULE_8__.EnumeratedValue),
/* harmony export */   "Equals": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Equals),
/* harmony export */   "ExistentialQuantifier": () => (/* reexport safe */ _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__.ExistentialQuantifier),
/* harmony export */   "Exists": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Exists),
/* harmony export */   "Explainer": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.Explainer),
/* harmony export */   "Find": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Find),
/* harmony export */   "FindBySelector": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.FindBySelector),
/* harmony export */   "Float": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Float),
/* harmony export */   "FontFamily": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.FontFamily),
/* harmony export */   "FontSize": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.FontSize),
/* harmony export */   "FontWeight": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.FontWeight),
/* harmony export */   "ForAll": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.ForAll),
/* harmony export */   "FunctionNamedArgument": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.FunctionNamedArgument),
/* harmony export */   "GreaterOrEqual": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.GreaterOrEqual),
/* harmony export */   "GreaterThan": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.GreaterThan),
/* harmony export */   "Height": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Height),
/* harmony export */   "Identity": () => (/* reexport safe */ _modules_atomic_function_mjs__WEBPACK_IMPORTED_MODULE_4__.Identity),
/* harmony export */   "Implies": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Implies),
/* harmony export */   "InputArgument": () => (/* reexport safe */ _modules_function_mjs__WEBPACK_IMPORTED_MODULE_2__.InputArgument),
/* harmony export */   "IsEqualTo": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.IsEqualTo),
/* harmony export */   "IsGreaterOrEqual": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.IsGreaterOrEqual),
/* harmony export */   "IsGreaterThan": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.IsGreaterThan),
/* harmony export */   "IsLessOrEqual": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.IsLessOrEqual),
/* harmony export */   "IsLessThan": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.IsLessThan),
/* harmony export */   "LesserThan": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.LesserThan),
/* harmony export */   "LesserOrEqual": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.LesserOrEqual),
/* harmony export */   "MarginTop": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.MarginTop),
/* harmony export */   "MarginBottom": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.MarginBottom),
/* harmony export */   "MarginLeft": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.MarginLeft),
/* harmony export */   "MarginRight": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.MarginRight),
/* harmony export */   "Minus": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Minus),
/* harmony export */   "Multiplication": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.Multiplication),
/* harmony export */   "NamedArgument": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.NamedArgument),
/* harmony export */   "NamedArgumentValue": () => (/* reexport safe */ _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__.NamedArgumentValue),
/* harmony export */   "NaryConjunctiveVerdict": () => (/* reexport safe */ _modules_booleans_mjs__WEBPACK_IMPORTED_MODULE_5__.NaryConjunctiveVerdict),
/* harmony export */   "NaryDisjunctiveVerdict": () => (/* reexport safe */ _modules_booleans_mjs__WEBPACK_IMPORTED_MODULE_5__.NaryDisjunctiveVerdict),
/* harmony export */   "NaryValue": () => (/* reexport safe */ _modules_value_mjs__WEBPACK_IMPORTED_MODULE_3__.NaryValue),
/* harmony export */   "NthItem": () => (/* reexport safe */ _modules_enumerate_mjs__WEBPACK_IMPORTED_MODULE_8__.NthItem),
/* harmony export */   "NodeWrapper": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.NodeWrapper),
/* harmony export */   "Not": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Not),
/* harmony export */   "Nothing": () => (/* reexport safe */ _modules_designator_mjs__WEBPACK_IMPORTED_MODULE_1__.Nothing),
/* harmony export */   "ObjectNode": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.ObjectNode),
/* harmony export */   "Opacity": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Opacity),
/* harmony export */   "Or": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Or),
/* harmony export */   "OrNode": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.OrNode),
/* harmony export */   "PageOffsetTop": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PageOffsetTop),
/* harmony export */   "PageOffsetLeft": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PageOffsetLeft),
/* harmony export */   "Path": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Path),
/* harmony export */   "PathValue": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PathValue),
/* harmony export */   "PaddingTop": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PaddingTop),
/* harmony export */   "PaddingBottom": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PaddingBottom),
/* harmony export */   "PaddingRight": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PaddingRight),
/* harmony export */   "PaddingLeft": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.PaddingLeft),
/* harmony export */   "Plus": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Plus),
/* harmony export */   "Position": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Position),
/* harmony export */   "Quantifier": () => (/* reexport safe */ _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__.Quantifier),
/* harmony export */   "QuantifierConjunctiveVerdict": () => (/* reexport safe */ _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__.QuantifierConjunctiveVerdict),
/* harmony export */   "QuantifierDisjunctiveVerdict": () => (/* reexport safe */ _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__.QuantifierDisjunctiveVerdict),
/* harmony export */   "QuantifierVerdict": () => (/* reexport safe */ _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__.QuantifierVerdict),
/* harmony export */   "Register": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Register),
/* harmony export */   "RegisterBySelector": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.RegisterBySelector),
/* harmony export */   "ReturnValue": () => (/* reexport safe */ _modules_function_mjs__WEBPACK_IMPORTED_MODULE_2__.ReturnValue),
/* harmony export */   "Serialization": () => (/* reexport safe */ _modules_serialization_mjs__WEBPACK_IMPORTED_MODULE_14__.Serialization),
/* harmony export */   "Subtraction": () => (/* reexport safe */ _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__.Subtraction),
/* harmony export */   "TestCondition": () => (/* reexport safe */ _modules_verdict_mjs__WEBPACK_IMPORTED_MODULE_12__.TestCondition),
/* harmony export */   "TestDriver": () => (/* reexport safe */ _modules_verdict_mjs__WEBPACK_IMPORTED_MODULE_12__.TestDriver),
/* harmony export */   "TestResult": () => (/* reexport safe */ _modules_verdict_mjs__WEBPACK_IMPORTED_MODULE_12__.TestResult),
/* harmony export */   "Tracer": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.Tracer),
/* harmony export */   "UniversalQuantifier": () => (/* reexport safe */ _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__.UniversalQuantifier),
/* harmony export */   "Unknown": () => (/* reexport safe */ _modules_designator_mjs__WEBPACK_IMPORTED_MODULE_1__.Unknown),
/* harmony export */   "UnknownNode": () => (/* reexport safe */ _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__.UnknownNode),
/* harmony export */   "Value": () => (/* reexport safe */ _modules_value_mjs__WEBPACK_IMPORTED_MODULE_3__.Value),
/* harmony export */   "Verdict": () => (/* reexport safe */ _modules_verdict_mjs__WEBPACK_IMPORTED_MODULE_12__.Verdict),
/* harmony export */   "Visibility": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Visibility),
/* harmony export */   "WebElementFunction": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.WebElementFunction),
/* harmony export */   "Width": () => (/* reexport safe */ _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__.Width),
/* harmony export */   "Zindex": () => (/* reexport safe */ _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__.Zindex)
/* harmony export */ });
/* harmony import */ var data_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-tree */ "./node_modules/data-tree/index.js");
/* harmony import */ var _modules_designator_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _modules_function_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/function.mjs */ "./modules/function.mjs");
/* harmony import */ var _modules_value_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/value.mjs */ "./modules/value.mjs");
/* harmony import */ var _modules_atomic_function_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/atomic-function.mjs */ "./modules/atomic-function.mjs");
/* harmony import */ var _modules_booleans_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/booleans.mjs */ "./modules/booleans.mjs");
/* harmony import */ var _modules_tracer_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tracer.mjs */ "./modules/tracer.mjs");
/* harmony import */ var _modules_numbers_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/numbers.mjs */ "./modules/numbers.mjs");
/* harmony import */ var _modules_enumerate_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/enumerate.mjs */ "./modules/enumerate.mjs");
/* harmony import */ var _modules_composed_function_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/composed-function.mjs */ "./modules/composed-function.mjs");
/* harmony import */ var _modules_quantifier_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/quantifier.mjs */ "./modules/quantifier.mjs");
/* harmony import */ var _modules_web_element_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/web-element.mjs */ "./modules/web-element.mjs");
/* harmony import */ var _modules_verdict_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/verdict.mjs */ "./modules/verdict.mjs");
/* harmony import */ var _modules_util_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/util.mjs */ "./modules/util.mjs");
/* harmony import */ var _modules_serialization_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/serialization.mjs */ "./modules/serialization.mjs");
/* harmony import */ var _modules_syntax_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/syntax.mjs */ "./modules/syntax.mjs");
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js");
/*
    A lineage library for DOM nodes
    MIT License

    Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
    Eckinox Média and Université du Québec à Chicoutimi

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

/**
 * Imports
 */
// DataTree for tree management
 // Local imports

















/**
 * Evaluates a set of conditions on a DOM tree
 * @param root A DOM node corresponding to the root of the page
 * @param conditions A list of {@link Function}, each corresponding to a
 * Boolean condition to evaluate on the page.
 * @return An array of data trees corresponding to the explanation for
 * each condition that evaluates to <tt>false</tt>.
 */

function evaluateDom(root, conditions = []) {
  var verdicts = [];

  for (var i = 0; i < conditions.length; i++) {
    var verdict = getVerdict(root, conditions[i]);

    if (verdict != null) {
      verdicts.push(verdict);
    }
  }

  return verdicts;
}
/**
 * Evaluates a single condition on a DOM tree. <strong>This is a stub for
 * testing purposes.</strong>
 * @param root A DOM node corresponding to the root of the page
 * @param conditions A {@link Function} that corresponds to a
 * Boolean condition to evaluate on the page.
 * @return A data tree explaining the violation of the condition if it
 * evaluates to <tt>false</tt>, and <tt>null</tt> if the condition is fulfilled.
 */


function getVerdict(root, condition) {
  if (root === null) {
    return null;
  }

  const returnValue = condition.evaluate(root);

  if (returnValue.value === true) {
    return null;
  }

  const verdict = new _modules_verdict_mjs__WEBPACK_IMPORTED_MODULE_12__.Verdict(returnValue, condition);
  const witness = verdict.getWitness();
  const trees = getTreeFromWitness(witness);
  return trees;
}

function getTreeFromWitness(witnesses = []) {
  const tree = data_tree__WEBPACK_IMPORTED_MODULE_0__.create();

  for (const designatedObject of witnesses) {
    const part = [];
    let subject = null;
    let elementAttribute = null;
    let lastPartType; // First form

    if ((0,_modules_util_mjs__WEBPACK_IMPORTED_MODULE_13__.isHtmlElement)(designatedObject.getObject())) {
      const elements = designatedObject.getDesignator().elements;
      subject = elements[elements.length - 2].toString() || null;
      elementAttribute = elements[elements.length - 3].toString() || null;
      lastPartType = "Path";
    } // Second form
    else {
        subject = designatedObject.getObject();
        lastPartType = "ConstantDesignator";
      } //  


    for (const element of designatedObject.getDesignator().elements) {
      if (element.constructor.name === lastPartType) {
        break;
      }

      part.push(element.toString());
    }

    tree.insert({
      elementAttribute,
      part,
      subject
    });
  }

  return tree;
}

async function assertDomppCondition(condition, page, selector) {
  const serializer = new _modules_serialization_mjs__WEBPACK_IMPORTED_MODULE_14__.Serialization();
  const result = await page.evaluate((condName, serializedFunction, selector) => {
    const serializer = new dompp.Serialization();
    const func = serializer.deserialize(serializedFunction);
    const cond = new dompp.TestCondition(condName, func);
    const element = document.querySelector(selector);
    const result = cond.evaluate(element);
    const passed = result.getValue();
    const explanation = result.getStaticExplanation();
    return {
      passed: passed,
      explanation: explanation
    };
  }, condition.name, serializer.serialize(condition.function), selector); // pas le message exact juste pour un test 

  if (!result.passed) {
    const mess = "l'erreur est due a " + result.explanation.elementAttribute + "qui se trouve " + result.explanation.part + "ABC" + result.explanation.subject;
    throw new assert__WEBPACK_IMPORTED_MODULE_16__.strict.AssertionError({
      name: "dom-pp assertion error",
      message: mess,
      operator: 'Equal',
      actual: true,
      expected: false
    });
  }
}

function serializeArray(array) {
  var res = [];
  var s = new _modules_serialization_mjs__WEBPACK_IMPORTED_MODULE_14__.Serialization();

  for (let i = 0; i < array.length; i++) {
    res.push(s.serialize(array[i]));
  }

  return res;
}

function deserializeArray(array) {
  var res = [];
  var s = new _modules_serialization_mjs__WEBPACK_IMPORTED_MODULE_14__.Serialization();

  for (let i = 0; i < array.length; i++) {
    res.push(s.deserialize(array[i]));
  }

  return res;
}
/**
 * Export public API
 */


 // :wrap=soft:tabSize=2:

/***/ }),

/***/ "./modules/atomic-function.mjs":
/*!*************************************!*\
  !*** ./modules/atomic-function.mjs ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AtomicFunction": () => (/* binding */ AtomicFunction),
/* harmony export */   "AtomicFunctionReturnValue": () => (/* binding */ AtomicFunctionReturnValue),
/* harmony export */   "Identity": () => (/* binding */ Identity)
/* harmony export */ });
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _function_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function.mjs */ "./modules/function.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports


 //import { NaryConjunctiveVerdict, NaryDisjunctiveVerdict } from "./booleans.mjs"

/**
 * Function that performs a direct computation on its input arguments. This is
 * opposed to a {@link ComposedFunction} that calls other functions to produce
 * its return value.
 * @param arity The input arity of the function
 * @extends AbstractFunction
 */

class AtomicFunction extends _function_mjs__WEBPACK_IMPORTED_MODULE_1__.AbstractFunction {
  constructor(arity) {
    super();
    /**
     * The input arity of the function
     */

    this.arity = arity;
  }

  evaluate() {
    var values = [];

    for (var i = 0; i < arguments.length; i++) {
      values[i] = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(arguments[i]);
    }

    return this.compute(...values);
  }
  /**
   * Computes the return value of the function from its input arguments.
   * @param arguments A variable number of {@link Values}, whose number
   * must match the input arity of the function.
   * @return The resulting {@link Value}
   */


  compute() {
    if (arguments.length !== this.arity) {
      throw "Invalid number of arguments";
    }

    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i].getValue());
    }

    var o = this.getValue(...args);

    if (o instanceof _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value) {
      return o;
    }

    return new AtomicFunctionReturnValue(this, o, ...arguments);
  }

  getValue() {
    // To be overridden by descendants
    return null;
  }

  set() {
    return this;
  }

}
/**
 * Value obtained as the output produced by an atomic function call(this).
 * @extends Value
 */


class AtomicFunctionReturnValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  /**
   * Creates a new value
   * @param arguments An output value followed by the function's input arguments
   */
  constructor() {
    super();
    /**
     * The function instance this value comes from
     */

    this.referenceFunction = arguments[0];
    /**
     * The output value produced by the function
     */

    this.outputValue = arguments[1];
    /**
     * The function's input arguments
     */

    this.inputValues = [];

    for (var i = 2; i < arguments.length; i++) {
      this.inputValues.push(arguments[i]);
    }
  }

  getValue() {
    return this.outputValue;
  }

  toString() {
    return this.outputValue.toString();
  }
  /* @Override */


  query(type, d, root, factory) {
    var leaves = [];
    var n = factory.getAndNode();

    for (var i = 0; i < this.inputValues.length; i++) {
      if (this.inputValues[i] === null) {
        continue;
      }

      var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(d.tail(), new _function_mjs__WEBPACK_IMPORTED_MODULE_1__.InputArgument(i));
      var sub_root = factory.getObjectNode(new_d, this.referenceFunction);
      var sub_leaves = [];
      sub_leaves = this.inputValues[i].query(type, _function_mjs__WEBPACK_IMPORTED_MODULE_1__.ReturnValue.instance, sub_root, factory);
      leaves.push(...sub_leaves);
      n.addChild(sub_root);
    }

    var f_root = factory.getObjectNode(d, this.referenceFunction);

    if (n.getChildren().length === 1) {
      f_root.addChild(n.getChildren()[0]);
    } else {
      f_root.addChild(n);
    }

    root.addChild(f_root);
    return leaves;
  }

}
/**
 * Function that returns its single input argument as is.
 * @extends AtomicFunction
 */


class Identity extends AtomicFunction {
  constructor() {
    super(1);
  }

  getValue() {
    return arguments[0];
  }

}
/**
 * Package exports
 */




/***/ }),

/***/ "./modules/booleans.mjs":
/*!******************************!*\
  !*** ./modules/booleans.mjs ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BooleanAnd": () => (/* binding */ BooleanAnd),
/* harmony export */   "BooleanNot": () => (/* binding */ BooleanNot),
/* harmony export */   "BooleanOr": () => (/* binding */ BooleanOr),
/* harmony export */   "NaryConjunctiveVerdict": () => (/* binding */ NaryConjunctiveVerdict),
/* harmony export */   "NaryDisjunctiveVerdict": () => (/* binding */ NaryDisjunctiveVerdict)
/* harmony export */ });
/* harmony import */ var _function_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function.mjs */ "./modules/function.mjs");
/* harmony import */ var _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./atomic-function.mjs */ "./modules/atomic-function.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports




/**
 * Abstract class representing the binary Boolean connectives "and" and "or".
 * @extends AtomicFunction
 */

class BooleanConnective extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AtomicFunction {
  constructor() {
    super("arity");
  }

  compute() {
    var false_values = [];
    var false_positions = [];
    var true_values = [];
    var true_positions = [];

    for (var i = 0; i < arguments.length; i++) {
      var o = arguments[i].getValue();

      if (typeof o !== "boolean") {
        throw "BooleanConnective: Invalid argument type";
      }

      if (o === true) {
        true_values.push(arguments[i]);
        true_positions.push(i);
      } else {
        false_values.push(arguments[i]);
        false_positions.push(i);
      }
    }

    return this.getBooleanValue(false_values, true_values, false_positions, true_positions);
  }

}
/**
 * An {@link NaryValue} that is linked to its input values through an "or"
 * node.
 * @extends NaryValue
 */


class NaryDisjunctiveVerdict extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.NaryValue {
  query(q, d, root, factory) {
    var leaves = [];
    var n = factory.getOrNode();

    for (var i = 0; i < this.values.length; i++) {
      var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_3__.CompoundDesignator.create(d.tail(), new _function_mjs__WEBPACK_IMPORTED_MODULE_0__.InputArgument(this.positions[i]));
      var sub_root = factory.getObjectNode(new_d, this.referenceFunction);
      var sub_leaves = [];
      sub_leaves = this.values[i].query(q, _function_mjs__WEBPACK_IMPORTED_MODULE_0__.ReturnValue.instance, sub_root, factory);
      leaves.push(...sub_leaves);
      n.addChild(sub_root);
    }

    if (n.getChildren().length === 1) {
      root.addChild(n.getChildren()[0]);
    } else {
      root.addChild(n);
    }

    return leaves;
  }

}
/**
 * An {@link NaryValue} that is linked to its input values through an "and"
 * node.
 * @extends NaryValue
 */


class NaryConjunctiveVerdict extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.NaryValue {
  constructor(value, values = [], positions = []) {
    super(value, values, positions);
  }

  query(q, d, root, factory) {
    var leaves = [];
    var n = factory.getAndNode();

    for (var i = 0; i < this.values.length; i++) {
      var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_3__.CompoundDesignator.create(d.tail(), new _function_mjs__WEBPACK_IMPORTED_MODULE_0__.InputArgument(this.positions[i]));
      var sub_root = factory.getObjectNode(new_d, this.referenceFunction);
      var sub_leaves = [];
      sub_leaves = this.values[i].query(q, _function_mjs__WEBPACK_IMPORTED_MODULE_0__.ReturnValue.instance, sub_root, factory);
      leaves.push(...sub_leaves);
      n.addChild(sub_root);
    }

    if (n.getChildren().length === 1) {
      root.addChild(n.getChildren()[0]);
    } else {
      root.addChild(n);
    }

    return leaves;
  }

}
/**
 * The Boolean "and" function.
 * @extends BooleanConnective
 */


class BooleanAnd extends BooleanConnective {
  constructor(arity = 2) {
    super(arity);
  }
  /**
   * Gets the Boolean value.
   * @param false_values
   * @param true_values
   * @param false_positions
   * @param true_positions
   */


  getBooleanValue(false_values = [], true_values = [], false_positions = [], true_positions = []) {
    if (false_values.length === 0) {
      return new NaryConjunctiveVerdict(true, true_values, true_positions);
    }

    return new NaryDisjunctiveVerdict(false, false_values, false_positions);
  }

  toString() {
    return "And";
  }

}
/**
 * The Boolean "or" function.
 * @extends BooleanConnective
 */


class BooleanOr extends BooleanConnective {
  constructor(arity = 2) {
    super(arity);
  }

  getBooleanValue(false_values = [], true_values = [], false_positions = [], true_positions = []) {
    if (true_values.length === 0) {
      return new NaryConjunctiveVerdict(false, false_values, false_positions);
    }

    return new NaryDisjunctiveVerdict(true, true_values, true_positions);
  }

  toString() {
    return "Or";
  }

}
/**
 * The Boolean "not" function.
 * @extends AtomicFunction
 */


class BooleanNot extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AtomicFunction {
  constructor() {
    super(1);
  }

  getValue() {
    if (typeof arguments[0] !== "boolean") {
      throw "BooleanNot: Invalid argument type";
    }

    return !arguments[0];
  }

  toString() {
    return "Not";
  }

}
/**
 * Package exports
 */




/***/ }),

/***/ "./modules/composed-function.mjs":
/*!***************************************!*\
  !*** ./modules/composed-function.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Argument": () => (/* binding */ Argument),
/* harmony export */   "ArgumentValue": () => (/* binding */ ArgumentValue),
/* harmony export */   "ComposedFunction": () => (/* binding */ ComposedFunction),
/* harmony export */   "ComposedFunctionValue": () => (/* binding */ ComposedFunctionValue),
/* harmony export */   "FunctionNamedArgument": () => (/* binding */ FunctionNamedArgument),
/* harmony export */   "NamedArgument": () => (/* binding */ NamedArgument),
/* harmony export */   "NamedArgumentValue": () => (/* binding */ NamedArgumentValue)
/* harmony export */ });
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _function_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function.mjs */ "./modules/function.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
/* harmony import */ var _tracer_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tracer.mjs */ "./modules/tracer.mjs");
/*
  A lineage library for DOM nodes
  MIT License

  Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
  Eckinox Média and Université du Québec à Chicoutimi

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

/**
 * Imports
 */




/**
 * A function that is defined as the composition of other functions.
 * @extends AtomicFunction
 */

class ComposedFunction extends _function_mjs__WEBPACK_IMPORTED_MODULE_1__.AbstractFunction {
  /**
     * Creates a new instance of the function.
     * @param operator The top-level operator this function composes
     * @param operands The operands of this function. These operands
     * can themselves be other functions.
     */
  constructor(operator, ...operands) {
    super();
    this.members = [operator, ...operands];
    this.operator = operator;
    this.operands = [];

    for (var i = 0; i < operands.length; i++) {
      if (typeof operands[i] === "string") {
        var op = operands[i];

        if (op.startsWith("@")) {
          var index = op.substring(1).trim();
          this.operands.push(new Argument(index));
          continue;
        }

        if (op.startsWith("$")) {
          this.operands.push(new NamedArgument(this, op.substring(1).trim()));
          continue;
        }
      } else {
        this.operands.push(_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AbstractFunction.lift(operands[i]));
      }
    }
  }

  setName(name) {
    this.name = name;
    return this;
  }

  set(variable, value) {
    var cf = new ComposedFunction(this.operator);
    var operands = [];

    for (var i = 0; i < this.operands.length; i++) {
      operands.push(this.operands[i].set(variable, value));
    }

    cf.operands = operands;
    return cf;
  }

  getArity() {
    var args = [];
    this.getArguments(args);
    return args.length;
  }

  getArguments(args) {
    for (var i = 0; i < this.operands.length; i++) {
      var f = this.operands[i];

      if (f instanceof ComposedFunction) {
        f.getArguments(args);
      }

      if (f instanceof Argument) {
        args.push(f.index);
      }

      if (f instanceof NamedArgument) {
        args.push(i);
      }
    }
  }

  evaluate() {
    var values = [];

    for (var i = 0; i < this.operands.length; i++) {
      values.push(this.operands[i].evaluate(...arguments));
    }

    var v = this.operator.evaluate(...values);
    return new ComposedFunctionValue(this, v, ...values);
  }

  toString() {
    if (this.name != null) {
      return this.name;
    }

    return "F(" + this.operator.toString() + ")";
  }

}
/**
 * Value returned by a composed function.
 * @extends Value
 */


class ComposedFunctionValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  constructor(f, return_value, ...values) {
    super();
    this.referenceFunction = f;
    this.inputValues = values;
    this.returnValue = return_value;
  }

  query(q, d, root, factory) {
    var leaves = [];

    if (!(d.head() instanceof _function_mjs__WEBPACK_IMPORTED_MODULE_1__.ReturnValue)) {
      return leaves;
    }

    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ReturnValue.instance, d.tail());
    var sub_root = factory.getObjectNode(new_d, this.referenceFunction.operator);
    var sub_leaves = this.returnValue.query(q, d, sub_root, factory);
    var new_sub_leaves = [];

    for (var i = 0; i < sub_leaves.length; i++) {
      var sub_leaf = sub_leaves[i];

      if (sub_leaf instanceof _tracer_mjs__WEBPACK_IMPORTED_MODULE_3__.ObjectNode) {
        var o_sl = sub_leaf;
        var des = o_sl.getDesignatedObject().getDesignator();

        if (des.head() instanceof _function_mjs__WEBPACK_IMPORTED_MODULE_1__.InputArgument) {
          var fia = des.head();
          var index = fia.getIndex();
          new_sub_leaves.push(...this.inputValues[index].query(q, new_d, sub_leaf, factory));
          continue;
        }
      }

      new_sub_leaves.push(sub_leaf);
    }

    leaves.push(...new_sub_leaves);
    root.addChild(sub_root);
    return leaves;
  }

  getValue() {
    return this.returnValue.getValue();
  }

  toString() {
    return this.returnValue.toString();
  }

}
/**
 * A named argument.
 * @extends AbstractFunction
 */


class NamedArgument extends _function_mjs__WEBPACK_IMPORTED_MODULE_1__.AbstractFunction {
  constructor(f, name) {
    super();
    this.name = name;
    this.value = null;
    this.referenceFunction = f;
    this.isSet = false;
  }
  /* @Override */


  set(name, value) {
    if (this.name === name || "$" + this.name === name) {
      this.value = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(value);
    }

    this.isSet = true;
    return this;
  }

  evaluate() {
    if (this.isSet) {
      return new NamedArgumentValue(this.name, this.value);
    }

    for (var i = 0; i < this.referenceFunction.operands.length; i++) {
      if (this.referenceFunction.operands[i] instanceof NamedArgument) {
        if (this.name === this.referenceFunction.operands[i].getName()) {
          return new NamedArgumentValue(this.name, _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(arguments[i]));
        }
      }
    }

    return new NamedArgumentValue(this.name, this.value);
  }

  toString() {
    return "$" + this.name;
  }

  getArity() {
    return 0;
  }

  getName() {
    return this.name;
  }

}
/**
 * A named argument value.
 * @extends Value
 */


class NamedArgumentValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  constructor(name, v) {
    super();
    this.value = v;
    this.name = name;
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(d.tail(), new FunctionNamedArgument(this.name, this.value));
    var n = factory.getObjectNode(new_d, this.value);
    var sub_leaves = this.value.query(q, d, n, factory);
    leaves.push(...sub_leaves);
    root.addChild(n);
    return leaves;
  }

  getValue() {
    return this.value.getValue();
  }

  toString() {
    return this.value.getValue().toString();
  }

}
/**
 * Designates the argument passed to a function by referring to it
 * by its name.
 * @extends Designator
 */


class FunctionNamedArgument extends _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Designator {
  /**
     * Creates a new named argument.
     * @param name The name of the argument
     * @param v The value of the argument
     */
  constructor(name, v) {
    super();
    this.name = name;
    this.value = v;
  }

  appliesTo(o) {
    return o instanceof Function;
  }

  head() {
    return this;
  }

  tail() {
    return null;
  }

  toString() {
    return "$" + this.name + "/" + this.value;
  }

}
/**
 * A function that acts as an argument to a composed function.
 * @extends AbstractFunction
 */


class Argument extends _function_mjs__WEBPACK_IMPORTED_MODULE_1__.AbstractFunction {
  /**
     * Creates a new instance of the function.
     * @param index The position of the argument in the composed
     * function
     */
  constructor(index) {
    super();
    this.index = index;
  }
  /* @Override */


  set(name, value) {
    return this;
  }

  evaluate() {
    var v = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(arguments[this.index]);
    return new ArgumentValue(this, v, this.index);
  }

  toString() {
    return "@" + this.index;
  }

}
/**
 * A value that corresponds to an argument passed to a composed function.
 * @extends Value
 */


class ArgumentValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  /**
     * Creates a new argument value.
     * @param f The function to which this value is an argument
     * @param v The value
     * @param index The position of the value in the arguments of the
     * function
     */
  constructor(f, v, index) {
    super();
    this.value = v;
    this.index = index;
    this.referenceFunction = f;
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(d.tail(), new _function_mjs__WEBPACK_IMPORTED_MODULE_1__.InputArgument(this.index, this.value));
    var n = factory.getObjectNode(new_d, this.value);
    var sub_leaves = this.value.query(q, d, n, factory);
    leaves.push(...sub_leaves);
    root.addChild(n);
    return leaves;
  }

  getValue() {
    return this.value.getValue();
  }

}
/**
 * Package exports
 */




/***/ }),

/***/ "./modules/designator.mjs":
/*!********************************!*\
  !*** ./modules/designator.mjs ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "All": () => (/* binding */ All),
/* harmony export */   "CompoundDesignator": () => (/* binding */ CompoundDesignator),
/* harmony export */   "Designator": () => (/* binding */ Designator),
/* harmony export */   "Nothing": () => (/* binding */ Nothing),
/* harmony export */   "Unknown": () => (/* binding */ Unknown)
/* harmony export */ });
/* harmony import */ var _util_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.mjs */ "./modules/util.mjs");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
   A lineage library for DOM nodes
  MIT License

  Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
  Eckinox Média and Université du Québec à Chicoutimi

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

/**
 * Imports
 */
// Local imports

/**
 * Abstract class representing all functions that extract parts of an
 * object.
 */

class Designator {
  /**
   * Creates a new instance of designator.
   */
  constructor() {// Nothing to do
  }
  /**
   * Extracts the designator at the head of a composition. For designators that
   * are atomic, returns the designator itself.
   */


  head() {
    return this;
  }
  /**
   * Extracts the designator made of the tail of a composition. For designators
   * that are atomic, returns null.
   */


  tail() {
    return null;
  }

  equals(o) {
    if (o == null || !(o instanceof Designator)) {
      return false;
    }

    return o == this;
  }

}
/**
 * A special designator that designates "nothing".
 * @extends Designator
 */


class Nothing extends Designator {
  constructor() {
    super();
  }

  toString() {
    return "Nothing";
  }

  equals(o) {
    if (o == null || !(o instanceof Nothing)) {
      return false;
    }

    return true;
  }

}
/**
 * A special designator that designates "unknown".
 * @extends Designator
 */


_defineProperty(Nothing, "instance", new Nothing());

class Unknown extends Designator {
  constructor() {
    super();
  }

  toString() {
    return "Unknown";
  }

  equals(o) {
    if (o == null || !(o instanceof Unknown)) {
      return false;
    }

    return true;
  }

}
/**
 * A special designator that designates all of an object.
 * @extends Designator
 */


_defineProperty(Unknown, "instance", new Unknown());

class All extends Designator {
  constructor() {
    super();
  }

  toString() {
    return "All";
  }

  equals(o) {
    if (o == null || !(o instanceof All)) {
      return false;
    }

    return true;
  }

}
/**
 * Designator expressed as the composition of atomic designators.
 * @param Any number of designators
 * @extends Designator
 */


_defineProperty(All, "instance", new All());

class CompoundDesignator extends Designator {
  /**
   * Creates a flat compound designator from a list of other designators.
   */
  static create() {
    if (arguments.length == 0) {
      return Nothing.instance;
    }

    var designators = [];

    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] == null) {
        continue;
      }

      if (arguments[i] instanceof CompoundDesignator) {
        designators.push(...arguments[i].elements);
      } else {
        designators.push(arguments[i]);
      }
    }

    if (designators.length == 0) {
      return Nothing.instance;
    }

    if (designators.length == 1) {
      return designators[0];
    }

    return new CompoundDesignator(...designators);
  }

  constructor() {
    super();
    this.elements = [];

    for (var i = 0; i < arguments.length; i++) {
      this.add(arguments[i]);
    }
  }
  /**
   * Adds a designator to the composition.
   * @param d The designator to add. If it is compound, each of its elements are
   * added individually. This helps keeping the compound designators "flat".
   * If d is null, the input is simply ignored and nothing happens.
   */


  add(d) {
    if (d == null) {
      return;
    }

    if (d instanceof CompoundDesignator) {
      for (var j = 0; j < d.elements.length; j++) {
        this.add(d.elements[j]);
      }
    } else {
      this.elements.push(d);
    }
  }
  /**
   * Gets the size (number of atomic designators) contained in this composite
   * designator.
   * @return The number of atomic designators
   */


  size() {
    return this.elements.length;
  }

  head() {
    if (this.elements.length == 0) {
      return new Nothing();
    }

    return this.elements[this.elements.length - 1];
  }

  tail() {
    if (this.elements.length <= 1) {
      return null;
    }

    if (this.elements.length == 2) {
      return this.elements[0];
    }

    var new_d = new CompoundDesignator();

    for (var i = 0; i < this.elements.length - 1; i++) {
      new_d.add(this.elements[i]);
    }

    return new_d;
  }

  toString() {
    var s = "";

    for (var i = 0; i < this.elements.length; i++) {
      if (i > 0) {
        s += " of ";
      }

      s += this.elements[i].toString();
    }

    return s;
  }

  equals(o) {
    if (o == null || !(o instanceof CompoundDesignator)) {
      return false;
    }

    if (o.size() != this.size()) {
      return false;
    }

    for (var i = 0; i < this.elements.length; i++) {
      if (!(0,_util_mjs__WEBPACK_IMPORTED_MODULE_0__.same_object)(this.elements[i], o.elements[i])) {
        return false;
      }
    }

    return true;
  }

}
/**
 * Module exports
 */




/***/ }),

/***/ "./modules/enumerate.mjs":
/*!*******************************!*\
  !*** ./modules/enumerate.mjs ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Enumerate": () => (/* binding */ Enumerate),
/* harmony export */   "EnumeratedValue": () => (/* binding */ EnumeratedValue),
/* harmony export */   "NthItem": () => (/* binding */ NthItem)
/* harmony export */ });
/* harmony import */ var _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./atomic-function.mjs */ "./modules/atomic-function.mjs");
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
/*
  A lineage library for DOM nodes
  MIT License

  Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
  Eckinox Média and Université du Québec à Chicoutimi

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/



/**
 *
 * @extends AtomicFunction
 */

class Enumerate extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  constructor() {
    super(1);
  }

  compute() {
    var list = arguments[0].getValue();

    if (!Array.isArray(list)) {
      throw "Enumerate: Invalid argument type";
    }

    var val_list = [];
    var out_list = [];

    for (var i = 0; i < list.length; i++) {
      val_list.push(_value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(list[i]));
    }

    for (let i = 0; i < list.length; i++) {
      out_list.push(new EnumeratedValue(i, val_list));
    }

    return new _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunctionReturnValue(this, out_list, ...arguments);
  }

  getValue() {
    return null;
  }

}
/**
 *
 * @extends Value
 */


class EnumeratedValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  constructor(index, input_list) {
    super();
    this.index = index;
    this.inputList = input_list;
    this.members = [index, input_list];
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_1__.CompoundDesignator.create(d.tail(), new NthItem(this.index));
    var n_it = factory.getObjectNode(new_d, this.inputList);
    root.addChild(n_it);
    var v = this.inputList[this.index];
    var sub_leaves = v.query(q, new_d, n_it, factory);
    leaves.push(...sub_leaves);
    return leaves;
  }

  getValue() {
    return this.inputList[this.index].getValue();
  }

  toString() {
    return this.inputList[this.index].getValue().toString();
  }

  equals(o) {
    if (o == null || !(o instanceof EnumeratedValue)) {
      return false;
    }

    return this.index === o.index && this.inputList === o.inputList;
  }

}
/**
 *
 * @extends Designator
 */


class NthItem extends _designator_mjs__WEBPACK_IMPORTED_MODULE_1__.Designator {
  constructor(index) {
    super();
    this.index = index;
  }

  appliesTo(o) {
    return Array.isArray(o);
  }

  getIndex() {
    return this.index;
  }

  toString() {
    return "Element #" + (this.index + 1);
  }

}
/**
 * Package exports
 */


 // :wrap=soft:tabSize=2:indentWidth=2:

/***/ }),

/***/ "./modules/function.mjs":
/*!******************************!*\
  !*** ./modules/function.mjs ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractFunction": () => (/* binding */ AbstractFunction),
/* harmony export */   "ConstantFunction": () => (/* binding */ ConstantFunction),
/* harmony export */   "InputArgument": () => (/* binding */ InputArgument),
/* harmony export */   "ReturnValue": () => (/* binding */ ReturnValue)
/* harmony export */ });
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports


/**
 * Abstract class representing a function.
 */

class AbstractFunction {
  constructor() {
    this.members = [];
  }
  /**
   * Converts an arbitrary object into a {@link Function}.
   * @param o The object to convert. If o is a function, it is returned as is.
   * Otherwise, o is converted into a {@link ConstantFunction} that returns
   * the {@link Value} lifted from o.
   * @return The converted function
   */


  static lift(o) {
    if (o instanceof AbstractFunction) {
      return o;
    }

    return new ConstantFunction(_value_mjs__WEBPACK_IMPORTED_MODULE_1__.Value.lift(o));
  }
  /**
   * Computes the return value of the function from its provided input
   * arguments.
   * @param arguments A variable number of input arguments
   * @return The return value of the function
   */


  evaluate() {
    // To be overridden by descendants
    return null;
  }
  /**
   * Binds a variable name to a specific value.
   * @param variable The name of the variable
   * @param value The value to bind this variable to
   */


  setTo(variable, value) {// To be overridden by descendants
  }
  /**
   * Gets the arity of the function.
   * @return The arity
   */


  getArity() {
    return 0;
  }

  equals(o) {
    if (o == null || !(o instanceof AbstractFunction)) {
      return false;
    }

    return o == this;
  } // d is a deserializer and j is a JSON structure


  static deserialize(d, j) {
    const params = [];

    for (const serializedParam of j.contents) {
      if (typeof serializedParam == "object" && Object.keys(serializedParam).length == 2 && typeof serializedParam.name != "undefined" && typeof serializedParam.contents != "undefined") {
        params.push(d.deserialize(serializedParam));
      } else {
        params.push(serializedParam);
      }
    }

    return new this(...params);
  }

  toJson() {
    const serializedMembers = [];

    for (const member of this.members) {
      if (typeof member == "object" && AbstractFunction.isPrototypeOf(member.constructor)) {
        serializedMembers.push(member.toJson());
      } else {
        serializedMembers.push(member);
      }
    }

    return {
      "name": this.constructor.name,
      "contents": serializedMembers
    };
  }

}
/**
 * Atomic designator representing the return value of a function.
 * @extends Designator
 */


class ReturnValue extends _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Designator {
  constructor() {
    super();
  }

  toString() {
    return "!";
  }

  equals(o) {
    if (o == null || !(o instanceof ReturnValue)) {
      return false;
    }

    return true;
  }

}
/**
 * Atomic designator representing one of the input arguments of a function.
 * @param index The index of the input argument
 * @extends Designator
 */


_defineProperty(ReturnValue, "instance", new ReturnValue());

class InputArgument extends _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Designator {
  constructor(index) {
    super();
    /**
     * The index of the input argument
     */

    this.index = index;
  }
  /**
   * Gets the index of this argument.
   */


  getIndex() {
    return this.index;
  }

  toString() {
    return "@" + this.index;
  }

  equals(o) {
    if (o == null || !(o instanceof InputArgument)) {
      return false;
    }

    return o.getIndex() == this.index;
  }

}
/**
 * Function or arity 0 that always returns the same object.
 * @extends AbstractFunction
 */


class ConstantFunction extends AbstractFunction {
  /**
   * Creates a new instance of constant function.
   * @param o The object to return
   */
  constructor(o) {
    super();
    this.members = [o];
    this.value = _value_mjs__WEBPACK_IMPORTED_MODULE_1__.Value.lift(o);
  }

  evaluate() {
    return this.value;
  }

  getArity() {
    return 0;
  }

  set(variable, value) {
    return this;
  }

}
/**
 * Module exports
 */




/***/ }),

/***/ "./modules/numbers.mjs":
/*!*****************************!*\
  !*** ./modules/numbers.mjs ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Addition": () => (/* binding */ Addition),
/* harmony export */   "Subtraction": () => (/* binding */ Subtraction),
/* harmony export */   "Division": () => (/* binding */ Division),
/* harmony export */   "GreaterOrEqual": () => (/* binding */ GreaterOrEqual),
/* harmony export */   "LesserOrEqual": () => (/* binding */ LesserOrEqual),
/* harmony export */   "GreaterThan": () => (/* binding */ GreaterThan),
/* harmony export */   "LesserThan": () => (/* binding */ LesserThan),
/* harmony export */   "Multiplication": () => (/* binding */ Multiplication),
/* harmony export */   "IsEqualTo": () => (/* binding */ IsEqualTo)
/* harmony export */ });
/* harmony import */ var _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./atomic-function.mjs */ "./modules/atomic-function.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports
 //import { Value } from "./value.mjs";

/**
 * Function that checks the equality between two objects. Two objects o1 and o2
 * are equal if one of these conditions hold:
 * <ul>
 * <li>they are both null</li>
 * <li>they are both non-null and:
 * <ol>
 *   <li>they represent the same numeric value, or</li>
 *   <li>they are the same string</li>
 * </ol></li>
 * </ul>
 * @extends AtomicFunction
 */

class IsEqualTo extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  constructor() {
    super(2);
  }

  getValue() {
    var o1 = arguments[0];
    var o2 = arguments[1];

    if (o1 == null && o2 == null) {
      return true;
    }

    if (o1 == null && o2 != null || o1 != null && o2 == null) {
      return false;
    }

    if (typeof o1 === "number" && typeof o2 === "number") {
      return o1 === o2;
    }

    if (typeof o1 === "string" && typeof o2 === "string") {
      return o1 === o2;
    }

    return false;
  }

}
/**
 * Function that adds numbers.
 * @extends AtomicFunction
 */


class Addition extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  constructor(arity = 2) {
    super(arity);
  }

  getValue() {
    var sum = 0;

    for (var i = 0; i < this.arity; i++) {
      var o = arguments[i];

      if (typeof o !== "number") {
        throw "Invalid argument type";
      }

      sum += o;
    }

    return sum;
  }

  toString() {
    return "Addition";
  }

}
/**
 * Function that subtracts numbers.
 * @extends AtomicFunction
 */


class Subtraction extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  constructor(arity = 3) {
    super(arity);
  }

  getValue() {
    var sub = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
      var o = arguments[i];

      if (typeof o !== "number") {
        throw "Invalid argument type";
      }

      sub -= o;
    }

    return sub;
  }

  toString() {
    return "Subtraction";
  }

}
/**
 * Function that multiplies numbers.
 * @extends AtomicFunction
 */


class Multiplication extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  constructor(arity = 2) {
    super(arity);
  }

  compute() {
    if (arguments.length !== this.arity) {
      throw "Invalid number of arguments";
    }

    var zero_values = [];
    var zero_positions = [];
    var result = 1;

    for (var i = 0; i < this.arity; i++) {
      var o = arguments[i].getValue();

      if (typeof o !== "number") {
        throw "Invalid argument type";
      }

      if (o === 0) {
        zero_values.push(arguments[i]);
        zero_positions.push(i);
      } else {
        result *= o;
      }
    }

    return this.getZeroValue(zero_values, zero_positions, result);
  }

  getZeroValue(zero_values = [], zero_positions = [], result = null) {
    if (zero_values.length === 0) {
      return result;
    } else {
      return parseFloat(zero_values);
    }
  }

  toString() {
    return "Multiplication";
  }

}
/**
 * Function that divides numbers.
 * @extends AtomicFunction
 */


class Division extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  constructor(arity = 2) {
    super(arity);
  }

  getValue() {
    var div = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
      var o = arguments[i];

      if (typeof o !== "number") {
        throw "Invalid argument type";
      }

      div /= o;
    }

    return div;
  }

  toString() {
    return "Division";
  }

}
/**
 * Function that compares two numbers and returns true if the first
 * is greater than the second.
 * @extends AtomicFunction
 */


class GreaterThan extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super(2);
  }

  getValue() {
    var o1 = arguments[0];
    var o2 = arguments[1];

    if (typeof o1 !== "number" || typeof o2 !== "number") {
      throw new Error(`Invalid argument type. GreaterThan expects both arguments to be numbers, but the following were received instead: ${typeof o1} (${JSON.stringify(o1)}) and ${typeof o2} (${JSON.stringify(o2)}).`);
    }

    return o1 > o2;
  }

  toString() {
    return "&gt;";
  }

}
/**
 * Function that compares two numbers and returns true if the first
 * is Lesser than the second.
 * @extends AtomicFunction
 */


class LesserThan extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super(2);
  }

  getValue() {
    var o1 = arguments[0];
    var o2 = arguments[1];

    if (typeof o1 !== "number" || typeof o2 !== "number") {
      throw new Error(`Invalid argument type. LesserThan expects both arguments to be numbers, but the following were received instead: ${typeof o1} (${JSON.stringify(o1)}) and ${typeof o2} (${JSON.stringify(o2)}).`);
    }

    return o1 < o2;
  }

  toString() {
    return "&lt;";
  }

}
/**
 * Function that compares two numbers and returns true if the first
 * is greater than or equal to the second.
 * @extends AtomicFunction
 */


class GreaterOrEqual extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super(2);
  }

  getValue() {
    var o1 = arguments[0];
    var o2 = arguments[1];

    if (typeof o1 !== "number" || typeof o2 !== "number") {
      throw new Error(`Invalid argument type. GreaterOrEqual expects both arguments to be numbers, but the following were received instead: ${typeof o1} (${JSON.stringify(o1)}) and ${typeof o2} (${JSON.stringify(o2)}).`);
    }

    return o1 >= o2;
  }

  toString() {
    return "&ge;";
  }

}
/**
 * Function that compares two numbers and returns true if the first
 * is Lesser than or equal to the second.
 * @extends AtomicFunction
 */


class LesserOrEqual extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_0__.AtomicFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super(2);
  }

  getValue() {
    var o1 = arguments[0];
    var o2 = arguments[1];

    if (typeof o1 !== "number" || typeof o2 !== "number") {
      throw new Error(`Invalid argument type. LesserOrEqual expects both arguments to be numbers, but the following were received instead: ${typeof o1} (${JSON.stringify(o1)}) and ${typeof o2} (${JSON.stringify(o2)}).`);
    }

    return o1 <= o2;
  }

  toString() {
    return "&le;";
  }

}
/**
 * Package exports
 */


 // :wrap=soft:tabSize=2:indentWidth=2:

/***/ }),

/***/ "./modules/quantifier.mjs":
/*!********************************!*\
  !*** ./modules/quantifier.mjs ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExistentialQuantifier": () => (/* binding */ ExistentialQuantifier),
/* harmony export */   "Quantifier": () => (/* binding */ Quantifier),
/* harmony export */   "QuantifierConjunctiveVerdict": () => (/* binding */ QuantifierConjunctiveVerdict),
/* harmony export */   "QuantifierDisjunctiveVerdict": () => (/* binding */ QuantifierDisjunctiveVerdict),
/* harmony export */   "QuantifierVerdict": () => (/* binding */ QuantifierVerdict),
/* harmony export */   "UniversalQuantifier": () => (/* binding */ UniversalQuantifier)
/* harmony export */ });
/* harmony import */ var _function_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function.mjs */ "./modules/function.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
/* harmony import */ var _verdict_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./verdict.mjs */ "./modules/verdict.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

/**
 * Imports
 */



/**
 * Base class for the implementation of the universal and existential
 * quantifiers.
 * @extends AbstractFunction
 */

class Quantifier extends _function_mjs__WEBPACK_IMPORTED_MODULE_0__.AbstractFunction {
  /**
   * Creates a new instance of quantifier.
   * @param index {integer|string}
   * @param domain {AbstractFunction}
   * @param phi {AbstractFunction}
   */
  constructor(index, domain, phi) {
    super();

    if (typeof index === "number") {
      this.index = index;
    } else {
      this.variable = index;
    }

    this.domain = domain;
    this.phi = phi;
    this.members = [index, domain, phi];
  }

  getArity() {
    return 1;
  }

  evaluate() {
    if (arguments.length !== 1) {
      throw "Invalid number of arguments";
    }

    var true_verdicts = [];
    var false_verdicts = [];
    var v_dom = this.domain.evaluate(...arguments);
    var o_dom = v_dom.getValue();

    if (!Array.isArray(o_dom)) {
      throw "Domain expression does not return a list";
    }

    var domain = o_dom;

    for (var i = 0; i < domain.length; i++) {
      var x = _value_mjs__WEBPACK_IMPORTED_MODULE_1__.Value.lift(domain[i]);
      var cf = this.phi.set(this.variable, x);
      var ret_val = cf.evaluate(...arguments);
      var o_b = ret_val.getValue();

      if (typeof o_b !== "boolean") {
        throw "Invalid argument type";
      }

      var b = o_b;

      if (b) {
        true_verdicts.push({
          value: x,
          verdict: ret_val
        });
      } else {
        false_verdicts.push({
          value: x,
          verdict: ret_val
        });
      }
    }

    return this.getQuantifierValue(false_verdicts, true_verdicts);
  }

  getQuantifierValue(false_verdicts, true_verdicts) {
    return null; // To be overridden by descendants
  }

}
/**
 * Common class to {@link QuantifierDisjunctiveVerdict} and
 * {@link QuantifierConjunctiveVerdict}.
 * @extends Value
 */


class QuantifierVerdict extends _value_mjs__WEBPACK_IMPORTED_MODULE_1__.Value {
  constructor(f, value, verdicts) {
    super();
    this.value = value;
    this.verdicts = verdicts;
    this.referenceFunction = f;
  }

  getValue() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }

}
/**
 * Verdict returned by a quantifier and which depends on either of the input
 * values provided. This verdict is returned for a universal quantifier that
 * evaluates to false, and for an existential quantifier that evaluates to
 * true.
 * @extends QuantifierVerdict
 */


class QuantifierDisjunctiveVerdict extends QuantifierVerdict {
  query(q, d, root, factory) {
    var leaves = [];
    var n = factory.getOrNode();

    for (var i = 0; i < this.verdicts.length; i++) {
      var vv = this.verdicts[i];
      var v = vv.verdict;
      var sub_factory = factory.getSubTracer(this.referenceFunction);
      var sub_leaves = v.query(q, _function_mjs__WEBPACK_IMPORTED_MODULE_0__.ReturnValue.instance, n, sub_factory);
      leaves.push(...sub_leaves);
    }

    var tn = factory.getObjectNode(_function_mjs__WEBPACK_IMPORTED_MODULE_0__.ReturnValue.instance, this.referenceFunction);

    if (this.verdicts.length === 1) {
      tn.addChild(n.getChildren()[0]);
    } else {
      tn.addChild(n);
    }

    root.addChild(tn);
    return leaves;
  }

}
/**
 * Verdict returned by a quantifier and which depends on all the input values
 * provided. This verdict is returned for a universal quantifier that evaluates
 * to true, and for an existential quantifier that evaluates to false.
 * @extends QuantifierVerdict
 */


class QuantifierConjunctiveVerdict extends QuantifierVerdict {
  query(q, d, root, factory) {
    var leaves = [];
    var n = factory.getAndNode();

    for (var i = 0; i < this.verdicts.length; i++) {
      var vv = this.verdicts[i];
      var v = vv.verdict;
      var sub_factory = factory.getSubTracer(v);
      var sub_leaves = v.query(q, _function_mjs__WEBPACK_IMPORTED_MODULE_0__.ReturnValue.instance, n, sub_factory);
      leaves.push(...sub_leaves);
    }

    var tn = factory.getObjectNode(_function_mjs__WEBPACK_IMPORTED_MODULE_0__.ReturnValue.instance, this.referenceFunction);

    if (this.verdicts.length === 1) {
      tn.addChild(n.getChildren()[0]);
    } else {
      tn.addChild(n);
    }

    root.addChild(tn);
    return leaves;
  }

}
/**
 * Universal quantifier.
 * @extends Quantifier
 */


class UniversalQuantifier extends Quantifier {
  getQuantifierValue(false_verdicts = [], true_verdicts = []) {
    if (false_verdicts.length === 0) {
      return new QuantifierConjunctiveVerdict(this, true, true_verdicts);
    }

    return new QuantifierDisjunctiveVerdict(this, false, false_verdicts);
  }

  toString() {
    return "ForAll";
  }

  set(variable, value) {
    return new UniversalQuantifier(this.variable, this.domain.set(variable, value), this.phi.set(variable, value));
  }

}
/**
 * Existential quantifier.
 * @extends Quantifier
 */


class ExistentialQuantifier extends Quantifier {
  getQuantifierValue(false_verdicts = [], true_verdicts = []) {
    if (true_verdicts.length > 0) {
      return new QuantifierDisjunctiveVerdict(this, true, true_verdicts);
    }

    return new QuantifierConjunctiveVerdict(this, false, false_verdicts);
  }

  toString() {
    return "Exists";
  }

  set(variable, value) {
    return new ExistentialQuantifier(this.variable, this.domain.set(variable, value), this.phi.set(variable, value));
  }

}
/**
 * Package exports
 */


 // :wrap=soft:tabSize=2:indentWidth=2:

/***/ }),

/***/ "./modules/serialization.mjs":
/*!***********************************!*\
  !*** ./modules/serialization.mjs ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Serialization": () => (/* binding */ Serialization)
/* harmony export */ });
/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.mjs */ "./index.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/


class Serialization {
  constructor() {}
  /**
   * Build method deserialize(j), j is a JSON structure,
   * this method will produce a Function object
   */


  deserialize(j) {
    const functionClass = _index_mjs__WEBPACK_IMPORTED_MODULE_0__[j.name];
    return functionClass.deserialize(this, j);
  }

  serialize(s) {
    return s.toJson();
  }

}



/***/ }),

/***/ "./modules/syntax.mjs":
/*!****************************!*\
  !*** ./modules/syntax.mjs ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "And": () => (/* binding */ And),
/* harmony export */   "Current": () => (/* binding */ Current),
/* harmony export */   "Equals": () => (/* binding */ Equals),
/* harmony export */   "Exists": () => (/* binding */ Exists),
/* harmony export */   "Find": () => (/* binding */ Find),
/* harmony export */   "ForAll": () => (/* binding */ ForAll),
/* harmony export */   "Height": () => (/* binding */ Height),
/* harmony export */   "Implies": () => (/* binding */ Implies),
/* harmony export */   "IsGreaterOrEqual": () => (/* binding */ IsGreaterOrEqual),
/* harmony export */   "IsGreaterThan": () => (/* binding */ IsGreaterThan),
/* harmony export */   "IsLessOrEqual": () => (/* binding */ IsLessOrEqual),
/* harmony export */   "IsLessThan": () => (/* binding */ IsLessThan),
/* harmony export */   "Minus": () => (/* binding */ Minus),
/* harmony export */   "Not": () => (/* binding */ Not),
/* harmony export */   "Or": () => (/* binding */ Or),
/* harmony export */   "Plus": () => (/* binding */ Plus),
/* harmony export */   "Register": () => (/* binding */ Register),
/* harmony export */   "Width": () => (/* binding */ Width)
/* harmony export */ });
/* harmony import */ var _function_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function.mjs */ "./modules/function.mjs");
/* harmony import */ var _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./composed-function.mjs */ "./modules/composed-function.mjs");
/* harmony import */ var _booleans_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./booleans.mjs */ "./modules/booleans.mjs");
/* harmony import */ var _quantifier_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./quantifier.mjs */ "./modules/quantifier.mjs");
/* harmony import */ var _enumerate_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./enumerate.mjs */ "./modules/enumerate.mjs");
/* harmony import */ var _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./numbers.mjs */ "./modules/numbers.mjs");
/* harmony import */ var _web_element_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./web-element.mjs */ "./modules/web-element.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports







/**
 * A module defining function methods that simplify the instantiation of common
 * functions. These methods make constructors and the recurrent use of
 * {@link ComposedFunction}s implicit, thereby shortening the expression of
 * asssertions. Ultimately, the library should only expose the functions defined
 * in this module to the end user.
 */
//class Syntax {

function And() {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _booleans_mjs__WEBPACK_IMPORTED_MODULE_2__.BooleanAnd(arguments.length), ...arguments);
}

function Or() {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _booleans_mjs__WEBPACK_IMPORTED_MODULE_2__.BooleanOr(arguments.length), ...arguments);
}

function Implies(op1, op2) {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _booleans_mjs__WEBPACK_IMPORTED_MODULE_2__.BooleanOr(), new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _booleans_mjs__WEBPACK_IMPORTED_MODULE_2__.BooleanNot(), op1), op2);
}

function Not() {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _booleans_mjs__WEBPACK_IMPORTED_MODULE_2__.BooleanNot(), arguments[0]);
}

function ForAll() {
  if (arguments.length == 2) {
    return new _quantifier_mjs__WEBPACK_IMPORTED_MODULE_3__.UniversalQuantifier(arguments[0], new _enumerate_mjs__WEBPACK_IMPORTED_MODULE_4__.Enumerate(), arguments[1]);
  }

  var domain = arguments[1];

  if (!(domain instanceof _function_mjs__WEBPACK_IMPORTED_MODULE_0__.AbstractFunction)) {
    domain = new _function_mjs__WEBPACK_IMPORTED_MODULE_0__.ConstantFunction(domain);
  }

  return new _quantifier_mjs__WEBPACK_IMPORTED_MODULE_3__.UniversalQuantifier(arguments[0], domain, arguments[2]);
}

function Exists() {
  if (arguments.length == 2) {
    return new _quantifier_mjs__WEBPACK_IMPORTED_MODULE_3__.ExistentialQuantifier(arguments[0], new _enumerate_mjs__WEBPACK_IMPORTED_MODULE_4__.Enumerate(), arguments[1]);
  }

  var domain = arguments[1];

  if (!(domain instanceof _function_mjs__WEBPACK_IMPORTED_MODULE_0__.AbstractFunction)) {
    domain = new _function_mjs__WEBPACK_IMPORTED_MODULE_0__.ConstantFunction(domain);
  }

  return new _quantifier_mjs__WEBPACK_IMPORTED_MODULE_3__.ExistentialQuantifier(arguments[0], domain, arguments[2]);
}

function IsGreaterThan() {
  if (arguments.length == 0) {
    return new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.GreaterThan();
  }

  if (arguments.length == 2) {
    return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.GreaterThan(), arguments[0], arguments[1]);
  }
}

function IsGreaterOrEqual() {
  if (arguments.length == 0) {
    return new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.GreaterOrEqual();
  }

  if (arguments.length == 2) {
    return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.GreaterOrEqual(), arguments[0], arguments[1]);
  }
}

function IsLessThan() {
  if (arguments.length == 0) {
    return new LessThan();
  }

  if (arguments.length == 2) {
    return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.LesserThan(), arguments[0], arguments[1]);
  }
}

function IsLessOrEqual() {
  if (arguments.length == 0) {
    return new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.LesserOrEqual();
  }

  if (arguments.length == 2) {
    return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.LesserOrEqual(), arguments[0], arguments[1]);
  }
}

function Find(x) {
  return new _web_element_mjs__WEBPACK_IMPORTED_MODULE_6__.FindBySelector(x);
}

function Register(x, ...p) {
  return new _web_element_mjs__WEBPACK_IMPORTED_MODULE_6__.RegisterBySelector(x, ...p);
}

function Width(o) {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _web_element_mjs__WEBPACK_IMPORTED_MODULE_6__.DimensionWidth(), o);
}

function Height(o) {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _web_element_mjs__WEBPACK_IMPORTED_MODULE_6__.DimensionHeight(), o);
}

function Equals(op1, op2) {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.IsEqualTo(), op1, op2);
}

function Plus() {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.Addition(arguments.length), ...arguments);
}

function Minus() {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _numbers_mjs__WEBPACK_IMPORTED_MODULE_5__.Subtraction(arguments.length), ...arguments);
}

function Current(w) {
  return new _composed_function_mjs__WEBPACK_IMPORTED_MODULE_1__.ComposedFunction(new _web_element_mjs__WEBPACK_IMPORTED_MODULE_6__.CurrentNode(), w);
} //}




/***/ }),

/***/ "./modules/tracer.mjs":
/*!****************************!*\
  !*** ./modules/tracer.mjs ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tracer": () => (/* binding */ Tracer),
/* harmony export */   "AndNode": () => (/* binding */ AndNode),
/* harmony export */   "DesignatedObject": () => (/* binding */ DesignatedObject),
/* harmony export */   "Explainer": () => (/* binding */ Explainer),
/* harmony export */   "ObjectNode": () => (/* binding */ ObjectNode),
/* harmony export */   "OrNode": () => (/* binding */ OrNode),
/* harmony export */   "UnknownNode": () => (/* binding */ UnknownNode)
/* harmony export */ });
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _function_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function.mjs */ "./modules/function.mjs");
/* harmony import */ var _util_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.mjs */ "./modules/util.mjs");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports



/**
 * Manages the nodes of a designation and-or graph.
 * @param arguments An optional stack corresponding to the tracer's context.
 */

class Tracer {
  constructor() {
    /**
     * A map keeping trace of which designated objects already have nodes.
     */
    this.nodes = new Map();
    /**
     * The context in which the tracer operates (a stack).
     */

    this.tracerContext = [];

    if (arguments.length > 0) {
      this.tracerContext = arguments;
    }
    /**
     * Whether to simplify the trees
     */


    this.simplify = true;
  }
  /**
   * Sets whether the trees produced by the tracer should be simplified.
   * @param b {boolean} Set to true to simplify trees, false otherwise
   */


  setSimplify(b) {
    this.simplify = b;
  }
  /**
   * Gets a new instance of an object node.
   * @param dob The designated object that will be contained inside the node
   * @return The object node. If an object node already exists for this
   * designated object, it is reused. Otherwise, a new object node is created.
   */


  getObjectNode(d, o) {
    if (d instanceof DesignatedObject) {
      var dob = d;
    } else {
      var dob = new DesignatedObject(d, o);
    }

    if ((0,_util_mjs__WEBPACK_IMPORTED_MODULE_2__.map_contains)(this.nodes, dob)) {
      return (0,_util_mjs__WEBPACK_IMPORTED_MODULE_2__.map_get)(this.nodes, dob);
    }

    var on = new ObjectNode(dob);
    (0,_util_mjs__WEBPACK_IMPORTED_MODULE_2__.map_put)(this.nodes, dob, on);
    return on;
  }
  /**
   * Gets a new instance of an "and" node.
   * @return A new "and" node
   */


  getAndNode() {
    return new AndNode();
  }
  /**
   * Gets a new instance of an "or" node.
   * @return A new "or" node
   */


  getOrNode() {
    return new OrNode();
  }
  /**
   * Gets a new instance of an "unknown" node.
   * @return A new "unknown" node
   */


  getUnknownNode() {
    return new UnknownNode();
  }
  /**
   * Gets an instance of a sub-tracer from this tracer.
   * @param {Object} o An object to append at the end of the current
   * tracer's context
   */


  getSubTracer(o) {
    var con = [];
    con.push(...this.tracerContext);
    con.push(o);
    return new Tracer(...con);
  }

  getTree(q, d, o) {
    var visited = [];
    var tn = this.getObjectNode(d, o);
    this.getChildren(q, tn, visited);
    return tn;
  }

  getChildren(q, root, visited) {
    if ((0,_util_mjs__WEBPACK_IMPORTED_MODULE_2__.set_contains)(visited, root)) {
      // This node has already been expanded
      return;
    }

    visited.push(root);

    if (!(root instanceof ObjectNode)) {
      // Nothing to expand
      return;
    }

    var dob = root.getDesignatedObject();
    var o = dob.getObject();
    var d = dob.getDesignator();

    if (d instanceof _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.All || d instanceof _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Nothing || d instanceof _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Unknown) {
      // Trivial designator: nothing to expand
      return;
    }

    if (typeof o.query == "function") // Object is queryable
      {
        // Send the query and create nodes from its result
        var leaves = o.query(q, d, root, this);

        for (var i = 0; i < leaves.length; i++) {
          this.getChildren(q, leaves[i], visited);
        }
      } else {// Query is non-trivial, and object is not trackable: nothing to do
      //var n = this.getObjectNode(Unknown.instance, o);
      //root.addChild(n);
    }
  }

}
/**
 * Abstract object representing a generic node in an and-or lineage graph.
 */


class TraceabilityNode {
  /**
   * A counter for traceability node IDs.
   */
  constructor() {
    /**
     * The node's unique ID
     */
    this.id = TraceabilityNode.TN_ID_COUNTER++;
    /**
     * The node's children
     */

    this.children = [];
  }
  /**
   * Gets the node'is unique ID.
   * @return The node's ID
   */


  getId() {
    return this.id;
  }
  /**
   * Adds a child to the node.
   * @return The node to add
   */


  addChild(n) {
    if (n == this) {
      return;
    }

    this.children.push(n);
  }
  /**
   * Gets the children of this node.
   * @return The list of children
   */


  getChildren() {
    return this.children;
  }

}
/**
 * An "and" node.
 * @extends TraceabilityNode
 */


_defineProperty(TraceabilityNode, "TN_ID_COUNTER", 0);

class AndNode extends TraceabilityNode {
  constructor() {
    super();
  }

  toString() {
    var indent = "";

    if (arguments.length == 1) {
      indent = arguments[0];
    }

    var s = "";
    s += indent + "^" + "\n";

    for (var i = 0; i < this.children.length; i++) {
      s += indent + this.children[i].toString(indent + " ");
    }

    return s;
  }

  addChild(n) {
    if (n instanceof AndNode) {
      for (var i = 0; i < n.children.length; i++) {
        this.children.push(n.children[i]);
      }
    } else {
      this.children.push(n);
    }
  }

}
/**
 * An "or" node.
 * @extends TraceabilityNode
 */


class OrNode extends TraceabilityNode {
  constructor() {
    super();
  }

  toString() {
    var indent = "";

    if (arguments.length == 1) {
      indent = arguments[0];
    }

    var s = "";
    s += indent + "v" + "\n";

    for (var i = 0; i < this.children.length; i++) {
      s += indent + this.children[i].toString(indent + " ");
    }

    return s;
  }

  addChild(n) {
    if (n instanceof OrNode) {
      for (var i = 0; i < n.children.length; i++) {
        this.children.push(n.children[i]);
      }
    } else {
      this.children.push(n);
    }
  }

}
/**
 * An "unknown" node.
 * @extends TraceabilityNode
 */


class UnknownNode extends TraceabilityNode {
  constructor() {
    super();
  }

  toString() {
    return "?";
  }

}
/**
 * An "object" node.
 * @extends TraceabilityNode
 */


class ObjectNode extends TraceabilityNode {
  /**
   * Creates a new object node.
   * @param {Designator|DesignatedObject} d The designator
   * @param {Object} o The object that is designated
   */
  constructor(d, o) {
    super();

    if (d instanceof DesignatedObject) {
      this.designatedObject = d;
    } else {
      this.designatedObject = new DesignatedObject(d, o);
    }
  }
  /**
   * Gets the designated object contained inside this node.
   */


  getDesignatedObject() {
    return this.designatedObject;
  }

  toString() {
    return this.designatedObject.toString();
  }

}
/**
 * Association between a designator, and object and an optional context.
 */


class DesignatedObject {
  /**
   * Creates a new designated object
   * @param designator The part of the object that is designated
   * @param object The object that is designated
   * @param context The object's context
   */
  constructor(designator, object, context) {
    /**
     * The part of the object that is designated.
     */
    this.designator = designator;
    /**
     * The object that is designated.
     */

    this.object = object;
    /**
     * The object's context.
     */

    if (arguments.length >= 3) {
      this.context = context;
    } else {
      this.context = [];
    }
  }
  /**
   * Retrieves the designator associated to an object.
   * @return The designator
   */


  getDesignator() {
    return this.designator;
  }
  /**
   * Retrieves the object that is being designated.
   * @return The object
   */


  getObject() {
    return this.object;
  }
  /**
   * Retrieves the object's context.
   * @return The context
   */


  getContext() {
    return this.context;
  }

  equals(cdo) {
    if (cdo == null || !(cdo instanceof DesignatedObject)) {
      return false;
    }

    return (this.object == null && cdo.object == null || this.object != null && (0,_util_mjs__WEBPACK_IMPORTED_MODULE_2__.same_object)(this.object, cdo.object)) && this.designator.equals(cdo.designator) && this.sameContext(cdo);
  }
  /**
   * Checks if two designated objects have the same context.
   * @param cdo The other designated object
   * @return <tt>true</tt> if the two objects have the same context,
   * <tt>false</tt> otherwise
   */


  sameContext(cdo) {
    if (this.context.length != cdo.context.length) {
      return false;
    }

    for (var i = 0; i < this.context.length; i++) {
      if (this.context[i] != cdo.context[i]) {
        return false;
      }
    }

    return true;
  }

  toString() {
    return this.designator.toString() + " of " + this.object.toString();
  }

}
/**
 * Front-end to explain the result of a calculation. This class provides a
 * static method called <tt>explain</tt> that can be used to produce a
 * lineage DAG from a {@link Value} returned by a function.
 */


class Explainer {
  constructor() {// Nothing to do
  }
  /**
   * Explains the result of a calculation produced by an
   * {@link AbstractFunction}.
   * @param v {Value} The value to explain
   * @param simplify Set to <tt>true</tt> to produce a simplified DAG
   * (default), <tt>false</tt> to get a full DAG
   */


  static explain(v, simplify = true) {
    var tracer = new Tracer();
    tracer.setSimplify(simplify);
    return tracer.getTree(null, _function_mjs__WEBPACK_IMPORTED_MODULE_1__.ReturnValue.instance, v);
  }

}
/**
 * Package exports
 */


 // :wrap=soft:tabSize=2:indentWidth=2:

/***/ }),

/***/ "./modules/util.mjs":
/*!**************************!*\
  !*** ./modules/util.mjs ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "map_contains": () => (/* binding */ map_contains),
/* harmony export */   "map_get": () => (/* binding */ map_get),
/* harmony export */   "map_put": () => (/* binding */ map_put),
/* harmony export */   "same_object": () => (/* binding */ same_object),
/* harmony export */   "set_contains": () => (/* binding */ set_contains),
/* harmony export */   "isHtmlElement": () => (/* binding */ isHtmlElement)
/* harmony export */ });
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

/**
 * Checks if two objects are equal. This is a surrogate to simulate the
 * behavior of Object.equals in Java. If the first object has an equals()
 * method, it is called; otherwise, standard equality between JavaScript
 * objects is used.
 * @param o1 The first object
 * @param o2 The second object
 * @return true if the two objects are equal, false otherwise
 */
function same_object(o1, o2) {
  if (o1 == null && o2 == null) {
    return true;
  }

  if (o1 == null && o2 != null || o1 != null && o2 == null) {
    return false;
  } // assert: o1 != null && o2 != null


  if (typeof o1.equals === "function") {
    // Two objects that implement equals
    return o1.equals(o2);
  }

  return o1 === o2;
}

function map_get(m, k) {
  for (const [key, value] of m) {
    if (key.equals(k)) {
      return value;
    }
  }

  return null;
}

function map_contains(m, k) {
  for (const [key] of m) {
    if (same_object(key, k)) {
      return true;
    }
  }

  return false;
}

function map_put(m, k, v) {
  for (const [key] of m) {
    if (same_object(key, k)) {
      m.set(key, v);
      return;
    }
  }

  m.set(k, v);
}

function set_contains(s, x) {
  for (var i = 0; i < s.length; i++) {
    if (same_object(s[i], x)) {
      return true;
    }
  }

  return false;
}

function isHtmlElement(obj) {
  if (typeof obj != 'object') {
    return false;
  }

  while (obj.constructor.name !== "" && obj.constructor.name !== "Object") {
    if ((obj.name || obj.constructor.name) === "HTMLElement") {
      return true;
    }

    obj = Object.getPrototypeOf(obj.constructor);
  }

  return false;
}
/**
 * Package exports
 */




/***/ }),

/***/ "./modules/value.mjs":
/*!***************************!*\
  !*** ./modules/value.mjs ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstantDesignator": () => (/* binding */ ConstantDesignator),
/* harmony export */   "ConstantValue": () => (/* binding */ ConstantValue),
/* harmony export */   "NaryValue": () => (/* binding */ NaryValue),
/* harmony export */   "Value": () => (/* binding */ Value)
/* harmony export */ });
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _tracer_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tracer.mjs */ "./modules/tracer.mjs");
/* harmony import */ var _verdict_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./verdict.mjs */ "./modules/verdict.mjs");
/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../index.mjs */ "./index.mjs");
/*
    A lineage library for DOM nodes
    MIT License

    Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
    Eckinox Média and Université du Québec à Chicoutimi

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/
// Local imports




/**
 * Object produced by the call(this) to a function, and whose lineage
 * can be computed.
 */

class Value {
  /*
  constructor() {
      // Nothing to do
  }
  */

  /**
   * Gets the concrete value carried by this Value object.
   * @return The value
   */
  getValue() {
    // To be overridden by descendants
    return null;
  }
  /**
   * Queries the provenance of a value.
   * @param type The type of lineage relationship
   * @param d A designator representing the part of the object that is the
   * subject of the query
   * @param root The node to which the rsults of the query should be appended
   * as children
   * @param A factory to produce traceability nodes
   * @return The list of terminal traceability nodes produced by this query
   */


  query(type, d, root, factory) {// To be overridden by descendants
  } // d is a deserializer and j is a JSON structure


  static deserialize(d, j) {
    const params = [];

    for (const serializedParam of j.contents) {
      if (typeof serializedParam == "object" && Object.keys(serializedParam).length == 2 && typeof serializedParam.name != "undefined" && typeof serializedParam.contents != "undefined") {
        params.push(d.deserialize(serializedParam));
      } else if (Array.isArray(serializedParam)) {
        for (var i = 0; i < serializedParam.length; i++) {
          if (typeof serializedParam[i] == "object" && Object.keys(serializedParam[i]).length == 2 && typeof serializedParam[i].name != "undefined" && typeof serializedParam[i].contents != "undefined") serializedParam[i] = d.deserialize(serializedParam[i]);
        }

        params.push(serializedParam);
      } else {
        params.push(serializedParam);
      }
    }

    return new this(...params);
  }

  toJson() {
    const serializedMembers = [];

    for (var member of this.members) {
      if (typeof member == "object" && Value.isPrototypeOf(member.constructor)) {
        serializedMembers.push(member.toJson());
      } else if (Array.isArray(member)) {
        for (var i = 0; i < member.length; i++) {
          if (typeof member[i] == "object" && Value.isPrototypeOf(member[i].constructor)) member[i] = member[i].toJson();
        }

        serializedMembers.push(member);
      } else {
        serializedMembers.push(member);
      }
    }

    return {
      "name": this.constructor.name,
      "contents": serializedMembers
    };
  }
  /**
   * Converts an arbitrary object into a {@link Value}.
   * @param o The object to convert. If o is a {@link Value}, it is returned as
   * is. Otherwise, o is converted into a {@link ConstantValue} that returns o.
   * @return The converted value
   */


  static lift(o) {
    if (o instanceof Value) {
      return o;
    }

    return new ConstantValue(o);
  }

  getStaticExplanation() {
    var list = [];
    var root = _tracer_mjs__WEBPACK_IMPORTED_MODULE_1__.Explainer.explain(this);
    _verdict_mjs__WEBPACK_IMPORTED_MODULE_2__.Verdict.pick(root, list);
    var tree = (0,_index_mjs__WEBPACK_IMPORTED_MODULE_3__.getTreeFromWitness)(list);
    var standardizedTree = tree.export(function (data) {
      return {
        elementAttribute: data.elementAttribute,
        part: data.part,
        subject: data.subject
      };
    });
    return standardizedTree;
  }

}
/**
 * Value that is linked to a list of other values. This class is the
 * ancestor used for values produced by most n-ary atomic functions.
 * @extends Value
 */


class NaryValue extends Value {
  /**
   * Creates a new instance of this value.
   * @param {Object} value The value to produce
   * @param {Array} values An array of {@link Value}s that are linked to
   * this value
   * @param {Array} positions An array of integers with the position of
   * each input value in the function's arguments
   */
  constructor(value, values = [], positions = []) {
    super();
    this.value = value;
    this.values = values;
    this.positions = positions;
  }

  getValue() {
    return this.value;
  }

}
/**
 * Special type of value that always returns the same constant.
 * @param o The constant to return
 * @extends Value
 */


class ConstantValue extends Value {
  constructor(o) {
    super();
    /**
     * The value represented by this constant
     */

    this.value = o;
    this.members = [o];
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(d, new ConstantDesignator());
    var n = factory.getObjectNode(new_d, this.value);
    root.addChild(n);
    leaves.push(n);
    return leaves;
  }

  getValue() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }

  equals(o) {
    if (o == null || !(o instanceof Value)) {
      return false;
    }

    return o.getValue() === this.value;
  }

}
/**
 * Atomic designator that points to the value of a constant.
 * @extends Designator
 */


class ConstantDesignator extends _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Designator {
  /*
  constructor() {
      super();
  }
  */
  toString() {
    return "Value";
  }

}
/**
 * Package exports
 */




/***/ }),

/***/ "./modules/verdict.mjs":
/*!*****************************!*\
  !*** ./modules/verdict.mjs ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TestCondition": () => (/* binding */ TestCondition),
/* harmony export */   "TestDriver": () => (/* binding */ TestDriver),
/* harmony export */   "TestResult": () => (/* binding */ TestResult),
/* harmony export */   "Verdict": () => (/* binding */ Verdict)
/* harmony export */ });
/* harmony import */ var _tracer_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tracer.mjs */ "./modules/tracer.mjs");
/* harmony import */ var _util_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.mjs */ "./modules/util.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/
// Local imports



class TestDriver {
  constructor() {
    this.conditions = [];

    if (arguments.length > 0) {
      this.conditions = arguments;
    }

    this.returnedValues = [];
  }
  /**
   * Adds a condition to evaluate
   */


  add() {
    this.conditions.push(...arguments);
  }

  evaluateAll(o) {
    this.returnedValues = [];

    for (var i = 0; i < this.conditions.length; i++) {
      var v = this.conditions[i].evaluate(o);
      this.returnedValues.push(v);
    }
  }

  getResult() {
    var verdicts = [];

    for (var i = 0; i < this.conditions.length; i++) {
      verdicts.push(new Verdict(this.returnedValues[i], this.conditions[i]));
    }

    return new TestResult(...verdicts);
  }

}

class TestCondition {
  constructor(name, f) {
    this.name = name;
    this.function = f;
  }

  getName() {
    return this.name;
  }
  /**
   * Evaluates a test condition on a web element.
   * @param e The web element on which to evaluate the test condition
   * @return {Verdict} The result of the evaluation of the condition
   */


  evaluate(e) {
    return this.function.evaluate(e);
  }

}

class Verdict {
  /**
   * Creates a new verdict.
   * @param v {Value} The return value of the test condition
   * @param c {TestCondition} The test condition that was evaluated
   */
  constructor(v, c) {
    this.value = v;
    this.condition = c;
  }

  getCondition() {
    return this.condition;
  }

  getValue() {
    return this.value;
  }

  getResult() {
    var o = this.value.getValue();

    if (!o) {
      return false;
    }

    return true;
  }

  getWitness() {
    var list = [];
    var root = _tracer_mjs__WEBPACK_IMPORTED_MODULE_0__.Explainer.explain(this.value);
    Verdict.pick(root, list);
    return list;
  }
  /**
   * Non-deterministically picks a set of objects that explain the verdict.
   * The method is recursive and works as follows:
   * <ul>
   * <li>If the current node is an And node, call pick on all its
   * children</li>
   * <li>If the current node is an Or node, call pick on one of its
   * children</li>
   * <li>If the current node is a leaf ObjectNode, add it to the list</li>
   * <li>Otherwise, call pick on all children of the node</li>
   * </ul>
   * Non-determinism occurs because of the handling of the Or node. By
   * construction, any set of elements produced by the method is one of the
   * clauses of the tree when put in disjunctive normal form.
   * @param n The current node
   * @param list A list to which nodes are added
   */


  static pick(n, list, visited = []) {
    if ((0,_util_mjs__WEBPACK_IMPORTED_MODULE_1__.set_contains)(visited, n)) {
      return;
    }

    visited.push(n);

    if (n instanceof _tracer_mjs__WEBPACK_IMPORTED_MODULE_0__.AndNode) {
      for (var i = 0; i < n.getChildren().length; i++) {
        Verdict.pick(n.getChildren()[i], list, visited);
      }
    } else if (n instanceof _tracer_mjs__WEBPACK_IMPORTED_MODULE_0__.OrNode) {
      var test = true;

      while (test) {
        Verdict.pick(n.getChildren()[i], list, visited);
        test = false;
      }
      /*
      for (let i = 0; i < n.getChildren().length; i++) {
      	Verdict.pick(n.getChildren()[i], list, visited);
      	break;
      }
      */

    } else if (n instanceof _tracer_mjs__WEBPACK_IMPORTED_MODULE_0__.ObjectNode) {
      if (n.getChildren().length === 0) {
        list.push(n.getDesignatedObject());
      } else {
        for (let i = 0; i < n.getChildren().length; i++) {
          Verdict.pick(n.getChildren()[i], list, visited);
        }
      }
    }
  }

}

class TestResult {
  constructor() {
    this.verdicts = arguments;
  }

  getVerdicts() {
    return this.verdicts;
  }

  getResult() {
    for (var i = 0; i < this.verdicts.length; i++) {
      if (!this.verdicts[i].getResult()) {
        return false;
      }
    }

    return true;
  }

}
/**
 * Package exports
 */


 // :wrap=soft:tabSize=2:indentWidth=2:

/***/ }),

/***/ "./modules/web-element.mjs":
/*!*********************************!*\
  !*** ./modules/web-element.mjs ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BackgroundColor": () => (/* binding */ BackgroundColor),
/* harmony export */   "BackgroundImage": () => (/* binding */ BackgroundImage),
/* harmony export */   "BorderColor": () => (/* binding */ BorderColor),
/* harmony export */   "BorderRadius": () => (/* binding */ BorderRadius),
/* harmony export */   "BorderStyle": () => (/* binding */ BorderStyle),
/* harmony export */   "BorderWidth": () => (/* binding */ BorderWidth),
/* harmony export */   "ClientOffsetTop": () => (/* binding */ ClientOffsetTop),
/* harmony export */   "ClientOffsetLeft": () => (/* binding */ ClientOffsetLeft),
/* harmony export */   "Color": () => (/* binding */ Color),
/* harmony export */   "CssPropertyFunction": () => (/* binding */ CssPropertyFunction),
/* harmony export */   "CssRecursivePropertyFunction": () => (/* binding */ CssRecursivePropertyFunction),
/* harmony export */   "CurrentNode": () => (/* binding */ CurrentNode),
/* harmony export */   "DimensionHeight": () => (/* binding */ DimensionHeight),
/* harmony export */   "DimensionWidth": () => (/* binding */ DimensionWidth),
/* harmony export */   "Display": () => (/* binding */ Display),
/* harmony export */   "ElementAttribute": () => (/* binding */ ElementAttribute),
/* harmony export */   "ElementAttributeValue": () => (/* binding */ ElementAttributeValue),
/* harmony export */   "FindBySelector": () => (/* binding */ FindBySelector),
/* harmony export */   "Float": () => (/* binding */ Float),
/* harmony export */   "FontFamily": () => (/* binding */ FontFamily),
/* harmony export */   "FontSize": () => (/* binding */ FontSize),
/* harmony export */   "FontWeight": () => (/* binding */ FontWeight),
/* harmony export */   "MarginTop": () => (/* binding */ MarginTop),
/* harmony export */   "MarginBottom": () => (/* binding */ MarginBottom),
/* harmony export */   "MarginRight": () => (/* binding */ MarginRight),
/* harmony export */   "MarginLeft": () => (/* binding */ MarginLeft),
/* harmony export */   "NodeWrapper": () => (/* binding */ NodeWrapper),
/* harmony export */   "Opacity": () => (/* binding */ Opacity),
/* harmony export */   "PageOffsetTop": () => (/* binding */ PageOffsetTop),
/* harmony export */   "PageOffsetLeft": () => (/* binding */ PageOffsetLeft),
/* harmony export */   "Path": () => (/* binding */ Path),
/* harmony export */   "PathValue": () => (/* binding */ PathValue),
/* harmony export */   "PaddingTop": () => (/* binding */ PaddingTop),
/* harmony export */   "PaddingBottom": () => (/* binding */ PaddingBottom),
/* harmony export */   "PaddingRight": () => (/* binding */ PaddingRight),
/* harmony export */   "PaddingLeft": () => (/* binding */ PaddingLeft),
/* harmony export */   "Position": () => (/* binding */ Position),
/* harmony export */   "RegisterBySelector": () => (/* binding */ RegisterBySelector),
/* harmony export */   "Visibility": () => (/* binding */ Visibility),
/* harmony export */   "WebElementFunction": () => (/* binding */ WebElementFunction),
/* harmony export */   "Zindex": () => (/* binding */ Zindex)
/* harmony export */ });
/* harmony import */ var _designator_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./designator.mjs */ "./modules/designator.mjs");
/* harmony import */ var _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./atomic-function.mjs */ "./modules/atomic-function.mjs");
/* harmony import */ var _value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./value.mjs */ "./modules/value.mjs");
/* harmony import */ var _enumerate_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enumerate.mjs */ "./modules/enumerate.mjs");
/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

/**
 * Imports
 */




/**
 *
 * @extends AtomicFunction
 */

class WebElementFunction extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AtomicFunction {
  constructor(name) {
    super(1);
    this.name = name;
  }

  compute() {
    var element = arguments[0].getValue();
    var val;

    if (element.isWrapper) {
      val = this.getWrapperValue(element);
    } else {
      val = this.get(element);
    }

    return new ElementAttributeValue(this.name, arguments[0], val);
  }

  get(e) {
    return null; // To be overridden by descendants
  } //this method help to get window object


  getOwnerWindow(element) {
    return element.ownerDocument.defaultView || element.ownerDocument.parentWindow;
  }

  getElementComputedStyle(element) {
    const window = this.getOwnerWindow(element);
    return window.getComputedStyle(element);
  }

  getWrapperValue(wrapper) {
    for (let i = 0; i < wrapper.propertyNames.length; i++) {
      if (wrapper.propertyNames[i] == this.name) {
        return wrapper.propertyValues[i];
      }
    }

    var node = document.evaluate(wrapper.path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return this.get(node);
  }

}
/**
 * Designator that points to the value of an attribute for some DOM node.
 * @extends Designator
 */


class ElementAttribute extends _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Designator {
  /**
   * Creates a ne instance of the designator.
   * @param name {String} The name of the attribute
   */
  constructor(name) {
    super();
    this.name = name;
  }

  toString() {
    return this.name;
  }

}
/**
 * The value of an attribute for some DOM node.
 * @extends Value
 */


class ElementAttributeValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  /**
   * Creates a new instance of the value.
   * @param name {String} The name of the attribute in the DOM node
   * @param input {Object|Value} The DOM node, or a value containing the
   * DOM node
   * @param v {Object|Value} The value of the attribute in the DOM node
   */
  constructor(name, input, v) {
    super();
    this.name = name;
    this.input = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(input);
    this.value = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(v);
  }

  getValue() {
    return this.value.getValue();
  }

  toString() {
    return this.value.getValue().toString();
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(new ElementAttribute(this.name), d);
    var n = factory.getObjectNode(new_d, this.input);
    leaves.push(...this.input.query(q, new_d, n, factory));
    root.addChild(n);
    return leaves;
  }

}
/**
 * value of css attribute
 * @extends WebElementFunction
 */


class CssPropertyFunction extends WebElementFunction {
  constructor(name, returnType = null) {
    if (["float", "int", "string", null].indexOf(returnType) == -1) {
      throw new Error(`CssPropertyFunction returnType expects one of the following values: "float", "int", "string", null. Received ${returnType} instead.`);
    }

    super(name);
    this.returnType = returnType;
  }

  get(element) {
    const style = this.getElementComputedStyle(element);
    const value = style.getPropertyValue(this.name);

    switch (this.returnType) {
      case "float":
        return parseFloat(value);

      case "int":
        return parseInt(value);

      case "string":
        return typeof value == "string" ? value : value.toString();
    }

    return value;
  }

}
/**
 * value of a css attribute, but in case the value is undefined or does not meet certain criteria, retrieve the value of the parent element
 * @extends WebElementFunction
 */


class CssRecursivePropertyFunction extends WebElementFunction {
  constructor(name, returnType = null, defaultValue = null) {
    if (["float", "int", "string", null].indexOf(returnType) == -1) {
      throw new Error(`CssPropertyFunction returnType expects one of the following values: "float", "int", "string", null. Received ${returnType} instead.`);
    }

    super(name);
    this.returnType = returnType;
    this.defaultValue = defaultValue;
  }

  get(element) {
    const value = this.getRecursive(element);

    switch (this.returnType) {
      case "float":
        return parseFloat(value);

      case "int":
        return parseInt(value);

      case "string":
        return typeof value == "string" ? value : value.toString();
    }

    return value;
  }

  getRecursive(element) {
    if (!element) return this.defaultValue;
    const style = this.getElementComputedStyle(element);
    const value = style.getPropertyValue(this.name);
    if (this.filter(value)) return this.getRecursive(element.parentElement);else return value;
  } //to be overridden by descendants to add additionnal filters depending on property


  filter(value) {
    return value == "";
  }

}
/**
 * Function that extracts the width of a DOM node.
 * @extends WebElementFunction
 */


class DimensionWidth extends WebElementFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super("width");
  }

  get(element) {
    return element.offsetWidth;
  }

}
/**
 * Function that extracts the height of a DOM node.
 * @extends WebElementFunction
 */


class DimensionHeight extends WebElementFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super("height");
  }

  get(element) {
    return element.offsetHeight;
  }

}
/** 
 * Function that extracts the offset from the top of the page of a DOM node.
 * @extends WebElementFunction
 */


class PageOffsetTop extends WebElementFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super("pageOffsetTop");
  }

  get(element) {
    return this.getOffsetTop(element);
  }

  getOffsetTop(element) {
    if (!element) return 0;
    return this.getOffsetTop(element.offsetParent) + element.offsetTop;
  }

}
/**
 * Function that extracts the offset from the left of the page of a DOM node.
 * @extends WebElementFunction
 */


class PageOffsetLeft extends WebElementFunction {
  /**
  * Creates a new instance of the function.
  */
  constructor() {
    super("pageOffsetLeft");
  }

  get(element) {
    return this.getOffsetLeft(element);
  }

  getOffsetLeft(element) {
    if (!element) return 0;
    return this.getOffsetLeft(element.offsetParent) + element.offsetLeft;
  }

}
/** 
 * Function that extracts the offset from the top of the viewport of a DOM node.
 * @extends WebElementFunction
 */


class ClientOffsetTop extends WebElementFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super("clientOffsetTop");
  }

  get(element) {
    return element.getBoundingClientRect().top;
  }

}
/** 
 * Function that extracts the offset from the left of the viewport of a DOM node.
 * @extends WebElementFunction
 */


class ClientOffsetLeft extends WebElementFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super("clientOffsetLeft");
  }

  get(element) {
    return element.getBoundingClientRect().left;
  }

}
/**
 * Function that extracts the font size.
 * @extends CssPropertyFunction
 */


class FontSize extends CssPropertyFunction {
  constructor() {
    super("font-size");
  }

}
/**
 * Function that extracts the font size.
 * @extends CssPropertyFunction
 */


class FontWeight extends CssPropertyFunction {
  constructor() {
    super("font-weight");
  }

}
/**
 * Function that extracts the font family
 * @extends CssPropertyFunction
 */


class FontFamily extends CssPropertyFunction {
  constructor() {
    super("font-family");
  }

}
/**
 * Function that extract the color of DOM element
 * @extends CssPropertyFunction
 */


class Color extends CssPropertyFunction {
  constructor() {
    super("color");
  }

}
/**
 * Function that extract the opacity
 * @extends CssPropertyFunction
 */


class Opacity extends CssPropertyFunction {
  constructor() {
    super("opacity", "float");
  }

}
/**
 * Function that extracts the background-color of a DOM.
 * @extends CssPropertyFunction
 */


class BackgroundColor extends CssRecursivePropertyFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super("background-color", null, "rgba(0, 0, 0, 0)");
  }

  filter(value) {
    return value == "" || value == "transparent" || value == "rgba(0, 0, 0, 0)";
  }

}
/**
 * Function that extract margin-top of a DOM
 * @extends CssPropertyFunction
 */


class MarginTop extends CssPropertyFunction {
  constructor() {
    super("margin-top", "float");
  }

}
/**
 * Function that extract margin-bottom of a DOM
 * @extends CssPropertyFunction
 */


class MarginBottom extends CssPropertyFunction {
  constructor() {
    super("margin-bottom");
  }

}
/**
 * Function that extract margin-left of a DOM
 * @extends CssPropertyFunction
 */


class MarginLeft extends CssPropertyFunction {
  constructor() {
    super("margin-left");
  }

}
/**
 * Function that extract margin-right of a DOM
 * @extends CssPropertyFunction
 */


class MarginRight extends CssPropertyFunction {
  constructor() {
    super("margin-right");
  }

}
/**
 * Function that extract paddig-top of a DOM
 * @extends CssPropertyFunction
 */


class PaddingTop extends CssPropertyFunction {
  constructor() {
    super("padding-top");
  }

}
/**
 * Function that extract paddig-bottom of a DOM
 * @extends CssPropertyFunction
 */


class PaddingBottom extends CssPropertyFunction {
  constructor() {
    super("padding-bottom");
  }

}
/**
 * Function that extract paddig-left of a DOM
 * @extends CssPropertyFunction
 */


class PaddingLeft extends CssPropertyFunction {
  constructor() {
    super("padding-left");
  }

}
/**
 * Function that extract paddig-right of a DOM
 * @extends CssPropertyFunction
 */


class PaddingRight extends CssPropertyFunction {
  constructor() {
    super("padding-right");
  }

}
/**
 * Function that extract border-width
 * @extends CssPropertyFunction
 */


class BorderWidth extends CssPropertyFunction {
  constructor() {
    super("border-width");
  }

}
/**
 * Function extract border-style of DOM element
 * @extends CssPropertyFunction
 */


class BorderStyle extends CssPropertyFunction {
  constructor() {
    super("border-style");
  }

}
/**
 * Function extrach border-color for DOM element
 * @extends CssPropertyFunction
 */


class BorderColor extends CssPropertyFunction {
  constructor() {
    super("border-color");
  }

}
/**
 * Function that extract border-radius
 * @extends CssPropertyFunction
 */


class BorderRadius extends CssPropertyFunction {
  constructor() {
    super("border-radius");
  }

}
/**
 * Function that extract display property of DOM element
 * @extends CssPropertyFunction
 */


class Display extends CssPropertyFunction {
  constructor() {
    super("display");
  }

}
/**
 * Function that extract visibility of DOM element
 * @extends CssPropertyFunction
 */


class Visibility extends CssPropertyFunction {
  constructor() {
    super("visibility");
  }

}
/**
 * Function that extract position of DOM element
 * @extends CssPropertyFunction
 */


class Position extends CssPropertyFunction {
  constructor() {
    super("position");
  }

}
/**
 * Function that extract flottant elemnt of DOM
 * @extends CssPropertyFunction
 */


class Float extends CssPropertyFunction {
  constructor() {
    super("float");
  }

}
/**
 * Function that extract flottant elemnt of DOM
 * @extends CssPropertyFunction
 */


class BackgroundImage extends CssPropertyFunction {
  constructor() {
    super("background-image");
  }

}
/**
 * Function that extract Z-index
 * @extends CssRecursivePropertyFunction
 */


class Zindex extends CssRecursivePropertyFunction {
  constructor() {
    super("z-index", "float", 0);
  }

  filter(value) {
    return value == "" || value == "auto";
  }

}
/**
 * Designator that points to an element in a DOM tree based on
 * an XPath expression.
 * @extends Designator
 */


class Path extends _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.Designator {
  /**
   * Creates a new instance of the designator.
   * @param path {String} A string containing an XPath expression
   */
  constructor(path) {
    super();
    this.path = path;
  }

  toString() {
    return this.path;
  }

}
/**
 * The value of the path
 * @extends Value
 */


class PathValue extends _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value {
  constructor(p, root, value) {
    super();
    this.value = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(value);
    this.root = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(root);
    this.path = p;
    this.members = [p, root, value];
  }

  query(q, d, root, factory) {
    var leaves = [];
    var new_d = _designator_mjs__WEBPACK_IMPORTED_MODULE_0__.CompoundDesignator.create(d.tail(), this.path);
    var n = factory.getObjectNode(new_d, this.root);
    leaves.push(...this.root.query(q, new_d, n, factory));
    root.addChild(n);
    return leaves;
  }

  getValue() {
    return this.value.getValue();
  }

  toString() {
    return this.value.toString();
  }

}
/**
 * Function that produces a list of elements that match a given CSS selector.
 * @extends Enumerate
 */


class FindBySelector extends _enumerate_mjs__WEBPACK_IMPORTED_MODULE_3__.Enumerate {
  /**
   * Creates a new instance of the function.
   * @param selector The CSS selector used to fetch elements
   */
  constructor(selector) {
    super();
    this.selector = selector;
    this.members = [selector];
  }

  evaluate() {
    if (arguments.length !== 1) {
      throw "Invalid number of arguments";
    }

    var v = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(arguments[0]);
    var root = v.getValue();
    var elm_list = root.querySelectorAll(this.selector);
    var val_list = [];
    var out_list = [];

    for (let i = 0; i < elm_list.length; i++) {
      var path = FindBySelector.getPathTo(elm_list[i]);
      var pv = new PathValue(new Path(path), root, elm_list[i]);
      val_list.push(pv);
    }

    for (let i = 0; i < val_list.length; i++) {
      out_list.push(new _enumerate_mjs__WEBPACK_IMPORTED_MODULE_3__.EnumeratedValue(i, val_list));
    }

    return new _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AtomicFunctionReturnValue(this, out_list, v);
  }

  static getPathTo(element) {
    if (element.id !== "") {
      return "id(\"" + element.id + "\")";
    }

    if (element.tagName === "BODY") {
      return "html/body";
    }

    var ix = 0;
    var siblings = element.parentNode.childNodes;

    for (let i = 0; i < siblings.length; i++) {
      var sibling = siblings[i];

      if (sibling === element) {
        return this.getPathTo(element.parentNode) + "/" + element.tagName.toLowerCase() + "[" + (ix + 1) + "]";
      }

      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
        ix++;
      }
    }
  }

}
/**
 * Wrapper that enclose the path to a DOM Node and register a number of CSS property values determined by the user.
 */


class NodeWrapper {
  /**
   * Creates a new instance of the wrapper.
   * @param element Reference to the DOM Node used to fetch values
   * @param path Xpath corresponding to element
   * @param properties The list of CSS properties to be registered
   */
  constructor(element, path, ...properties) {
    this.isWrapper = true;
    this.path = path;
    this.propertyNames = [];
    this.propertyValues = [];

    for (let i = 0; i < properties.length; i++) {
      this.propertyNames[i] = properties[i].name;
      this.propertyValues[i] = properties[i].get(element);
    }
  }

}
/**
 * Function that finds a DOM Node from the Xpath stored in a NodeWrapper
 * @extends AtomicFunction
 */


class CurrentNode extends _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AtomicFunction {
  /**
   * Creates a new instance of the function.
   */
  constructor() {
    super(1);
  }

  getValue() {
    var wrapper = arguments[0]; //wrapper = wrapper.inputList[wrapper.index].value.value;

    if (!wrapper.isWrapper) throw "CurrentNode : Invalid argument type";
    var node = document.evaluate(wrapper.path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    return node;
  }

}
/**
 * Function that produces a list of NodeWrapper from nodes that match a given CSS selector.
 * @extends Enumerate
 */


class RegisterBySelector extends _enumerate_mjs__WEBPACK_IMPORTED_MODULE_3__.Enumerate {
  /**
   * Creates a new instance of the function.
   * @param selector The CSS selector used to fetch elements
   * @param properties The list of CSS attributes to be registered in the wrappers
   */
  constructor(selector, ...properties) {
    super();
    this.selector = selector;
    this.properties = properties;
    this.members = [selector, properties];
  }

  evaluate() {
    if (arguments.length !== 1) {
      throw "Invalid number of arguments";
    }

    var v = _value_mjs__WEBPACK_IMPORTED_MODULE_2__.Value.lift(arguments[0]);
    var root = v.getValue();
    var elm_list = root.querySelectorAll(this.selector);
    var val_list = [];
    var out_list = [];

    for (let i = 0; i < elm_list.length; i++) {
      var path = FindBySelector.getPathTo(elm_list[i]);
      var wrapper = new NodeWrapper(elm_list[i], path, ...this.properties);
      var pv = new PathValue(new Path(path), root, wrapper);
      val_list.push(pv);
    }

    for (let i = 0; i < val_list.length; i++) {
      out_list.push(new _enumerate_mjs__WEBPACK_IMPORTED_MODULE_3__.EnumeratedValue(i, val_list));
    }

    return new _atomic_function_mjs__WEBPACK_IMPORTED_MODULE_1__.AtomicFunctionReturnValue(this, out_list, v);
  }

}
/**
 * Package exports
 */


 // :wrap=soft:tabSize=2:indentWidth=2:

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.mjs");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.umd.js.map