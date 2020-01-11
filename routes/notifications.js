/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

var express = require('express');
var router = express.Router();
let notifications = require('./notifications/main');

router.post('/push/:userID', notifications.push);
router.post('/pushAll', notifications.pushAll);

module.exports = router;
