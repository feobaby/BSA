import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { faker } from "@faker-js/faker";
import app from "../app.js";

chai.use(chaiHttp);

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
