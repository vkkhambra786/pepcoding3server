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
const planRouter = require("./Routers/planRouter");
const reviewRouter = require("./Routers/reviewRoutes");
const bookingRouter = require("./Routers/bookingRouter");
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/plans", planRouter);
app.use("/reviews", reviewRouter);
app.use("/booking", bookingRouter);
// when i require plan then planSchema and plan DB connect and send data in db via createplan fucntion
//const plan = require("./model/planModel");
//const review = require("./model/reviewModel");
