/*#################################################
Developed by: Exire.ai
#################################################*/

var express = require('express');
var router = express.Router();
let foursquare = require('./4square/main');

router.get('/getVenue/:placeID', foursquare.getVenue);
router.post('/getByList', foursquare.getByList);
router.get('/getRecommended/:userID', foursquare.getRecommended);
router.post('/getRecommendedGroup', foursquare.getRecommendedGroup);
router.post('/createPlan', foursquare.createPlan);

module.exports = router;
