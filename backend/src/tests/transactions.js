import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

const login = {
  email: 'francis@gmail.com',
  password: '12345',
};
chai.use(sinonChai);

let request;
describe('Test for transactions', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });
  afterEach(() => sinon.restore());
  after(() => request.close());
  describe('Groups test', () => {
    it('it should return 200 when a user gets the transaction logs', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .get('/api/v1/history')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              done();
            });
        });
    });
  });
});
