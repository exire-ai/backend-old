var express = require("express");
var router = express.Router();
let stripe = require("./stripe/main");

// Create Account
router.post("/createAccount", stripe.createAccount);

//Payments
router.post("/secret", stripe.secret);

module.exports = router;
