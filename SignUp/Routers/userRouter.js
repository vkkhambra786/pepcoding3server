const express = require("express");
const userRouter = express.Router();
const User = require("../model/userModel");
const protectRoute = require("./authMiddleware");
userRouter
  .route("/")
  .get(protectRoute, getUser) // path specific midlleware
  .post(postUser)
  .patch(patchUser)
  .delete(deleteUSer);

userRouter.route("/getCookies").get(getCookies);

userRouter.route("/setCookies").get(setCookies);
userRouter.route("/:id").get(getUserById);

async function getUser(req, res) {
  // console.log(req.query);

  let allUsers = await User.find();
  res.json({
    message: "User get all List Successfully",
    data: allUsers,
  });
}

function postUser(req, res) {
  //res.send(users);
  console.log(req.body);
  users = req.body;
  res.json({
    message: "User Created Successfully",
    user: req.body,
  });
}

async function patchUser(req, res) {
  //res.send(users);
  console.log(req.body);
  let dataToUpdate = req.body;

  //   for (key in dataToUpdate) {
  //     users[key] = dataToUpdate[key];
  //   }
  let user = await User.findOneAndUpdate(
    { email: "vkkhambra1786@gmail.com" },
    dataToUpdate
  );
  res.json({
    message: "User Updated Successfully",
    data: user,
  });
}

async function deleteUSer(req, res) {
  //res.send(users);
  let user = await User.findOneAndDelete({ email: "kill789@gmail.com" });
  res.json({
    message: "User Deleted Successfully",
    data: user,
  });
}

function getUserById(req, res) {
  let paramsId = req.params.id;
  let obj = {};

  for (let i = 0; i < users.length; i++) {
    if (users[i]["id"] == paramsId) {
      obj = users[i];
    }
  }
  res.json({
    message: "Data Recived",
    data: obj,
  });
}

function setCookies(req, res) {
  //res.setHeader("Set-Cookie", "isLoggedIn=true");
  // httpOnly true used can't access cookie from frontend
  res.cookie("isLoggedIn", true, {
    maxAge: 1000 * 60 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  });

  // this isnot secure cookie we acces from frontend document.cookie()
  res.cookie("isSecureCheck", true, { maxAge: 1000 * 60 * 60 * 60 * 2 });
  res.send("Cookies has been set");
}

function getCookies(req, res) {
  let cookies = req.cookies;
  console.log("cookies", cookies);
  res.send("Cookie Recieved");
}

module.exports = userRouter;
