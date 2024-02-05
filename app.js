const express = require("express");

const app = express();

app.listen(3000, console.log("server running at nodemon app.js 3000"));

app.get("/", (req, res) => {
  //res.send("<h1>Hello Vikas Khambra</h1> ");
  res.sendFile("./viwes/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  // res.send("<h1> Vikas Khambra About US </h1> ");
  res.sendFile("./viwes/aboutus.html", { root: __dirname });
});

// redirect page
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page

app.use((req, res) => {
  res.status(404).sendFile("./viwes/404.html", { root: __dirname });
});

// post request send data from frontend to backend
