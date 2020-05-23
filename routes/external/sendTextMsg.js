/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

var apn = require('apn');
path = require("path")
var modelDict = require('../models/schema').modelDict;

const accountSid = 'AC18ea0b9d9a7d1679debe2aacba4cb22f';
const authToken = 'd2f95372dc80661ed66333d7aebe7d90';
const client = require('twilio')(accountSid, authToken);

var sendText = (number, message, callback) => {
  client.messages.create({
     body: message,
     from: '+14243469443',
     to: number
   })
  .then((message, error) =>
    callback(true)
  ).catch( error => {
    callback(error)
  })
};

module.exports = async function (req, res) {
  if(!req.params.phoneNumber) {
    return res.status(400).send('Missing phoneNumber')
  }
  sendText(req.params.phoneNumber, req.body.message, function(text) {
    res.json(text);
  });
}
