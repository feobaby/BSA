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

var _utils = require("../utils");

/**
 * @class Authenticate
 * @description authenticate tokens and roles
 * @exports Authenticate
 */
var Authenticate = /*#__PURE__*/function () {
  function Authenticate() {
    (0, _classCallCheck2["default"])(this, Authenticate);
  }

  (0, _createClass2["default"])(Authenticate, null, [{
    key: "verifyToken",
    value:
    /**
     * @param  {object} req - The user request object
     * @param  {object} res - The user res response object
     * @param  {function} next - The next() Function
     * @returns {String} req.userId - The user id
     */
    function () {
      var _verifyToken2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var authorization, token, decoded;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                authorization = req.headers.authorization;
                token = authorization.split(' ')[1];

                if (!(!token || token === '')) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  status: '401',
                  error: 'Access denied.'
                }));

              case 5:
                _context.next = 7;
                return (0, _utils.verifyToken)(token);

              case 7:
                decoded = _context.sent;

                if (decoded && decoded.userId) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  status: '401',
                  error: 'Access denied. We could not verify user.'
                }));

              case 10:
                req.user = decoded;
                return _context.abrupt("return", next());

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: '500',
                  error: 'Server error.'
                }));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 14]]);
      }));

      function verifyToken(_x, _x2, _x3) {
        return _verifyToken2.apply(this, arguments);
      }

      return verifyToken;
    }()
  }]);
  return Authenticate;
}();

exports["default"] = Authenticate;
//# sourceMappingURL=authenticate.js.map