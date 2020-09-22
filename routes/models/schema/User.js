/*#################################################
Developed by: Exire.ai
#################################################*/

let mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userID: { type: String, default: "" },
  name: { type: String, default: "" },
  number: { type: Number, default: 0 },
  deviceID: { type: String, default: "" },
  categories: { type: Array, default: [] },
  plans: { type: Array, default: [] },
  saved: { type: Array, default: [] },
  friends: { type: Array, default: [] },
  chatID: { type: String, default: "" },
  lat: { type: Number, default: 0 },
  lon: { type: Number, default: 0 },
  expoPushToken: { type: String, default: "" },
  profileImg: { type: String, default: "" },
});

module.exports = UserSchema;
