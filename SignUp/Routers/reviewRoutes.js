const express = require("express");
const reviewRouter = express.Router();

const { protectRoute, isAuthorised } = require("../controllers/authController");

const {
  getAllReviews,
  getPlanReviews,

  createReview,
  updateReview,
  deleteReview,
  getAllTop,
} = require("../controllers/reviewController");

reviewRouter.route("/all").get(getAllReviews);
reviewRouter.route("/:id").get(getPlanReviews);
reviewRouter.route("/").get(getAllTop);

reviewRouter.use(protectRoute);

//reviewRouter.use(isAuthorised(["Admin", "User", "RestOwner"]));

reviewRouter.route("/crud/:plan").post(createReview);
reviewRouter.route("/:id").patch(updateReview).delete(deleteReview);

module.exports = reviewRouter;
