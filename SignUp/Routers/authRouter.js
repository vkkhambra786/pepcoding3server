const express = require("express");

const User = require("../model/userModel");
const authRouter = express.Router();
authRouter
  .route("/signup")
  .get(middleware1, getSignup, middleware2)
  .post(postSignUp);

function middleware1(req, res, next) {
  console.log("middleware1 Encountered");
  next();
}
function middleware2(req, res, next) {
  console.log("middleware2 Encountered");
  console.log("middlewware 2 ended req/res cycle ");
  res.sendFile("/public/signUp.html", { root: __dirname });
}
function getSignup(req, res, next) {
  console.log("getSignUp Called ", req.query);
  next();
}

async function postSignUp(req, res) {
  let dataObj = req.body;

  let user = await User.create(dataObj);
  console.log(user);
  res.json({
    message: "User Successfully SignUp",
    data: user,
  });
}

module.exports = authRouter;
