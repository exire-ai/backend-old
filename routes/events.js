/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

var express = require('express');
var router = express.Router();
let events = require('./events/main');

router.get('/get/:placeID', events.get);
router.post('/create', events.create);
router.get('/delete/:placeID', events.delete);
router.post('/update/:placeID', events.update);
router.get('/views/:placeID', events.views);
router.get('/linkClicks/:placeID', events.linkClicks);

router.get('/new', events.new);
router.get('/accept/:placeID', events.accept);
router.get('/discard/:placeID', events.discard);
router.post('/createNew', events.createNew);

// /getMany/:userID/:latitude/:longitude/:price/:unixStart/:amount

// Categories
// Sports
// Concerts
// Shows

// /getNewEvents

module.exports = router;
