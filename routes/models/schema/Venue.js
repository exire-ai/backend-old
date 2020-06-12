/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
  placeID: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  tips: { type: String, default: "" },
  category: { type: String, default: "" },
  subcategory: { type: String, default: "" },
  type: { type: String, default: "venue" },
  imgURL: { type: String, default: "" },
  region: { type: String, default: "" },
  open: { type: Number, default: 0 },
  closed: { type: Number, default: 0 },
  closed_days: { type: Array, default: [] },
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  rank: { type: Number, default: 4 },
  peopleWatching: { type: Number, default: 0 },
  linkClicks: { type: Number, default: 0 },
  tag: { type: String, default: "" },
  accessURL: { type: String, default: "" },
  businessID: { type: String, default: "" },
  times: { type: Object, default: {} },
  address: { type: String, default: "" },
});

module.exports = VenueSchema;
