/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  modelDict.chat.find({}, {
    _id: 0
  }).then(result => {
    res.json(result)
  }).catch(err => {
    var result = []
    res.json(result)
  })
}
