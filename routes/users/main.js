/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

// User general
module.exports.get = require("./get");
module.exports.create = require("./create");
module.exports.update = require("./update");
module.exports.doesExist = require("./doesExist");
module.exports.delete = require("./delete");

//User Profile
module.exports.updateName = require("./updateName");

// User categories
module.exports.getCategories = require("./getCategories");
module.exports.updateCategories = require("./updateCategories");
module.exports.clearCategories = require("./clearCategories");
module.exports.addCategories = require("./addCategories");

// User saved
module.exports.getSaved = require("./getSaved");
module.exports.updateSaved = require("./updateSaved");
module.exports.deleteSaved = require("./deleteSaved");
module.exports.clearSaved = require("./clearSaved");
module.exports.addSaved = require("./addSaved");

// User plans
module.exports.getPlans = require("./getPlans");
module.exports.updatePlans = require("./updatePlans");
module.exports.deletePlans = require("./deletePlans");
module.exports.clearPlans = require("./clearPlans");
module.exports.addPlans = require("./addPlans");
module.exports.addPlan = require("./addPlan");

// User chats
module.exports.getChat = require("./getChat");
module.exports.updateChat = require("./updateChat");
module.exports.getWelcomeMessage = require("./getWelcomeMessage");

// User token
module.exports.updateToken = require("./updateToken");

// Number lookup
module.exports.doesNumberExist = require("./doesNumberExist");
module.exports.getByNumber = require("./getByNumber");
