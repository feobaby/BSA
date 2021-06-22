"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _dotenv = require("dotenv");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv/config");

(0, _dotenv.config)();
var secretKey = process.env.SECRET;
/**
 * @class Jwt
 * @description class for token generation and verification
 * @exports Jwt
 */

var Jwt = /*#__PURE__*/function () {
  function Jwt() {
    (0, _classCallCheck2["default"])(this, Jwt);
  }

  (0, _createClass2["default"])(Jwt, null, [{
    key: "generateToken",
    value:
    /**
     * @method generateToken
     * @description Method to generate new token
     * @param {object} payload - The data used to generate the token
     * @param {string} secret - The secret key used to generate the token
     * @returns {string} the generated token
     */
    function () {
      var _generateToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
        var secret,
            token,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                secret = _args.length > 1 && _args[1] !== undefined ? _args[1] : secretKey;
                _context.next = 3;
                return _jsonwebtoken["default"].sign(payload, secret, {
                  expiresIn: '1d'
                });

              case 3:
                token = _context.sent;
                return _context.abrupt("return", token);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function generateToken(_x) {
        return _generateToken.apply(this, arguments);
      }

      return generateToken;
    }()
    /**
     * @method verifyToken
     * @description Method to decode the token
     * @param {string} token - The token to be verified
     * @param {string} secret - The secret key used to generate the token
     * @returns {object} the payload decoded from the token
     */

  }, {
    key: "verifyToken",
    value: function () {
      var _verifyToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(token) {
        var secret,
            decoded,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                secret = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : secretKey;
                _context2.next = 3;
                return _jsonwebtoken["default"].verify(token, secret);

              case 3:
                decoded = _context2.sent;
                return _context2.abrupt("return", decoded);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function verifyToken(_x2) {
        return _verifyToken.apply(this, arguments);
      }

      return verifyToken;
    }()
  }]);
  return Jwt;
}();

exports["default"] = Jwt;
//# sourceMappingURL=jwt.js.map