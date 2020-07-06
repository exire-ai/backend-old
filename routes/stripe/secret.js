const { STRIPE_KEY } = require('../../config');
const stripe = require("stripe")(STRIPE_KEY);

module.exports = async function (req, res) {
  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ["card"],
    amount: 1000,
    currency: "usd",
    application_fee_amount: 123,
    transfer_data: {
      destination: "{{CONNECTED_STRIPE_ACCOUNT_ID}}",
    },
  });

  res.json({ client_secret: paymentIntent.client_secret });
};
