const mongoose = require("mongoose");

const { use } = require("../Routers/userRouter");

const db_link =
  "mongodb+srv://vkkhambra786:Vikas123@cluster0.l8s5sug.mongodb.net/";
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Plan Model DB Connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const planSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: [20, "plan name not exceed then 20 character"],
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ratingAverage: {
    type: Number,
  },
  discount: {
    type: Number,
    validate: function () {
      return this.discount < 100;
    },
  },
});

const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;

(async function createPlan() {
  let user = {
    name: "SuperFood",
    duration: 30,
    price: 1000,
    ratingAverage: 3,
    discount: 20,
  };

  let data = await Plan.create(user);
  console.log(data);
})();
