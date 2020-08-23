var db = require('../db.js');
//var User = require('../models/users.model.js');


	/*var products = await Product.find();

	res.render('products/index.pug', {
		products: products
	})*/

module.exports.requireAuth = function(req, res, next){
	console.log(req.cookies, req.signedCookies);

		if(!req.signedCookies.userId){
			res.redirect('/auth/login');
			return;
		}

		var user = db.get('users').find({id: req.signedCookies.userId}).value();
		/*var user = User.find().then(function(users){
			var temp = users.filter(function(x){
				if(x.id === req.signedCookies.userId){
					return true;
				}
				
			});
			return temp;
		});*/

		if(user){
			res.redirect('/auth/login');
			return;
		}

		res.locals.user = user;

		next();
};