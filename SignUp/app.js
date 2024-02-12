const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json()); // global middleware
app.listen(3000, console.log("server running at nodemon SignUp/app.js 3000"));
app.use(cookieParser());
//let users = {};
// let users = [
//   { id: 1, Name: "Abhisekh" },
//   { id: 2, Name: "Reena" },
//   { id: 3, Name: "Kattappa" },
// ];

const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");
app.use("/users", userRouter);
app.use("/auth", authRouter);
