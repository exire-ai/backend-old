/*#################################################
Developed by: Frank Pinnola
For exire.ai
#################################################*/

let mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema({
  userID: { type: String, default: "" },
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  stripe_account_id: { type: String, default: "" },
  venues: { type: Array, default: [] },
  events: { type: Array, default: [] },
});

module.exports = MerchantSchema;
