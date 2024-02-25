const express = require("express");

const User = require("../model/userModel");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const JWT_KEY = "fegg34343uhgtugghijgokek";
//const loginUser = require("../controllers/authController");
authRouter.route("/signup").get(middleware1, getSignup, middleware2);

//.route("/login").post(loginUser);
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

module.exports = authRouter;
