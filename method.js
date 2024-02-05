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
app.get("/users", (req, res) => {
  console.log(req.query);
  res.send(users);
});

app.post("/users", (req, res) => {
  //res.send(users);
  console.log(req.body);
  users = req.body;
  res.json({
    message: "User Created Successfully",
    user: req.body,
  });
});

// update PATCH

app.patch("/users", (req, res) => {
  //res.send(users);
  console.log(req.body);
  let dataToUpdate = req.body;

  for (key in dataToUpdate) {
    users[key] = dataToUpdate[key];
  }
  res.json({
    message: "User Updated Successfully",
  });
});

//delete

app.delete("/users", (req, res) => {
  //res.send(users);
  console.log(req.body);
  users = {};
  res.json({
    message: "User Deleted Successfully",
  });
});

// params

app.get("/users/:username", (req, res) => {
  res.send(req.params);
});
