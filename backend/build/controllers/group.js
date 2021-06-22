"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = _interopRequireDefault(require("../models"));

var _require = require('sequelize'),
    Op = _require.Op;

var Groups = _models["default"].Groups,
    Users = _models["default"].Users,
    Transactions = _models["default"].Transactions;
/**
 * @class GroupsController
 * @description Controllers for Groups
 * @exports GroupsController
 */

var GroupsController = /*#__PURE__*/function () {
  function GroupsController() {
    (0, _classCallCheck2["default"])(this, GroupsController);
  }

  (0, _createClass2["default"])(GroupsController, null, [{
    key: "createGroup",
    value:
    /**
     * @method createGroup
     * @description Method for user create account
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} Returns body object
     */
    function () {
      var _createGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, name, category, emails, description, goalBalance, userId, result;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, name = _req$body.name, category = _req$body.category, emails = _req$body.emails, description = _req$body.description, goalBalance = _req$body.goalBalance;
                userId = req.user.userId;
                _context.prev = 2;
                _context.next = 5;
                return Groups.create({
                  userId: userId,
                  name: name,
                  category: category,
                  emails: emails,
                  description: description,
                  goalBalance: goalBalance
                });

              case 5:
                result = _context.sent;
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'Successful!',
                  data: result
                }));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 9]]);
      }));

      function createGroup(_x, _x2) {
        return _createGroup.apply(this, arguments);
      }

      return createGroup;
    }()
    /**
     * @method getAllGroups
     * @description Method for user create groups
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} Returns body object
     */

  }, {
    key: "getAllGroups",
    value: function () {
      var _getAllGroups = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return Groups.findAndCountAll({
                  where: {
                    userId: req.user.userId
                  },
                  order: [['createdAt', 'DESC']]
                });

              case 3:
                data = _context2.sent;

                if (!(data.length === 0)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'It seems like no groups have been created.'
                }));

              case 6:
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successful!',
                  data: data
                }));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function getAllGroups(_x3, _x4) {
        return _getAllGroups.apply(this, arguments);
      }

      return getAllGroups;
    }()
    /**
     * @method getAGroup
     * @description Method for user create a group
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} Returns body object
     */

  }, {
    key: "getAGroup",
    value: function () {
      var _getAGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var id, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                _context3.prev = 1;
                _context3.next = 4;
                return Groups.findByPk(id);

              case 4:
                result = _context3.sent;

                if (result) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'Group not found!'
                }));

              case 7:
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successful!',
                  data: result
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }));

      function getAGroup(_x5, _x6) {
        return _getAGroup.apply(this, arguments);
      }

      return getAGroup;
    }()
    /**
     * @method getAGroupYouArePartOf
     * @description Method for user get a part of group
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} Returns body object
     */

  }, {
    key: "getAGroupYouArePartOf",
    value: function () {
      var _getAGroupYouArePartOf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var email, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                email = req.query.email;
                _context4.prev = 1;
                _context4.next = 4;
                return Groups.findAndCountAll({
                  where: {
                    emails: (0, _defineProperty2["default"])({}, Op.contains, [email])
                  }
                });

              case 4:
                result = _context4.sent;

                if (result) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'It seems you are not part of any group!'
                }));

              case 7:
                return _context4.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successful!',
                  data: result
                }));

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 10]]);
      }));

      function getAGroupYouArePartOf(_x7, _x8) {
        return _getAGroupYouArePartOf.apply(this, arguments);
      }

      return getAGroupYouArePartOf;
    }()
    /**
     * @method updateAGroup
     * @description Method for user update a group
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} Returns body object
     */

  }, {
    key: "updateAGroup",
    value: function () {
      var _updateAGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, userId, _req$body2, name, category, emails, goalBalance, result;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;
                userId = req.user.userId;
                _req$body2 = req.body, name = _req$body2.name, category = _req$body2.category, emails = _req$body2.emails, goalBalance = _req$body2.goalBalance;
                _context5.prev = 3;
                _context5.next = 6;
                return Groups.findByPk(id);

              case 6:
                result = _context5.sent;

                if (result) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'Group not found!'
                }));

              case 9:
                if (!(result.userId !== userId)) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt("return", res.status(401).json({
                  status: 401,
                  error: 'Access denied'
                }));

              case 11:
                _context5.next = 13;
                return Groups.update({
                  name: name,
                  category: category,
                  emails: emails,
                  goalBalance: goalBalance
                }, {
                  where: {
                    id: id
                  }
                });

              case 13:
                return _context5.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successful!',
                  data: {
                    name: name,
                    category: category,
                    emails: emails,
                    goalBalance: goalBalance
                  }
                }));

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](3);
                return _context5.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[3, 16]]);
      }));

      function updateAGroup(_x9, _x10) {
        return _updateAGroup.apply(this, arguments);
      }

      return updateAGroup;
    }()
    /**
     * @method depositMoneyToGroup
     * @description Method for user to deposit money to a group
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} Returns body object
     */

  }, {
    key: "depositMoneyToGroup",
    value: function () {
      var _depositMoneyToGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var _req$body3, goalBalance, groupBalance, amount, balance, id, userId, addToBalance, checkRemainingBalance, newBalance;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _req$body3 = req.body, goalBalance = _req$body3.goalBalance, groupBalance = _req$body3.groupBalance, amount = _req$body3.amount, balance = _req$body3.balance;
                id = req.params.id;
                userId = req.user.userId; // calculate the group's balance after depositing an amount

                addToBalance = parseFloat(groupBalance + amount); // calculate the group's balance against the group's goal balance

                checkRemainingBalance = parseFloat(goalBalance - groupBalance); // calculate the user's remaining money in his/her account after depositing money to a group

                newBalance = parseFloat(balance - amount); // if the amount you want to depost exceeds your personal balance

                if (!parseFloat(amount > balance)) {
                  _context6.next = 9;
                  break;
                }

                return _context6.abrupt("return", res.status(400).json({
                  status: 400,
                  error: 'Lol, you do not have enough money now.'
                }));

              case 9:
                if (!(amount > goalBalance)) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt("return", res.status(400).json({
                  status: 400,
                  error: 'The amount you wish to add exceeds the group set amount.'
                }));

              case 11:
                if (!(goalBalance === groupBalance)) {
                  _context6.next = 13;
                  break;
                }

                return _context6.abrupt("return", res.status(400).json({
                  status: 400,
                  error: 'Nah! You can not add any more money.'
                }));

              case 13:
                if (!(amount > checkRemainingBalance)) {
                  _context6.next = 15;
                  break;
                }

                return _context6.abrupt("return", res.status(400).json({
                  status: 400,
                  error: 'Hey, stop trying to add more money than you should.'
                }));

              case 15:
                _context6.next = 17;
                return Transactions.create({
                  userId: userId,
                  amount: amount
                });

              case 17:
                _context6.next = 19;
                return Groups.update({
                  groupBalance: addToBalance
                }, {
                  where: {
                    id: id
                  }
                });

              case 19:
                _context6.next = 21;
                return Users.update({
                  balance: newBalance
                }, {
                  where: {
                    id: userId
                  }
                });

              case 21:
                return _context6.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Successful!'
                }));

              case 24:
                _context6.prev = 24;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 27:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 24]]);
      }));

      function depositMoneyToGroup(_x11, _x12) {
        return _depositMoneyToGroup.apply(this, arguments);
      }

      return depositMoneyToGroup;
    }()
    /**
     * @method deleteAGroup
     * @description Method for user delete a group
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} Returns body object
     */

  }, {
    key: "deleteAGroup",
    value: function () {
      var _deleteAGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var id, userId, result;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                id = req.params.id;
                userId = req.user.userId;
                _context7.prev = 2;
                _context7.next = 5;
                return Groups.findOne({
                  where: {
                    id: id,
                    userId: userId
                  }
                });

              case 5:
                result = _context7.sent;

                if (result) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'Group not found!'
                }));

              case 8:
                _context7.next = 10;
                return Groups.destroy({
                  where: {
                    id: id,
                    userId: userId
                  }
                });

              case 10:
                return _context7.abrupt("return", res.status(204).json({
                  status: 204
                }));

              case 13:
                _context7.prev = 13;
                _context7.t0 = _context7["catch"](2);
                return _context7.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'Oops, there\'s an error!'
                }));

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2, 13]]);
      }));

      function deleteAGroup(_x13, _x14) {
        return _deleteAGroup.apply(this, arguments);
      }

      return deleteAGroup;
    }()
  }]);
  return GroupsController;
}();

exports["default"] = GroupsController;
//# sourceMappingURL=group.js.map