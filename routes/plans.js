/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

var express = require('express');
var router = express.Router();
let plans = require('./plans/main');

// Plan objects
// router.post('/createPlans', plans.createPlans);
// router.get('/getSharedDate/:dateID', plans.getSharedDate);
// router.post('/postVotes/:dateID', plans.postVotes);
// router.get('/getPlans/:dateID', plans.getPlans);

// Login / Homescreen
router.get('/getAllCategories', plans.getAllCategories);
router.get('/getHomescreen/:userID', plans.getHomescreen);

// Events

// Venues

// Venues with Reservation

// Venues with Tickets

module.exports = router;
