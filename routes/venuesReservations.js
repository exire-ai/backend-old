/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

var express = require('express');
var router = express.Router();
let venuesReservations = require('./venuesReservations/main');

router.get('/get/:placeID', venuesReservations.get);
router.post('/create', venuesReservations.create);
router.get('/delete/:placeID', venuesReservations.delete);
router.post('/update/:placeID', venuesReservations.update);
router.get('/views/:placeID', venuesReservations.views);
router.get('/linkClicks/:placeID', venuesReservations.linkClicks);

module.exports = router;
