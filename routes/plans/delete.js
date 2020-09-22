/*#################################################
Developed by: Exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.planID) {
    return res.status(400).send('Missing planID')
  }
  modelDict.plan.remove({
    "planID" : req.params.planID
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
