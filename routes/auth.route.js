var express = require('express');
//var validate = require('../validate/user.validate.js');
//var db = require('../db.js');
var controller = require('../controllers/auth.controller.js');

var router = express.Router();
router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;