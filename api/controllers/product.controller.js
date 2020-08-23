var Product = require('../../models/products.model.js');


module.exports.index = async function(req, res){
	/*var page = parseInt(req.query.page) || 1;
	var perPage = 8;

	var start = (page - 1)*perPage;
	var end = page*perPage;

	res.render('products/index.pug', {
		products: db.get('products').value().slice(start, end)
	});*/
	/*Product.find().then(function(products){
		res.render('products/index.pug', {
			products: products
		});
	});*/
	//console.log(res.local.user);
	var products = await Product.find();

	res.json(products);
};