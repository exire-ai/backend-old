/*#################################################
Developed by: Exire.ai
#################################################*/

path = require("path")
const { TWILIO_SID, TWILIO_KEY } = require('../../config');

const accountSid = TWILIO_SID;
const authToken = TWILIO_KEY;
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
