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

function codeGen(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

var sendText = (number, code, callback) => {
  client.messages.create({
     body: "Use " + code + " as your verification code for Exire!",
     from: '+14243469443',
     to: number
   })
  .then((message, error) =>
    callback(code)
  ).catch( error => {
    callback(error)
  })
};

module.exports = async function (req, res) {
  if(!req.params.phoneNumber) {
    return res.status(400).send('Missing phoneNumber')
  }
  sendText(req.params.phoneNumber, codeGen(100000, 999999), function(code) {
    res.json({
      code: code
    });
  });
}
