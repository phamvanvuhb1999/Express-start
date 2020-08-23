var express = require('express');
var multer = require('multer');


var validate = require('../validate/user.validate.js');
var db = require('../db.js');
var controller = require('../controllers/user.controller.js');

var router = express.Router();
var upload = multer({dest: './public/uploads/'})

router.get('/', controller.index);

router.get('/cookie', function(req, res, next){
	//res.cookie('user-id', 12345);
	res.send('hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.viewid);

router.post('/create', upload.single('avatar'), validate.postCreate, controller.postcreate);

module.exports = router;