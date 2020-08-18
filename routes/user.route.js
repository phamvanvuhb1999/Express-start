var express = require('express');
var validate = require('../validate/user.validate.js');

var router = express.Router();

var db = require('../db.js');
var controller = require('../controllers/user.controller.js');


router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.viewid);

router.post('/create', validate.postCreate, controller.postcreate);

module.exports = router;