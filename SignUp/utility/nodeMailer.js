const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str, data) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "vkkhambra786@gmail.com",
      pass: "psyr rjzc hoet rlzl",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  var Osubject, Otext, Ohtml;

  if (str == "signup") {
    Osubject = `Thankyou fro signing ${data.name}`;
    Ohtml = `<h1>Welcome to FoodApp.com</h1>
    Hope You have a good time!
    Here are Your Details:
    Name : ${data.name}
    Email : ${data.email}
    `;
  } else if (str == "resetpassword") {
    Osubject = `Reset Password`;
    Ohtml = `<h1>Welcome to FoodApp.com</h1>
  <h2></h2> Here is your reset password link</h2>
      ${data.resetPasswordLink}
   
    `;
  }
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <vkkhambra786@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
