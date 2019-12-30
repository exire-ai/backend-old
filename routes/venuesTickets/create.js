/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  var model = new modelDict.venueTicket(req.body)
  model.save(req.body)
  .then(result => {
    if (result != null) {
      res.json(true)
    } else {
      res.json(false)
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}
