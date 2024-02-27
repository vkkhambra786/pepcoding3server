const express = require("express");
const userRouter = express.Router();
const multer = require("multer");
//const protectRoute = require("./authMiddleware");
const fs = require("fs");
const path = require("path");

// Assuming multer.html is in the same directory as the script
const uploadDir = "public/images";
const htmlPath = path.resolve(__dirname, "../multer.html");

const {
  getUser,
  postUser,
  patchUser,
  deleteUSer,
  getCookies,
  setCookies,

  getALLUser,
  updateProfileImage,
} = require("../controllers/userController");
const {
  loginUser,
  postSignUp,
  protectRoute,
  isAuthorised,
  forgotPassword,
  resetPassword,
  logout,
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
userRouter.route("/forgotPassword").post(forgotPassword);
userRouter.route("/resetPassword/:token").post(resetPassword);
userRouter.route("/logout").get(logout);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create the destination directory if it doesn't exist
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    cb(null, `user-${Date.now()}.jpeg`);
  },
});
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `user-${Date.now()}.jpeg`);
//   },
// });

// const filter = function (req, file, cb) {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid image type!"), false);
//   }
// };
const upload = multer({ storage: storage });

//const upload = multer({ storage: multerStorage, fileFilter: filter });
userRouter.post("/profileImage", upload.single("photo"), updateProfileImage);

userRouter.get("/profileImage", (req, res) => {
  // console.log(req.file);
  res.sendFile(htmlPath);
});
userRouter.use(protectRoute);

//userRouter.get("/users/:id", getUser);

userRouter.route("/:id").get(getUser);
userRouter.use(isAuthorised(["Admin"]));
userRouter.route("/").get(getALLUser); // path specific midlleware

module.exports = userRouter;
