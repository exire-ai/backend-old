/*#################################################
Developed by: Exire.ai
#################################################*/

var express = require("express");
var router = express.Router();
let plans = require("./plans/main");

// Login / Homescreen
router.get("/getAllCategories", plans.getAllCategories);
router.get("/getHomescreen/:userID", plans.getHomescreen);

// Will have to update user plan array with id with seperate request!
router.post("/create", plans.create);
router.get("/get/:planID", plans.get);
router.get("/delete/:planID", plans.delete);
router.post("/update/:planID", plans.update);
router.get("/addUser/:planID/:userID", plans.addUser);

router.get("/getByCategory/:category", plans.getByCategory);
router.get("/getByHierCategory/:category", plans.getByHierCategory);
router.get("/getRecommended/:userID", plans.getRecommended);
router.get("/getFoodRecommended/:userID", plans.getFoodRecommended);
router.get("/getActivityRecommended/:userID", plans.getActivityRecommended);
router.get("/getRecentPlans", plans.getRecentPlans);
router.get("/getNearby/:lat/:lon", plans.getNearby);
router.post("/getByList", plans.getByList);
router.post("/getRecommendedGroup", plans.getRecommendedGroup);
router.get("/getByCategoryList/:categories", plans.getByCategoryList);

module.exports = router;
