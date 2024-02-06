const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); // global middleware
app.listen(3000, console.log("server running at nodemon SignUp/app.js 3000"));

//let users = {};
// let users = [
//   { id: 1, Name: "Abhisekh" },
//   { id: 2, Name: "Reena" },
//   { id: 3, Name: "Kattappa" },
// ];

const userRouter = express.Router();
const authRouter = express.Router();
app.use("/users", userRouter);
app.use("/auth", authRouter);
userRouter
  .route("/")
  .get(getUser) // path specific midlleware
  .post(postUser)
  .patch(patchUser)
  .delete(deleteUSer);

userRouter.route("/:id").get(getUserById);

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

const db_link =
  "mongodb+srv://vkkhambra786:Vikas123@cluster0.l8s5sug.mongodb.net/";
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("DB Connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

async function createUser() {
  let user = {
    name: "Garuda23",
    email: "kill789@gmail.com",
    password: "567890",
    confirmPassword: "567890",
  };

  //   let data = await User.create(user);
  //   console.log(data);
}
