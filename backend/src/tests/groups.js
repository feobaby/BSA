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
describe('Test for groups', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });
  afterEach(() => sinon.restore());
  after(() => request.close());
  describe('Groups test', () => {
    it('it should return 201 when a user tries create a group', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .post('/api/v1/create-group')
            .set('Authorization', token)
            .send({
              name: 'Movers',
              category: 'Functions',
              emails: ['ufuoma@gmail.com', 'francis@gmail.com'],
              description: 'let us go somewhere.',
              goalBalance: '1000',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(201);
              done();
            });
        });
    });
    it('it should return 200 when a user tries get all groups', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .get('/api/v1/groups')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              done();
            });
        });
    });
    it('it should return 200 when a user tries get a group', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .get('/api/v1/group/44ccf572-44bd-405d-90a6-3c9e6c937ce1')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              done();
            });
        });
    });
    it('it should return 200 when a user tries to update a group', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .patch('/api/v1/group/44ccf572-44bd-405d-90a6-3c9e6c937ce1')
            .set('Authorization', token)
            .send({
              name: 'Movers',
              category: 'Functions',
              emails: ['ufuoma@gmail.com', 'francis@gmail.com'],
              description: 'let us go somewhere.',
              goalBalance: '2000',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              done();
            });
        });
    });
    it('it should return 200 when a user tries to get groups they are part of', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .get('/api/v1/group?email=francis@gmail.com')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              done();
            });
        });
    });
    it('it should return 200 when a user tries to deposit money to group', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .patch('/api/v1/group/add-money/44ccf572-44bd-405d-90a6-3c9e6c937ce1')
            .set('Authorization', token)
            .send({
              balance: 5000.00,
              goalBalance: 2000.00,
              groupBalance: 700.00,
              amount: 400.00,
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              done();
            });
        });
    });
    it('it should return 204 when a user tries to delete a group', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai.request(app)
            .delete('/api/v1/group/44ccf572-44bd-405d-90a6-3c9e6c937ce1')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(204);
              done();
            });
        });
    });
  });
});
