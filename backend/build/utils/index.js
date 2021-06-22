"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "hashPassword", {
  enumerable: true,
  get: function get() {
    return _bcrypt["default"];
  }
});
exports.generateToken = exports.verifyToken = void 0;

var _bcrypt = _interopRequireDefault(require("./bcrypt"));

var _jwt = _interopRequireDefault(require("./jwt"));

var verifyToken = _jwt["default"].verifyToken,
    generateToken = _jwt["default"].generateToken;
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
//# sourceMappingURL=index.js.map