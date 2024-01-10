import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

let authToken;
describe("Groups test", () => {
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
  it("it should get a user's transactions", (done) => {
    chai
      .request(app)
      .get("/api/v1/transaction")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
        authToken = res.body.token;
      });
  });
});
