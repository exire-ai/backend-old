/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

var express = require('express');
var router = express.Router();
let venuesTickets = require('./venuesTickets/main');

router.get('/get/:placeID', venuesTickets.get);
router.post('/create', venuesTickets.create);
router.get('/delete/:placeID', venuesTickets.delete);
router.post('/update/:placeID', venuesTickets.update);
router.get('/views/:placeID', venuesTickets.views);

module.exports = router;
