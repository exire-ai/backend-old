/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

var apn = require('apn');
path = require("path")
const { TWILIO_SID, TWILIO_KEY } = require('../../config');

const accountSid = TWILIO_SID;
const authToken = TWILIO_KEY;
const client = require('twilio')(accountSid, authToken);

var sendText = (number, callback) => {
  client.messages.create({
     body: "Hello, Welcome to Exire! Get started planning your dream night out by downloading the app through Testflight at https://testflight.apple.com/join/8WfE9zq2",
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
  sendText(req.params.phoneNumber, function(text) {
    res.json(text);
  });
}
