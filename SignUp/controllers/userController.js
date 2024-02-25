const e = require("express");
const User = require("../model/userModel");

module.exports.getUser = async function getUser(req, res) {
  try {
    let id = req.params.id;
    console.log("params", req.params);
    console.log("id --", id);
    let user = await User.findById(id);

    console.log("user --", user);

    if (user) {
      res.json({
        message: "User Found Successfully",
        data: user,
      });
    } else {
      res.json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.postUser = function postUser(req, res) {
  //res.send(users);
  console.log(req.body);
  let users = req.body;
  res.json({
    message: "User Created Successfully",
    user: users,
  });
};

module.exports.patchUser = async function patchUser(req, res) {
  try {
    let id = req.params.id;
    console.log("id", id);

    let user = await User.findById(id);

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
      message: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// module.exports.patchUser = async function patchUser(req, res) {
//   //res.send(users);
//   try {
//     // console.log(req.body);
//     let id = req.params.id;
//     console.log("id", id);
//     let users = await User.findById(id);
//     const updateData = await users.save({ runValidators: false });

//     let dataToUpdate = req.body;
//     if (users) {
//       const keys = [];

//       for (let key in dataToUpdate) {
//         keys.push(key);
//       }

//       for (let i = 0; i < keys.length; i++) {
//         users[keys[i]] = dataToUpdate[keys[i]];
//       }

//       const updateData = await users.save();
//       res.json({
//         message: "User Updated Successfully",
//         data: users,
//       });
//     } else {
//       res.json({
//         message: "Users Not Found",
//       });
//     }
//   } catch (error) {
//     console.log("error", error);
//     res.json({
//       message: error.message,
//     });
//   }
//   //   for (key in dataToUpdate) {
//   //     users[key] = dataToUpdate[key];
//   //   }
//   // let user = await User.findOneAndUpdate(
//   //   { email: "vkkhambra1786@gmail.com" },
//   //   dataToUpdate
//   // );
//   // res.json({
//   //   message: "User Updated Successfully",
//   //   data: user,
//   // });
// };

module.exports.deleteUSer = async function deleteUSer(req, res) {
  //res.send(users);
  try {
    let id = req.params.id;
    // let user = await User.findOneAndDelete({ email: "kill789@gmail.com" });
    let user = await User.findByIdAndDelete(id);

    if (!user) {
      res.json({
        message: "User Not Found",
      });
    }
    res.json({
      message: "User Deleted Successfully",
      data: user,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports.getALLUser = async function getALLUser(req, res) {
  console.log("vikas get");
  try {
    let users = await User.find({});

    if (users) {
      res.json({
        message: "Get All Users Data Recived",
        data: users,
      });
    } else {
      return res.json({
        message: "Get All User Not working",
      });
    }

    //  res.send("User Id Recieved");
  } catch (error) {
    console.log("vikas not get");
    return res.json({
      message: error.message,
    });
  }
};

module.exports.setCookies = function setCookies(req, res) {
  //res.setHeader("Set-Cookie", "isLoggedIn=true");
  // httpOnly true used can't access cookie from frontend
  res.cookie("isLoggedIn", true, {
    maxAge: 1000 * 60 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  });

  // this isnot secure cookie we acces from frontend document.cookie()
  res.cookie("isSecureCheck", true, { maxAge: 1000 * 60 * 60 * 60 * 2 });
  res.send("Cookies has been set");
};

module.exports.getCookies = function getCookies(req, res) {
  let cookies = req.cookies;
  console.log("cookies", cookies);
  res.send("Cookie Recieved");
};
