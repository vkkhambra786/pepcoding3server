const express = require("express");

const User = require("../model/userModel");

const jwt = require("jsonwebtoken");
const JWT_KEY = "fegg34343uhgtugghijgokek";
const bcrypt = require("bcrypt");
const { sendMail } = require("../utility/nodeMailer");
module.exports.postSignUp = async function postSignUp(req, res) {
  try {
    let dataObj = req.body;

    let user = await User.create(dataObj);
    sendMail("signup", user);
    console.log(user);
    if (user) {
      return res.json({
        message: "User Successfully SignUp",
        data: user,
      });
    } else {
      return res.json({
        message: "Error While doing SignUp",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

module.exports.loginUser = async function loginUser(req, res) {
  try {
    let data = req.body;
    console.log("data", data);
    if (data.email) {
      let user = await User.findOne({ email: data.email });

      if (user) {
        console.log("user", user);
        const passwordMatch = await bcrypt.compare(
          data.password,
          user.password
        );
        if (passwordMatch) {
          //  res.cookie("isLoggedIn", true, { httpOnly: true });
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, JWT_KEY);

          res.cookie("login", token, { httpOnly: true });
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
          message: "User not available",
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
};

// forgot Password

module.exports.forgotPassword = async function forgotPassword(req, res) {
  try {
    let { email } = req.body;
    console.log("data", email);

    let user = await User.findOne({ email: email });

    if (user) {
      console.log("user", user);

      const resetToken = user.createResetToken();
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetPassword/${req.resetToken}`;

      let obj = {
        resetPasswordLink: resetPasswordLink,
        email: email,
      };
      sendMail("resetpassword", obj);
    } else {
      res.json({
        message: "User not available",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.json({
      message: error.message,
    });
  }
};

// reset Password
module.exports.resetPassword = async function resetPassword(req, res) {
  try {
    let token = req.params.token;
    let { password, confirmPassword } = req.body;

    let user = await User.findOne({ resetToken: token });

    if (user) {
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "Password Changed Successfully",
      });
    } else {
      res.json({
        message: "User not Found for reset Password",
      });
    }
  } catch (error) {
    console.log("error", error);
    return res.json({
      message: error.message,
    });
  }
};

// isAuthorised check User Role

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    console.log("role", req.role);
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "Roles Operations are Not Allowed",
      });
    }
  };
};

module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);

      if (payload) {
        const user = await User.findById(payload.payload);

        req.role = user.role;
        req.id = user.id;

        next();
      } else {
        return res.json({
          message: "Please Login Again",
        });
      }
    } else {
      const client = req.get("User-Agent");

      if (client.includes("Mozilla") == true) {
        return res.redirect("/login");
      }
      return res.json({
        message: "User need to logged In First auhtController file",
      });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

module.exports.logout = function logout(req, res) {
  res.cookie("login", "", { maxAge: 1 });
  return res.json({
    message: "User Logout via cookies  Successfully",
  });
};
