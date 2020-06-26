/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

const { model } = require("mongoose");

module.exports.get = require("./get");
module.exports.create = require("./create");
module.exports.delete = require("./delete");
module.exports.update = require("./update");
module.exports.views = require("./views");
module.exports.linkClicks = require("./linkClicks");
module.exports.createApplication = require("./createApplication");
