const express = require("express");
const userRouter = express.Router();

const protectRoute = require("./authMiddleware");
const {
  getUser,
  postUser,
  patchUser,
  deleteUSer,
  getCookies,
  setCookies,
  getUserById,
} = require("../controllers/userController");
userRouter
  .route("/")
  .get(protectRoute, getUser) // path specific midlleware
  .post(postUser)
  .patch(patchUser)
  .delete(deleteUSer);

userRouter.route("/getCookies").get(getCookies);

userRouter.route("/setCookies").get(setCookies);
userRouter.route("/:id").get(getUserById);

module.exports = userRouter;
