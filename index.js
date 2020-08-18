const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route.js');
var authRoute = require('./routes/auth.route.js');

var authMiddleware = require('./middlewares/auth.middleware.js');

const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
 
// parse application/json
app.use(bodyParser.json());
//parse cookie
app.use(cookieParser('phamvanvu'));

app.get('/', function(req,res){
	res.render('index.pug', {
		name: 'aaa'
	});
});

app.use(express.static('public'));

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);


app.listen(3000, function(){
	console.log('app is listening on port 3000 !');
});
