require('dotenv').config();
console.log(process.env.SESSION_SECRET);

const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var userRoute = require('./routes/user.route.js');
var productRoute = require('./routes/product.route.js');
var authRoute = require('./routes/auth.route.js');
var cartRoute = require('./routes/cart.route.js');
var transferRoute = require('./routes/transfer.route.js');
var apiProductRoute = require('./api/routes/product.route.js');


var authMiddleware = require('./middlewares/auth.middleware.js');
var sessionMiddleware = require('./middlewares/session.middleware.js');


const app = express();

app.set('view engine', 'pug');
app.set('views', './views')
// parse application/json
app.use(bodyParser.json());
//parse cookie
app.use(cookieParser(process.env.SESSION_SECRET));
//cookie middleware
app.use(sessionMiddleware);



app.get('/', function(req,res){
	res.render('index.pug', {
		name: 'aaa'
	});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(express.static('public'));

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);
app.use('/api/product', apiProductRoute);


app.listen(3000, function(){
	console.log('app is listening on port 3000 !');
});
