module.exports = async function (req, res) {
  var code = req.body.code;

  const stripe = require("stripe")(
    "sk_test_vgRX5ekCjGOpa9dPgZLYZNya00dIBzvP9t"
  );

  console.log("Hello");
  try {
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code: code,
    });

    // var connected_account_id = response.stripe_user_id;

    res.send(response);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
