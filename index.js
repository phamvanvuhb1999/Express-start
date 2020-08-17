const express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route.js');

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

app.use('/users', userRoute);


app.listen(3000, function(){
	console.log('app is listening on port 3000 !');
});
