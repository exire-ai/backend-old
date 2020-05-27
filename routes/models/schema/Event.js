/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  placeID: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  tips: { type: String, default: "" },
  category: { type: String, default: "" },
  subcategory: { type: String, default: "" },
  type: { type: String, default: "event" },
  imgURL: { type: String, default: "" },
  startUNIX: { type: Number, default: 0 },
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  peopleWatching: { type: Number, default: 0 },
  linkClicks: { type: Number, default: 0 },
  tag: { type: String, default: "" },
  ticketURL: { type: String, default: "" },
});

module.exports = EventSchema;
