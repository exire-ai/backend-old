/*#################################################
Developed by: Exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

var findOne = (placeID, res, _callback) => {
  modelDict.newEvent.findOne({
    "eventID" : placeID
  }, { _id : 0,
        __v : 0
  }).then(result => {
    if (result != null) {
      _callback(result);
      return;
    } else {
      console.log("1")
      return res.json(false);
    }
  })
}

module.exports = async function (req, res) {
  if(!req.params.placeID) {
    return res.status(400).send('Missing placeID')
  }
  findOne(req.params.placeID, res, (result) => {
    // console.log("result:", result)
    if (result != false) {
      var tempObj = {};
      for (key in result["_doc"]) {
        tempObj[key] = result[key]
      }
      console.log("tempObj:", tempObj)

      // result2 = Object.assign({}, JSON.parse(result));
      // console.log(result2)
      // line to make it work using request body in meantime
      // tempObj = req.body
      var model = new modelDict.event(tempObj)
      model.save(tempObj)
      .then(result => {
        if (result != null) {
          modelDict.newEvent.deleteOne({
            "eventID" : req.params.placeID
          }).then(result => {
            if (result.n == 1) {
              res.json(true)
            } else {
              res.json(false)
            }
          }).catch(err => {
            res.status(500).json(err)
          })
        } else {
          res.json(false)
        }
      }).catch(err => {
        res.status(500).json(err)
      })
    } else {
      res.json(false)
    }
  });
}
