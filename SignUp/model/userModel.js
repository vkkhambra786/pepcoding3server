const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

const db_link =
  "mongodb+srv://vkkhambra786:Vikas123@cluster0.l8s5sug.mongodb.net/";
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("DB Connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: { type: String, required: true },
  confirmPassword: {
    type: String,
    required: true,
    // i don't want to save confirm passowrd in db
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
});
userSchema.pre("save", function () {
  console.log("Before save in DB");
});

userSchema.pre("save", function () {
  // I wan to hise the confirmPassword from db
  this.confirmPassword = undefined;
});
userSchema.post("save", function () {
  console.log("After save in DB");
});

// need to genrate the salt and hide the passowrd no one can access
userSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt();
  let hashedString = await bcrypt.hash(this.password, salt);
  console.log("hashedString", hashedString);
  this.password = hashedString;
});
const User = mongoose.model("User", userSchema);
module.exports = User;
async function createUser() {
  let user = {
    name: "Garuda23",
    email: "kill789@gmail.com",
    password: "567890",
    confirmPassword: "567890",
  };

  //   let data = await User.create(user);
  //   console.log(data);
}
