/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let mongoose = require("mongoose");

// generate planID
// generate name

const PlanSchema = new mongoose.Schema({
  planID: { type: String, default: "" },
  description: { type: String, default: "" },
  title: { type: String, default: "" },
  start_time: { type: Number, default: 0 },
  users: { type: Array, default: [] },
  bookings: { type: Array, default: [] },
});

module.exports = PlanSchema;
