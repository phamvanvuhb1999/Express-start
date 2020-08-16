const express = require('express');
const app = express()

app.get('/', function(req,res){
	res.send('<h1>hello there !</h1>');
});

app.listen(3000, function(){
	console.log('app is listening on port 3000 !');
})