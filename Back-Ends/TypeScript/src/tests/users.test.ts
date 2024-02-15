import HttpStatus from 'http-status-codes';
import request from 'supertest';
import app from "../index";

let server: any;

beforeAll((done) => {
  server = app.listen(3000, () => {
    console.log('Server is running on PORT:3000');
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log('Server is closed');
    done();
  });
});

describe('User Sign Up', () => {

  beforeAll((done) => {
    request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'funmi',
        lastName: 'olaiya',
        email: 'fola@gmail.com',
        password: 'ddrsfr'
      })
      .end((err, res) => {
          expect(res.status).toEqual(HttpStatus.CREATED);
          done();
        });
      });
  });
