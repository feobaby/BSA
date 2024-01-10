import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

let authToken;

describe("Users test", () => {
  it("it should return 201 when a user tries to sign up", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstName: "Dele",
        lastName: "Adeola",
        email: "dele@gmail.com",
        password: "dele",
      })
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(201);
        done();
        authToken = res.body.token;
      });
  });
  it("it should return 200 for user sign in", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "dele@gmail.com",
        password: "dele",
      })
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
      });
  });
  it("it should return 401 for wrong password", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "dele@gmail.com",
        password: "deee",
      })
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(401);
        done();
      });
  });
  it("it should return 409 for duplicate email", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstName: "Dele",
        lastName: "Adeola",
        email: "dele@gmail.com",
        password: "dele",
      })
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(409);
        done();
      });
  });
  it("it should verify if email exists", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "dele1@gmail.com",
        password: "dele",
      })
      .end((err, res) => {
        console.log(err);
        chai.expect(res.status).to.be.equal(404);
        done();
      });
  });
  it("it should validate if the password is not correct", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "dele@gmail.com",
        password: "delle",
      })
      .end((err, res) => {
        console.log(err);
        chai.expect(res.status).to.be.equal(401);
        done();
      });
  });
  it("it should get a profile", (done) => {
    chai
      .request(app)
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
      });
  });
});
