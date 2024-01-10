import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

let authToken;

describe("Groups test", () => {
  it("it should sign in a user", (done) => {
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
  it("it should return 201 when a user tries create a group", (done) => {
    chai
      .request(app)
      .post("/api/v1/group/create")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Movers",
        description: "Time to have Girls fun!",
        category: "Functions",
        goalBalance: "1000.00",
        emails: ["dele@gmail.com", "funmi@gmail.com"],
      })
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(201);
        done();
      });
  });
  it("it should return 200 when a user gets all groups created by that particular user", (done) => {
    chai
      .request(app)
      .get("/api/v1/group/user")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
      });
  });
  it("it should return 200 when a user gets one group", (done) => {
    chai
      .request(app)
      .get("/api/v1/group/1")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
      });
  });
  it("it should return 404 if group does not exist", (done) => {
    chai
      .request(app)
      .get("/api/v1/group/2033")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(404);
        done();
      });
  });
  it("it should return 200 when a user gets groups they are part of", (done) => {
    chai
      .request(app)
      .get("/api/v1/group?email=dele@gmail.com")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
      });
  });
  it("it should return 200 when a user updates a group", (done) => {
    chai
      .request(app)
      .patch("/api/v1/group/update/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Movers",
        description: "Time to have some Girls fun!",
        category: "Functions",
        goalBalance: "1000.00",
        emails: ["dele@gmail.com", "funmi@gmail.com", "chris@gmail.com"],
      })
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
      });
  });
  it("it should return 200 when a user deposits money to a group", (done) => {
    chai
      .request(app)
      .put("/api/v1/group/deposit-group/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        groupBalance: "0",
        amount: "100",
      })
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
      });
  });
});
