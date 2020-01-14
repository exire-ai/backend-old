/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  modelDict.newEvent.find({
    }, {"_id" : 0
  }).then(result => {
    if (result != null) {
      res.json(result)
    } else {
      res.json(false)
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}
