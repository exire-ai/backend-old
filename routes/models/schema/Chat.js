/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  'chatID' : { type: String, default: "" },
  'userID' : { type: String, default: "" },
	'chat' : { type: Array, default: [] }
});

module.exports = ChatSchema;
