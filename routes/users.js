/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

var express = require("express");
var router = express.Router();
let users = require("./users/main");

// User general
router.get("/get/:userID", users.get);
router.post("/create", users.create);
router.post("/update/:userID", users.update);
router.get("/doesExist/:userID", users.doesExist);
router.get("/delete/:userID", users.delete);

//User Profile
router.get("/updateName/:userID/:name", users.updateName);

// User categories
router.get("/getCategories/:userID", users.getCategories);
router.post("/updateCategories/:userID", users.updateCategories);
router.get("/clearCategories/:userID", users.clearCategories);
router.post("/addCategories/:userID", users.addCategories);

// User saved
router.get("/getSaved/:userID", users.getSaved);
router.post("/updateSaved/:userID", users.updateSaved);
router.get("/deleteSaved/:userID/:eventID", users.deleteSaved);
router.get("/clearSaved/:userID", users.clearSaved);
router.get("/addSaved/:userID/:placeID", users.addSaved);

// User plans
router.get("/getPlans/:userID", users.getPlans);
router.post("/updatePlans/:userID", users.updatePlans);
router.get("/deletePlans/:userID/:planID", users.deletePlans);
router.get("/clearPlans/:userID", users.clearPlans);
router.post("/addPlans/:userID", users.addPlans);
router.get("/addPlan/:userID/:planID", users.addPlan);

//User chats
router.get("/getChat/:userID", users.getChat);
router.get("/updateChat/:userID/:chatID", users.updateChat);
router.get("/getWelcomeMessage/:userID", users.getWelcomeMessage);

// User token
router.get("/updateToken/:userID/:newToken", users.updateToken);

// Number lookup
router.get("/doesNumberExist/:number", users.doesNumberExist);
router.get("/getByNumber/:number", users.getByNumber);

// Location
router.get("/updateLocation/:userID/:lat/:lon", users.updateLocation);

module.exports = router;
