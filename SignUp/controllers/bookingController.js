// This is your test secret API key.
let SK =
  "sk_test_51Oo6PsSGWSR3ZhtNS9csVpmggzxm7XUXKt8Xmt9qKaVIBVQvH45LiKwFWoAKk6Hf5OXtcUlOl5o42EAem3ZAG6wZ00g5e1MhrO";
const stripe = require("stripe")(SK);
const express = require("express");
const app = express();

const Plan = require("../model/planModel");
const User = require("../model/userModel");
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:3000";

module.exports.createSession = async function createSession(req, res) {
  try {
    let userId = req.id;
    let planId = req.params.id;

    const user = await User.findById(userId);
    const plan = await Plan.findById(planId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      client_refernce_id: plan.id,
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          name: plan.name,
          description: plan.description,
          amount: plan.price * 100,
          currency: "inr",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    // res.redirect(303, session.url);
    res.status(500).json({ message: "Success Payment", session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// app.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: "{{PRICE_ID}}",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}/success.html`,
//     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//   });

//   res.redirect(303, session.url);
// });

///app.listen(4242, () => console.log("Running on port 4242"));
