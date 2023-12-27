import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import faker from "faker";
import app from "../app";

const { expect } = chai;
chai.use(chaiHttp);

const login = {
  email: "francis@gmail.com",
  password: "12345",
};
chai.use(sinonChai);

describe("Users test", () => {
  it("it should return 201 when a user tries to sign up", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/user")
      .send({
        firstName: "Dele",
        lastName: "Adeola",
        email: faker.internet.email(),
        password: "dele",
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        done();
      });
  });
  it("it should return 409 for duplicate email", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/user")
      .send({
        firstName: "Dele",
        lastName: "Adeola",
        email: "francis@gmail.com",
        password: "dele",
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        done();
      });
  });
  it("it should return 200 for user sign in", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "francis@gmail.com",
        password: "12345",
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
  it("it should return 401 for wrong password", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "francis@gmail.com",
        password: "12345678",
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        done();
      });
  });
});

let request;
describe("Test for users apis that requires token", () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });
  afterEach(() => sinon.restore());
  after(() => request.close());
  describe("Users test", () => {
    it("should return 200 is user can view account", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth/signin")
        .set("Accept", "application/json")
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai
            .request(app)
            .get("/api/v1/account")
            .set("Authorization", token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status("200");
              done();
            });
        });
    });
    it("should return 200 for user to update account", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth/signin")
        .set("Accept", "application/json")
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai
            .request(app)
            .patch("/api/v1/account")
            .set("Authorization", token)
            .send({
              firstName: "Frances",
              lastName: "Xavion",
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status("200");
              done();
            });
        });
    });
    it("should return 200 for user to add money to account", (done) => {
      chai
        .request(app)
        .post("/api/v1/auth/signin")
        .set("Accept", "application/json")
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.token}`;
          chai
            .request(app)
            .patch("/api/v1/add-money")
            .set("Authorization", token)
            .send({
              amount: 5000.0,
              balance: 0,
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status("200");
              done();
            });
        });
    });
  });
});
