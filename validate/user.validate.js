module.exports.postCreate = function(req, res, next){
	var errors = [];

	if(!req.body.name){
		errors.push('Name is required.');
	}
	if(!req.body.number){
		errors.push('Number is required.');
	}
	if(errors.length){
		res.render('users/create', {
			errors: errors,
			view: req.body
		});
		return;
	}
	next();
};