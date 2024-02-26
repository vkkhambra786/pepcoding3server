const Review = require("../model/reviewModel");
const Plan = require("../model/planModel");
const { updatePlan } = require("../controllers/planController");
module.exports.getAllReviews = async function getAllReviews(req, res) {
  console.log("vikas get");
  try {
    let reviews = await Review.find({});

    if (reviews) {
      res.json({
        message: "Get All Reviews Data Recived",
        data: reviews,
      });
    } else {
      return res.json({
        message: "Get All Reviews Not working",
      });
    }
  } catch (error) {
    console.log("vikas not get");
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getAllTop = async function getAllTop(req, res) {
  console.log("vikas get");
  try {
    let reviews = await Review.find({}).sort({ rating: -1 }).limit(3);

    if (reviews) {
      res.json({
        message: "Get Top 3 Reviews Data Recived",
        data: reviews,
      });
    } else {
      return res.json({
        message: "Get Top 3 Reviews Not working",
      });
    }
  } catch (error) {
    console.log("vikas not get");
    return res.status(500).json({
      message: error.message,
    });
  }
};
// module.exports.top3Review = async function top3Review(req, res) {
//   //res.send(users);

//   try {
//     let user = await Review.find({}); //.sort({ rating: -1 }).limit(3);

//     return res.json({
//       message: "find top 3 Plan Successfully",
//       data: user,
//     });
//   } catch (error) {
//     res.json({
//       message: error.message,
//     });
//   }
//   // try {
//   //   console.log("vikasssssss");
//   //   let user = await Review.find({}).sort({ rating: -1 }).limit(3);

//   //   if (user) {
//   //     return res.json({
//   //       message: "find top 3 Reviews Successfully",
//   //       data: user,
//   //     });
//   //   } else {
//   //     return res.json({
//   //       message: "Top 3 Reviews   not  Found",
//   //     });
//   //   }
//   // } catch (error) {
//   //   res.json({
//   //     message: error.message,
//   //   });
//   // }
// };

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  try {
    let id = req.params.id;
    console.log("params", req.params);
    console.log("id --", id);
    let plan = await Review.findById(id);

    console.log("plan --", plan);

    if (plan) {
      res.json({
        message: "Review Found Successfully",
        data: plan,
      });
    } else {
      res.json({
        message: "Review Not Found",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.createReview = async function createReview(req, res) {
  //res.send(users);
  try {
    let id = req.params.plan;
    let plan = await Plan.findById(id);
    console.log(req.body);

    let review = await Review.create(req.body);
    plan.ratingAverage = 3;
    //(plan.ratingAverage / ratingAverage + req.body.rating) / 2;

    await plan.save();
    res.json({
      message: "Review Created Successfully",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateReview = async function updateReview(req, res) {
  try {
    let id = req.params.id;
    console.log("id", id);

    let user = await Review.findById(id);

    if (!user) {
      return res.json({
        message: "Review Not Found",
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
      message: "Review Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deleteReview = async function deleteReview(req, res) {
  //res.send(users);
  try {
    let id = req.params.id;
    // let user = await User.findOneAndDelete({ email: "kill789@gmail.com" });
    let user = await Review.findByIdAndDelete(id);

    if (!user) {
      res.json({
        message: "Reviews Not Found",
      });
    }
    res.json({
      message: "Reviews Deleted Successfully",
      data: user,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
