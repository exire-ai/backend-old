/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	'userID' : { type: String, default: "" },
	'name' : { type: String, default: "" },
	'number' : { type: Number, default: 0 },
	'deviceID' : { type: String, default: "" },
	'categories' : { type: Array, default: [] },
	'plans' : { type: Array, default: [] },
	'saved' : { type: Array, default: [] },
	'chatID' : { type: String, default: "" },
	'lat' : { type: Number, default: 0},
	'lon' : { type: Number, default: 0},
});

module.exports = UserSchema;
