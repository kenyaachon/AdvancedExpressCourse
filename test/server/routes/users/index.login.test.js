//Tests whether a user can login properly
//if not they are redirected to the login page
const chai = require("chai");
const chaiHttp = require("chai-http");
const helper = require("../../../helper");

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

const { config } = helper;

const app = require("../../../../server/app")(config);

describe("The /users/login", () => {
  beforeEach(async () => helper.before());
  afterEach(async () => helper.after());

  it("should show an error with empty request", async () => {
    const res = await chai.request(app).post("/users/login");
    expect(res).to.redirect;
    expect(res.text).to.contain("Invalid username or password!");
  });

  it("should show an error with invalid email and password", async () => {
    const res = await chai
      .request(app)
      .post("/users/login")
      .send({ email: "foo@bar.com", password: "secret" });
    expect(res).to.redirect;
    expect(res.text).to.contain("Invalid username or password!");
  });

  it("should show a success message after successful login", async () => {
    const agent = chai.request.agent(app);
    await helper.createUser(agent, helper.validUser);
    const res = await helper.loginUser(
      agent,
      helper.validUser.email,
      helper.validUser.password
    );
    expect(agent).to.have.cookie("connect.sid");

    expect(res).to.redirect;
    expect(res.text).to.not.contain("Invalid username or password!");
  });
});
