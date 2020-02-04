/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

var express = require('express');
var router = express.Router();
let external = require('./external/main');

// Login / Homescreen
router.get('/getTicketMaster/:category', external.getTicketMaster);
router.get('/sendText/:userID', external.sendText);

module.exports = router;
