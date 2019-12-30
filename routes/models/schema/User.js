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
	'saved' : { type: Array, default: [] }
});

module.exports = UserSchema;
