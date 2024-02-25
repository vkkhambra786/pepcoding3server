const express = require("express");
const userRouter = express.Router();

//const protectRoute = require("./authMiddleware");
const {
  getUser,
  postUser,
  patchUser,
  deleteUSer,
  getCookies,
  setCookies,
  getALLUser,
} = require("../controllers/userController");
const {
  loginUser,
  postSignUp,
  protectRoute,
  isAuthorised,
} = require("../controllers/authController");
// userRouter
//   .route("/")
//   .get(protectRoute, getUser) // path specific midlleware
//   .post(postUser)
//   .patch(patchUser)
//   .delete(deleteUSer);

// userRouter.route("/getCookies").get(getCookies);

// userRouter.route("/setCookies").get(setCookies);
// userRouter.route("/:id").get(getUserById);

userRouter.route("/:id").patch(patchUser).delete(deleteUSer);
userRouter.route("/signup").post(postSignUp);
userRouter.route("/login").post(loginUser);
userRouter.use(protectRoute);
//userRouter.get("/users/:id", getUser);
userRouter.route("/:id").get(getUser);
userRouter.use(isAuthorised(["Admin"]));
userRouter.route("/").get(getALLUser); // path specific midlleware

module.exports = userRouter;
