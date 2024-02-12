//midlleware first it wiil run then getUsers will run
//let flag = false;

// first it will go inside then we can see all users data
// if our users isLoggedIn true in cookie then it will work
// check loginUser then it will work  res.cookie("isLoggedIn", true, { httpOnly: true });

function protectRoute(req, res, next) {
  if (req.cookies.isLoggedIn) {
    next();
  } else {
    return res.json({
      message: "User need to logged In First ",
    });
  }
}

module.exports = protectRoute;
