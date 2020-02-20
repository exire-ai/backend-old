/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

var express = require('express');
var router = express.Router();
let adminUsers = require('./adminUsers/main');

// Admin User general
router.get('/get/:userID', adminUsers.get);
router.post('/create', adminUsers.create);
router.post('/update/:userID', adminUsers.update);
router.get('/doesExist/:userID', adminUsers.doesExist);
router.get('/updateToken/:userID/:newToken', adminUsers.updateToken);

module.exports = router;
