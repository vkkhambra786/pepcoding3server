const express = require("express");

const app = express();
app.use(express.json());
app.listen(3000, console.log("server running at nodemon method.js 3000"));

//let users = {};
let users = [
  { id: 1, Name: "Abhisekh" },
  { id: 2, Name: "Reena" },
  { id: 3, Name: "Kattappa" },
];

const userRouter = express.Router();

app.use("/users", userRouter);

userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(patchUser)
  .delete(deleteUSer);

userRouter.route("/:id").get(getUserById);
// app.get("/users", (req, res) => {
//   console.log(req.query);
//   res.send(users);
// });

// app.post("/users", (req, res) => {
//   //res.send(users);
//   console.log(req.body);
//   users = req.body;
//   res.json({
//     message: "User Created Successfully",
//     user: req.body,
//   });
// });

// update PATCH

// app.patch("/users", (req, res) => {
//   //res.send(users);
//   console.log(req.body);
//   let dataToUpdate = req.body;

//   for (key in dataToUpdate) {
//     users[key] = dataToUpdate[key];
//   }
//   res.json({
//     message: "User Updated Successfully",
//   });
// });

//delete

// app.delete("/users", (req, res) => {
//   //res.send(users);
//   console.log(req.body);
//   users = {};
//   res.json({
//     message: "User Deleted Successfully",
//   });
// });

// params

// app.get("/users/:id", (req, res) => {
//   res.send(req.params);
// });

//everything write in a dynamic code via mounting

function getUser(req, res) {
  console.log(req.query);
  res.send(users);
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

function patchUser(req, res) {
  //res.send(users);
  console.log(req.body);
  let dataToUpdate = req.body;

  for (key in dataToUpdate) {
    users[key] = dataToUpdate[key];
  }
  res.json({
    message: "User Updated Successfully",
  });
}

function deleteUSer(req, res) {
  //res.send(users);
  console.log(req.body);
  users = {};
  res.json({
    message: "User Deleted Successfully",
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
