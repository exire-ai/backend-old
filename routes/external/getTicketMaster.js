/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

const https = require('https');
const Tokenizer = require('sentence-tokenizer');

let modelDict = require('../models/schema').modelDict;

var getDetails = async function (eventID, callback) {
  var options = {
    hostname: 'app.ticketmaster.com',
    port: 443,
    path: '/discovery/v2/events/' + eventID + '?apikey=9HWknNXeYMhIDqFu9XEWANIclVRDb38f',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const port = options.port == 443 ? https : http;

  let output = '';
  const req = port.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      output += chunk;
    });
    res.on('end', () => {
      let obj = JSON.parse(output);
      callback(obj);
    });
  });
  req.on('error', error => {
    res.send('error: ' + error.message);
  });
  req.end();
};

var getRequest = async function (category, callback) {
  var options = {
    hostname: 'app.ticketmaster.com',
    port: 443,
    path: '/discovery/v2/events.json?apikey=9HWknNXeYMhIDqFu9XEWANIclVRDb38f' + "&keyword=" + category + "&dmaID=345&size=50",
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const port = options.port == 443 ? https : http;

  let output = '';
  const req = port.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      output += chunk;
    });
    res.on('end', () => {
      let obj = JSON.parse(output)["_embedded"]["events"];
      var tempList = []
      for (elem in obj) {
        lat = obj[elem]["_embedded"]["venues"][0]["location"]["latitude"];
        lon = obj[elem]["_embedded"]["venues"][0]["location"]["longitude"];
        if (!(lat >= 40 && lat <= 41 && lon >= -74.5 && lon <= -73.5)) {
          continue;
        }
        getDetails(obj[elem]["id"], function(obj2) {
          var tokenizer = new Tokenizer('Description');
          tokenizer.setEntry("Desc")
          var description = ""
          if (tokenizer.getSentences().length >= 2) {
            description = tokenizer.getSentences()[0] + " " + tokenizer.getSentences()[1];
          } else if (tokenizer.getSentences().length == 1) {
            description = tokenizer.getSentences()[0]
          } else {
            description = obj[elem]["name"]
          }
          title = obj[elem]["name"]
          placeID = title.toLowerCase().replace(/\s/g, '');
          placeID = placeID.replace("'", '');
          placeID = placeID.replace(".", '');
          try {
            date = obj2["dates"]["start"]["dateTime"]
            var tempObj = {
            	'placeID' : placeID,
            	'title' : title,
            	'description' : "temp",
            	'tips' : "temp",
            	'category' : "temp",
            	'subcategory' : "temp",
            	'type' : "temp",
            	'imgURL' : "temp",
              'startUNIX' : "temp",
            	'latitude' : lat,
            	'longitude' : lon,
            	'cost' : obj2["priceRanges"][0]["min"],
            	'tag' : "",
              'ticketURL' : obj2["url"]
            };
            tempList.push(tempObj)
            // console.log(tempObj)
          }
          catch (e) {
            console.log(obj2)
          }
        });
      }
      callback(tempList);
    });
  });
  req.on('error', error => {
    res.send('error: ' + error.message);
  });
  req.end();
};

module.exports = async function (req, res) {
  if (!req.params.category) {
    return res.status(400).send('Missing userID')
  }
  getRequest(req.params.category, function(result) {
    res.send(result)
  });
  // var model = new modelDict.user(req.body)
  // model.save(req.body)
  // .then(result => {
  //   if (result != null) {
  //     res.json(true)
  //   } else {
  //     res.json(false)
  //   }
  // }).catch(err => {
  //   res.status(500).json(err)
  // })
}
