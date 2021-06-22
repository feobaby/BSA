"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _sinon = _interopRequireDefault(require("sinon"));

var _sinonChai = _interopRequireDefault(require("sinon-chai"));

var _faker = _interopRequireDefault(require("faker"));

var _app = _interopRequireDefault(require("../app"));

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var login = {
  email: 'francis@gmail.com',
  password: '12345'
};

_chai["default"].use(_sinonChai["default"]);

describe('Users test', function () {
  it('it should return 201 when a user tries to sign up', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/user').send({
      firstName: 'Dele',
      lastName: 'Adeola',
      email: _faker["default"].internet.email(),
      password: 'dele'
    }).end(function (err, res) {
      expect(res.status).to.be.equal(201);
      done();
    });
  });
  it('it should return 409 for duplicate email', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/user').send({
      firstName: 'Dele',
      lastName: 'Adeola',
      email: 'francis@gmail.com',
      password: 'dele'
    }).end(function (err, res) {
      expect(res.status).to.be.equal(409);
      done();
    });
  });
  it('it should return 200 for user sign in', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'francis@gmail.com',
      password: '12345'
    }).end(function (err, res) {
      expect(res.status).to.be.equal(200);
      done();
    });
  });
  it('it should return 401 for wrong password', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'francis@gmail.com',
      password: '12345678'
    }).end(function (err, res) {
      expect(res.status).to.be.equal(401);
      done();
    });
  });
});
var request;
describe('Test for users apis that requires token', function () {
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
  describe('Users test', function () {
    it('should return 200 is user can view account', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(login).end(function (logError, logResponse) {
        var token = "Bearer ".concat(logResponse.body.token);

        _chai["default"].request(_app["default"]).get('/api/v1/account').set('Authorization', token).end(function (err, res) {
          expect(res.status).to.be.equal(200);
          expect(res).to.have.status('200');
          done();
        });
      });
    });
    it('should return 200 for user to update account', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(login).end(function (logError, logResponse) {
        var token = "Bearer ".concat(logResponse.body.token);

        _chai["default"].request(_app["default"]).patch('/api/v1/account').set('Authorization', token).send({
          firstName: 'Frances',
          lastName: 'Xavion'
        }).end(function (err, res) {
          expect(res.status).to.be.equal(200);
          expect(res).to.have.status('200');
          done();
        });
      });
    });
    it('should return 200 for user to add money to account', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(login).end(function (logError, logResponse) {
        var token = "Bearer ".concat(logResponse.body.token);

        _chai["default"].request(_app["default"]).patch('/api/v1/add-money').set('Authorization', token).send({
          amount: 5000.00,
          balance: 0
        }).end(function (err, res) {
          expect(res.status).to.be.equal(200);
          expect(res).to.have.status('200');
          done();
        });
      });
    });
  });
});
//# sourceMappingURL=users.js.map