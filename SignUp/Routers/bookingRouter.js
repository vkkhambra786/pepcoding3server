const express = require("express");
const bookingRouter = express.Router();

const { protectRoute } = require("../controllers/authController");

const { createSession } = require("../controllers/bookingController");

bookingRouter.route("/createSession").post(protectRoute, createSession);

bookingRouter.route("/Session").get(function (req, res) {
  res.sendFile("SignUp\booking.html");
});
module.exports = bookingRouter;
