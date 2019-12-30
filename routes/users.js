/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

var express = require('express');
var router = express.Router();
let users = require('./users/main');

// User general
router.get('/get/:userID', users.get);
router.post('/create', users.create);
router.post('/update/:userID', users.update);
router.get('/doesExist/:userID', users.doesExist);
router.get('/delete/:userID', users.delete)

// User categories
router.get('/getCategories/:userID', users.getCategories);
router.post('/updateCategories/:userID', users.updateCategories);
router.get('/clearCategories/:userID', users.clearCategories);
router.post('/addCategories/:userID', users.addCategories);

// User saved
router.get('/getSaved/:userID', users.getSaved);
router.post('/updateSaved/:userID', users.updateSaved);
router.get('/deleteSaved/:userID/:eventID', users.deleteSaved);
router.get('/clearSaved/:userID', users.clearSaved);
router.post('/addSaved/:userID', users.addSaved);

// User plans
router.get('/getPlans/:userID', users.getPlans);
router.post('/updatePlans/:userID', users.updatePlans);
router.get('/deletePlans/:userID/:planID', users.deletePlans);
router.get('/clearPlans/:userID', users.clearPlans);
router.post('/addPlans/:userID', users.addPlans);

module.exports = router;
