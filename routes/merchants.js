/*#################################################
Developed by: Frank Pinnola
For exire.ai
#################################################*/

var express = require("express");
var router = express.Router();
let merchants = require("./merchants/main");

// Merchant general
// router.get("/get/:userID", users.get);
router.get("/get/:userID", merchants.get);
router.post("/create", merchants.create);
router.get("/doesExist/:userID", merchants.doesExist);

//Merchant Stripe Integration
router.get("/updateStripeID/:userID/:stripeID", merchants.updateStripeID);

//Merchant Venues List
router.get("/addVenue/:userID/:venueID", merchants.addVenue);

//Merchant Events List
router.get("/addEvent/:userID/:eventID", merchants.addEvent);

module.exports = router;
