"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _sinon = _interopRequireDefault(require("sinon"));

var _sinonChai = _interopRequireDefault(require("sinon-chai"));

var _app = _interopRequireDefault(require("../app"));

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var login = {
  email: 'francis@gmail.com',
  password: '12345'
};

_chai["default"].use(_sinonChai["default"]);

var request;
describe('Test for transactions', function () {
  before( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request = _chai["default"].request(_app["default"]).keepOpen();

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterEach(function () {
    return _sinon["default"].restore();
  });
  after(function () {
    return request.close();
  });
  describe('Groups test', function () {
    it('it should return 200 when a user gets the transaction logs', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(login).end(function (logError, logResponse) {
        var token = "Bearer ".concat(logResponse.body.token);

        _chai["default"].request(_app["default"]).get('/api/v1/history').set('Authorization', token).end(function (err, res) {
          expect(res.status).to.be.equal(200);
          done();
        });
      });
    });
  });
});
//# sourceMappingURL=transactions.js.map