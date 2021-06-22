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
describe('Test for groups', function () {
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
    it('it should return 201 when a user tries create a group', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(login).end(function (logError, logResponse) {
        var token = "Bearer ".concat(logResponse.body.token);

        _chai["default"].request(_app["default"]).post('/api/v1/create-group').set('Authorization', token).send({
          name: 'Movers',
          category: 'Functions',
          emails: ['ufuoma@gmail.com', 'francis@gmail.com'],
          description: 'let us go somewhere.',
          goalBalance: '1000'
        }).end(function (err, res) {
          expect(res.status).to.be.equal(201);
          done();
        });
      });
    });
    it('it should return 200 when a user tries get all groups', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(login).end(function (logError, logResponse) {
        var token = "Bearer ".concat(logResponse.body.token);

        _chai["default"].request(_app["default"]).get('/api/v1/groups').set('Authorization', token).end(function (err, res) {
          expect(res.status).to.be.equal(200);
          done();
        });
      });
    });
    it('it should return 200 when a user tries get a group', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(login).end(function (logError, logResponse) {
        var token = "Bearer ".concat(logResponse.body.token);

        _chai["default"].request(_app["default"]).get('/api/v1/group/44ccf572-44bd-405d-90a6-3c9e6c937ce1').set('Authorization', token).end(function (err, res) {
          expect(res.status).to.be.equal(200);
          done();
        });
      });
    });
    it('it should return 200 when a user tries to update a group', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(login).end(function (logError, logResponse) {
        var token = "Bearer ".concat(logResponse.body.token);

        _chai["default"].request(_app["default"]).patch('/api/v1/group/44ccf572-44bd-405d-90a6-3c9e6c937ce1').set('Authorization', token).send({
          name: 'Movers',
          category: 'Functions',
          emails: ['ufuoma@gmail.com', 'francis@gmail.com'],
          description: 'let us go somewhere.',
          goalBalance: '2000'
        }).end(function (err, res) {
          expect(res.status).to.be.equal(200);
          done();
        });
      });
    });
    it('it should return 200 when a user tries to get groups they are part of', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(login).end(function (logError, logResponse) {
        var token = "Bearer ".concat(logResponse.body.token);

        _chai["default"].request(_app["default"]).get('/api/v1/group?email=francis@gmail.com').set('Authorization', token).end(function (err, res) {
          expect(res.status).to.be.equal(200);
          done();
        });
      });
    });
    it('it should return 200 when a user tries to deposit money to group', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(login).end(function (logError, logResponse) {
        var token = "Bearer ".concat(logResponse.body.token);

        _chai["default"].request(_app["default"]).patch('/api/v1/group/add-money/44ccf572-44bd-405d-90a6-3c9e6c937ce1').set('Authorization', token).send({
          balance: 5000.00,
          goalBalance: 2000.00,
          groupBalance: 700.00,
          amount: 400.00
        }).end(function (err, res) {
          expect(res.status).to.be.equal(200);
          done();
        });
      });
    });
    it('it should return 204 when a user tries to delete a group', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(login).end(function (logError, logResponse) {
        var token = "Bearer ".concat(logResponse.body.token);

        _chai["default"].request(_app["default"])["delete"]('/api/v1/group/44ccf572-44bd-405d-90a6-3c9e6c937ce1').set('Authorization', token).end(function (err, res) {
          expect(res.status).to.be.equal(204);
          done();
        });
      });
    });
  });
});
//# sourceMappingURL=groups.js.map