/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({
	'userID' : { type: String, default: "" },
	'number' : { type: Number, default: 0 },
	'deviceID' : { type: String, default: "" }
});

module.exports = AdminUserSchema;
