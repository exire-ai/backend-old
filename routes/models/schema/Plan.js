/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let mongoose = require('mongoose');

// generate planID
// generate name

const PlanSchema = new mongoose.Schema({
	'planID' : { type: String, default: "" },
	'userID' : { type: String, default: "" },
	'name' : { type: String, default: "Your Plans!" },
  'price' : { type: Number, default: 0 },
  'startUNIX' : {type: Number, default: Math.floor(new Date() / 1000)},
  'latitude' : {type: Number, default: 40.7465 },
  'longitude' : {type: Number, default: -74.0014 },
	'venues' : { type: Array, default: [] }
});

module.exports = PlanSchema;
