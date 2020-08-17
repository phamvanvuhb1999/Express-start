const express = require('express');
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
var db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write();

const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
 
// parse application/json
app.use(bodyParser.json());
var id = 2;


app.get('/', function(req,res){
	res.render('index.pug', {
		name: 'aaa'
	});
});

app.get('/users', function(req,res){
	res.render('users/index.pug',{
		users: db.get('users').value()
	});
});

app.get('/users/search', function(req, res){
	console.log(req.query);
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.indexOf(q) !== -1;
	});
	res.render('users/index', {
		users: matchedUsers
	});
});
app.get('/users/create', function(req,res){
	res.render('users/create');
});
app.post('/users/create', function(req,res){
	var temp = {
		id: ++id, name: req.body.name
	}
	db.get('users').push(temp).write()
	res.redirect('/users');
});

app.listen(3000, function(){
	console.log('app is listening on port 3000 !');
});
