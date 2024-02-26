const mongoose = require("mongoose");

const { use } = require("../Routers/userRouter");

const db_link =
  "mongodb+srv://vkkhambra786:Vikas123@cluster0.l8s5sug.mongodb.net/";
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Review Model DB Connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review Required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Rating Required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a User"],
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "Plan",
    required: [true, "Review must belong to a Plan"],
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImage",
  }).populate("plan");
  next();
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

// (async function createPlan() {
//   let user = {
//     review: "check review 1",
//     rating: 5,
//     createdAt: Date.now(),
//   };

//   let data = await Review.create(user);
//   console.log(data);
// })();
