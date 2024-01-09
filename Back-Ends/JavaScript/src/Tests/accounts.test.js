import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

let authToken;

describe("Users test", () => {
  it("it should sign a user in", (done) => {
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
        authToken = res.body.token;
      });
  });
  it("it should deposit some money to a user's account", (done) => {
    chai
      .request(app)
      .put("/api/v1/account/deposit-wallet")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        balance: "0",
        amount: "500.00",
      })
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
        authToken = res.body.token;
      });
  });
});
