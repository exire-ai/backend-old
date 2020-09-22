/*#################################################
Developed by: Exire.ai
#################################################*/

let mongoose = require("mongoose");

// generate planID
// generate name

const PlanSchema = new mongoose.Schema({
  planID: { type: String, default: "" },
  description: { type: String, default: "" },
  title: { type: String, default: "" },
  startUNIX: { type: Number, default: 0 },
  users: { type: Array, default: [] },
  bookings: { type: Array, default: [] },
  ids: { type: Array, default: [] }
});

module.exports = PlanSchema;
