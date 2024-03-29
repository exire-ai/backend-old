/*#################################################
Developed by: Exire.ai
#################################################*/

var express = require("express");
var router = express.Router();
let venues = require("./venues/main");

router.get("/get/:placeID", venues.get);
router.post("/create", venues.create);
router.get("/delete/:placeID", venues.delete);
router.post("/update/:placeID", venues.update);
router.get("/views/:placeID", venues.views);
router.get("/linkClicks/:placeID", venues.linkClicks);
router.post("/createApplication", venues.createApplication);
router.get("/setValid/:placeID/:isValid", venues.setValid);

module.exports = router;
