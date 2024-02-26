const express = require("express");

const Plan = require("../model/planModel");

module.exports.getAllPlans = async function getAllPlans(req, res) {
  console.log("vikas get");
  try {
    let plans = await Plan.find({});

    if (plans) {
      res.json({
        message: "Get All Plans Data Recived",
        data: plans,
      });
    } else {
      return res.json({
        message: "Get All Plans Not working",
      });
    }
  } catch (error) {
    console.log("vikas not get");
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getPlan = async function getPlan(req, res) {
  try {
    let id = req.params.id;
    console.log("params", req.params);
    console.log("id --", id);
    let plan = await Plan.findById(id);

    console.log("plan --", plan);

    if (plan) {
      res.json({
        message: "plan Found Successfully",
        data: plan,
      });
    } else {
      res.json({
        message: "plan Not Found",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.createPlan = async function createPlan(req, res) {
  //res.send(users);
  try {
    console.log(req.body);
    let plans = req.body;

    let createPlans = await Plan.create(plans);
    res.json({
      message: "Plans Created Successfully",
      data: createPlans,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updatePlan = async function updatePlan(req, res) {
  try {
    let id = req.params.id;
    console.log("id", id);

    let user = await Plan.findById(id);

    if (!user) {
      return res.json({
        message: "User Not Found",
      });
    }

    let dataToUpdate = req.body;

    // Skip validation for certain fields by setting runValidators to false
    const updateOptions = { runValidators: false };

    // Update user fields based on the data from the request body
    for (let key in dataToUpdate) {
      user[key] = dataToUpdate[key];
    }

    // Save the updated user data
    const updatedUser = await user.save(updateOptions);

    res.json({
      message: "Plan Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deletePlan = async function deletePlan(req, res) {
  //res.send(users);
  try {
    let id = req.params.id;
    // let user = await User.findOneAndDelete({ email: "kill789@gmail.com" });
    let user = await Plan.findByIdAndDelete(id);

    if (!user) {
      res.json({
        message: "Plan Not Found",
      });
    }
    res.json({
      message: "Plan Deleted Successfully",
      data: user,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports.top3Plans = async function top3Plans(req, res) {
  //res.send(users);
  try {
    let user = await Plan.find({}).sort({ ratingAverage: -1 }).limit(3);

    return res.json({
      message: "find top 3 Plan Successfully",
      data: user,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
