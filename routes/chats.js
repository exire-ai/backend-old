/*#################################################
Developed by: Exire.ai
#################################################*/

var express = require('express');
var router = express.Router();
let chats = require('./chats/main');

router.get('/get/:chatID', chats.get);
router.post('/create', chats.create);
router.post('/sendMessage/:chatID', chats.sendMessage);
router.get('/getAll', chats.getAll);

module.exports = router;
