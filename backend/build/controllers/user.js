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

var _models = _interopRequireDefault(require("../models"));

var _index = require("../utils/index");

var _bcrypt = _interopRequireDefault(require("../utils/bcrypt"));

var Users = _models["default"].Users,
    Transactions = _models["default"].Transactions;
var hashPassword = _bcrypt["default"].hashPassword;
/**
 * @class UserController
 * @description Controllers for Users
 * @exports UsersController
 */

var UsersController = /*#__PURE__*/function () {
  function UsersController() {
    (0, _classCallCheck2["default"])(this, UsersController);
  }

  (0, _createClass2["default"])(UsersController, null, [{
    key: "createUser",
    value:
    /**
     * @method createUser
     * @description Method for user registration
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} Returns body object
     */
    function () {
      var _createUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var email, user, result, userId, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = req.body.email;
                _context.prev = 1;
                _context.next = 4;
                return hashPassword(req.body.password);

              case 4:
                req.body.password = _context.sent;
                _context.next = 7;
                return Users.findOne({
                  where: {
                    email: email
                  }
                });

              case 7:
                user = _context.sent;

                if (!user) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", res.status(409).json({
                  status: 409,
                  error: 'This email exists already.'
                }));

              case 10:
                _context.next = 12;
                return Users.create(req.body);

              case 12:
                result = _context.sent;
                userId = result.id;
                _context.next = 16;
                return (0, _index.generateToken)({
                  userId: userId
                });

              case 16:
                token = _context.sent;
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'Successful!',
                  data: result,
                  token: token
                }));

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 20]]);
      }));

      function createUser(_x, _x2) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
    /**
     * @method signInUser
     * @description Method for user sign in
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} response body object
     */

  }, {
    key: "signInUser",
    value: function () {
      var _signInUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body, email, password, user, isPasswordValid, userId, token;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password;
                _context2.prev = 1;
                _context2.next = 4;
                return Users.findOne({
                  where: {
                    email: email
                  }
                });

              case 4:
                user = _context2.sent;

                if (user) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(401).json({
                  status: 401,
                  error: 'Unauthorised email, sorry.'
                }));

              case 7:
                _context2.next = 9;
                return _bcrypt["default"].comparePassword(user.password, password);

              case 9:
                isPasswordValid = _context2.sent;

                if (isPasswordValid) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", res.status(401).json({
                  status: 401,
                  error: 'Unauthorised password, sorry.'
                }));

              case 12:
                userId = user.id;
                _context2.next = 15;
                return (0, _index.generateToken)({
                  userId: userId
                });

              case 15:
                token = _context2.sent;
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  userId: userId,
                  token: token
                }));

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 19]]);
      }));

      function signInUser(_x3, _x4) {
        return _signInUser.apply(this, arguments);
      }

      return signInUser;
    }()
    /**
     * @method getAnAccount
     * @description Method for user to get an account
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} Returns body object
     */

  }, {
    key: "getAnAccount",
    value: function () {
      var _getAnAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var userId, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userId = req.user.userId;
                _context3.prev = 1;
                _context3.next = 4;
                return Users.findOne({
                  where: {
                    id: userId
                  }
                });

              case 4:
                result = _context3.sent;
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successful!',
                  data: result
                }));

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 8]]);
      }));

      function getAnAccount(_x5, _x6) {
        return _getAnAccount.apply(this, arguments);
      }

      return getAnAccount;
    }()
    /**
     * @method updateAnAccount
     * @description Method for user to update an account
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} Returns body object
     */

  }, {
    key: "updateAnAccount",
    value: function () {
      var _updateAnAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var userId, _req$body2, firstName, lastName, balance;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userId = req.user.userId;
                _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, balance = _req$body2.balance;
                _context4.prev = 2;
                _context4.next = 5;
                return Users.findOne({
                  where: {
                    id: userId
                  }
                });

              case 5:
                _context4.next = 7;
                return Users.update({
                  firstName: firstName,
                  lastName: lastName,
                  balance: balance
                }, {
                  where: {
                    id: userId
                  }
                });

              case 7:
                return _context4.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successful!',
                  data: {
                    firstName: firstName,
                    lastName: lastName,
                    balance: balance
                  }
                }));

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](2);
                return _context4.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 10]]);
      }));

      function updateAnAccount(_x7, _x8) {
        return _updateAnAccount.apply(this, arguments);
      }

      return updateAnAccount;
    }()
    /**
     * @method addMoney
     * @description Method for user to add money
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} Returns body object
     */

  }, {
    key: "addMoney",
    value: function () {
      var _addMoney = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var _req$body3, balance, amount, userId, addToBalance;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _req$body3 = req.body, balance = _req$body3.balance, amount = _req$body3.amount;
                userId = req.user.userId;
                addToBalance = parseFloat(balance + amount);
                _context5.prev = 3;
                _context5.next = 6;
                return Transactions.create({
                  userId: userId,
                  amount: amount
                });

              case 6:
                _context5.next = 8;
                return Users.update({
                  balance: addToBalance
                }, {
                  where: {
                    id: userId
                  }
                });

              case 8:
                return _context5.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successful!',
                  data: {
                    newbalance: addToBalance
                  }
                }));

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](3);
                return _context5.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[3, 11]]);
      }));

      function addMoney(_x9, _x10) {
        return _addMoney.apply(this, arguments);
      }

      return addMoney;
    }()
    /**
     * @method getHistory
     * @description Method for user to get transaction logs
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} Returns body object
     */

  }, {
    key: "getHistory",
    value: function () {
      var _getHistory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var userId, result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                userId = req.user.userId;
                _context6.prev = 1;
                _context6.next = 4;
                return Transactions.findAll({
                  where: {
                    userId: userId
                  },
                  order: [['createdAt', 'DESC']]
                });

              case 4:
                result = _context6.sent;

                if (result) {
                  _context6.next = 7;
                  break;
                }

                return _context6.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'You currently have no transaction logs!'
                }));

              case 7:
                return _context6.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successful!',
                  data: result
                }));

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](1);
                return _context6.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 10]]);
      }));

      function getHistory(_x11, _x12) {
        return _getHistory.apply(this, arguments);
      }

      return getHistory;
    }()
  }]);
  return UsersController;
}();

exports["default"] = UsersController;
//# sourceMappingURL=user.js.map