"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var password = '12345';

var hash = _bcryptjs["default"].hashSync(password, 10);

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.bulkInsert('Users', [{
                id: '98e0350f-ed09-46b0-83d7-8a135afeaf84',
                email: 'francis@gmail.com',
                password: hash,
                firstName: 'Francis',
                lastName: 'Xavier',
                role: 'User',
                balance: 0,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                id: 'fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb',
                email: 'ufuoma@gmail.com',
                password: hash,
                firstName: 'Ufuoma',
                lastName: 'lewis',
                role: 'User',
                balance: 0,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                id: 'fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25',
                email: 'fiyin@gmail.com',
                password: hash,
                firstName: 'Fiyin',
                lastName: 'Johnson',
                role: 'User',
                balance: 0,
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                id: '1fee886c-f0ff-4964-8353-56af78fc6499',
                email: 'dele@gmail.com',
                password: hash,
                firstName: 'Dele',
                lastName: 'Adeleke',
                role: 'User',
                balance: 0,
                createdAt: new Date(),
                updatedAt: new Date()
              }], {});

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function down(_x3, _x4) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};
//# sourceMappingURL=1-user.js.map