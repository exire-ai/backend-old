/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.planID) {
    return res.status(400).send('Missing planID')
  }
  modelDict.plan.replaceOne({
    "planID" : req.params.planID
  }, req.body, {
    _id : 0
  }).then(result => {
    if (result.n == 1) {
      res.json(true)
    } else {
      res.json(false)
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}
