/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.number) {
    return res.status(400).send('Missing number')
  }
  modelDict.user.findOne({
    "number" : req.params.number
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      res.json(true);
    } else {
      res.json(false);
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}
