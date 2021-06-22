"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

/**
 * @class Helper
 * @description helper file
 * @exports Helper
 */
var Helper = /*#__PURE__*/function () {
  function Helper() {
    (0, _classCallCheck2["default"])(this, Helper);
  }

  (0, _createClass2["default"])(Helper, null, [{
    key: "hashPassword",
    value:
    /**
     * Hash Password Method
     * @param {string} password
     * @returns {string} returns hashed password
     */
    function hashPassword(password) {
      return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(8));
    }
    /**
     * comparePassword
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Boolean} return True or False
     */

  }, {
    key: "comparePassword",
    value: function comparePassword(hashPassword, password) {
      return _bcryptjs["default"].compareSync(password, hashPassword);
    }
  }]);
  return Helper;
}();

exports["default"] = Helper;
//# sourceMappingURL=bcrypt.js.map