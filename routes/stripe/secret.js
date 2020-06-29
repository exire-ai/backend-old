const stripe = require("stripe")("sk_live_pTtGI4THV0o5GhFbg0lPeeeJ00iywCU686");

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
