var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	email: String,
	passsword: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;