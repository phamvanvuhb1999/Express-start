var md5 = require('md5');

var db = require('../db.js');


module.exports.login = function(req,res){
	res.render('auth/login.pug');
};


module.exports.postLogin = function(req, res){
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({email: email}).value();
	if(!user){
		res.render('auth/login', {
			errors: [
			'User does not exist.'],
			view: req.body
		});
		return;
	}
	if(user.password !== md5(password)){
		res.render('auth/login', {
			errors: [ 'Wrong password.'],
			view: req.body
		});
		return;
	}
	
	res.cookie('userId', user.id, {signed: true});
	res.redirect('/users');
};