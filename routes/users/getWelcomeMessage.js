/*#################################################
Developed by: Frank Pinnola
For exire.ai
#################################################*/

let modelDict = require("../models/schema").modelDict;

module.exports = async function (req, res) {
  const welcome = {
    text:
      "I can help you find activities and restaurants based on your preferences!",
  };
  res.json(welcome);
};
