const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  console.log("request has been browser from server");
  //   console.log(req.method);
  //   console.log(req.url);

  //   res.setHeader("Content-Type", "text/html");
  //   res.write("<h1>Hello, Pep coding ! :)</h1>");
  //   res.write("<h1>Hello, Vikas Khambra Nodejs Server ! :)</h1>");
  //   res.end();

  let num = _.random();
  console.log(num);

  let greet = _.once(() => {
    console.log("Hello call once time only");
  });

  greet();
  greet();
  let path = "./viwes";
  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;

    case "/about":
      path += "/aboutus.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "/404.html";
      res.statusCode = 404;
      break;
  }
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // multiple file using then we can use res.write() else we can use for single only res.end(data)
      //res.write(data);
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("server is runing at port 3000");
});
