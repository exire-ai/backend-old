/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  modelDict.plan.find({}, {
    _id: 0,
    planID: 0,
    userID: 0,
    price: 0,
    latitude: 0,
    longitude: 0
  }, {
    limit: 100,
    sort: {
      startUNIX: -1
    }
  }).then(result => {
    res.json(result)
  }).catch(err => {
    var result = []
    res.json(result)
  })
}
