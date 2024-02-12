const express = require("express");

const User = require("../model/userModel");
const authRouter = express.Router();

authRouter
  .route("/signup")
  .get(middleware1, getSignup, middleware2)
  .post(postSignUp);

authRouter.route("/login").post(loginUser);
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

async function loginUser(req, res) {
  try {
    let data = req.body;
    console.log("data", data);
    if (data.email) {
      let user = await User.findOne({ email: data.email });

      if (user) {
        res.cookie("isLoggedIn", true, { httpOnly: true });

        if (user.password == data.password) {
          return res.json({
            message: "User has logged In",
            userDetails: data,
          });
        } else {
          res.json({
            message: "Credentials are wrong",
          });
        }
      } else {
        res.json({
          message: "User not avaiabbale",
        });
      }
    } else {
      res.json({
        message: "Email and Password required",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.json({
      message: error.message,
    });
  }
}
module.exports = authRouter;
