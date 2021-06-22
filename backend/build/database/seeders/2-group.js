"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.bulkInsert('Groups', [{
                id: '44ccf572-44bd-405d-90a6-3c9e6c937ce1',
                userId: '98e0350f-ed09-46b0-83d7-8a135afeaf84',
                emails: ['francis@gmail.com', 'ufuoma@gmail.com'],
                name: 'Money Shakers',
                category: 'Functions',
                goalBalance: 1000,
                description: 'Let us gather money to start a birthday bash.',
                createdAt: new Date(),
                updatedAt: new Date()
              }, {
                id: '4bfb6bb8-403e-4f68-a975-46b3e445508a',
                userId: 'fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb',
                emails: ['francis@gmail.com', 'ufuoma@gmail.com'],
                name: 'Loyal Watchers',
                category: 'Movies',
                goalBalance: 2000,
                description: 'Let us watch MechaGodzilla',
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
//# sourceMappingURL=2-group.js.map