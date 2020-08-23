var db = require('../db.js');
var shortid = require('shortid');

module.exports.create = function(req, res, next){
	res.render('transfer/create.pug');
};
/*input(type="hidden", name="_csrf", value=csrfToken)  , {
		csrfToken: req.csrfToken()
	}   app.use(csurf({cookie: true}));*/
module.exports.postCreate = function(req, res, next){
	var data = {
		id: shortid.generate(),
		amount: parseInt(req.body.amount),
		accountId: req.body.accountId,
		userId: req.signedCookies.userId
	};
	db.get('transfer').push(data).write();
	res.redirect('/transfer/create');
}