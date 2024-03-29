/*#################################################
Developed by: Frank Pinnola
For exire.ai
#################################################*/

//Merchant General
module.exports.get = require("./get");
module.exports.create = require("./create");
module.exports.doesExist = require("./doesExist");

//Stripe Integration
module.exports.updateStripeID = require("./updateStripeAccountID");

//Venues
module.exports.addVenue = require("./addVenue");

//Events
module.exports.addEvent = require("./addEvent");
