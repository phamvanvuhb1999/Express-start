var db = require('../db.js');

var id = 0; 
module.exports.id = id;

module.exports.index = function(req,res){
	res.render('users/index.pug',{
		users: db.get('users').value()
	});
};

module.exports.search = function(req, res){
	console.log(req.query);
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.indexOf(q) !== -1;
	});
	res.render('users/index', {
		users: matchedUsers
	});
};

module.exports.create = function(req,res){
	res.render('users/create');
};

module.exports.viewid = function(req, res){
	var id = parseInt(req.params.id);
	console.log(id);
	var user = db.get('users').find({id: id}).value();
	res.render('users/view', {
		user: user
	});
};

module.exports.postcreate = function(req,res){
	var temp = {
		id: ++id,
		name: req.body.name
	}
	console.log(temp);
	db.get('users').push(temp).write();
	res.redirect('/users');
};