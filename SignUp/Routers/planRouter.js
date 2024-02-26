const express = require("express");
const planRouter = express.Router();
//const Plan = require("../model/planModel");
const { protectRoute, isAuthorised } = require("../controllers/authController");

const {
  getAllPlans,
  getPlan,
  createPlan,
  deletePlan,
  updatePlan,
  top3Plans,
} = require("../controllers/planController");

planRouter.route("/allPlans").get(getAllPlans);

planRouter.use(protectRoute);

planRouter.route("/plan/:id").get(getPlan);

planRouter.use(isAuthorised(["Admin", "User", "RestOwner"]));

planRouter.route("/crud").post(createPlan);
planRouter.route("/:id").patch(updatePlan).delete(deletePlan);
planRouter.route("/top3").get(top3Plans);

module.exports = planRouter;
