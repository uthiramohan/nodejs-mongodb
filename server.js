// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/productdb'); // connect to our database


var Product     = require('./app/models/product');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our api!' });
});

// more routes for our API will happen here
// on routes that end in /
// ----------------------------------------------------
router.route('/products')

    // create a product (accessed at POST http://localhost:8080/api/)
    .post(function(req, res) {

        var product = new Product();      // create a new instance of the product model
        product.name = req.body.name;
        product.quantity= req.body.quantity;
        product.brand= req.body.brand;

        // set the  name (comes from the request)
        // save the product and check for errors
        product.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'product created!' });
        });

    })
   // get the product with that id (accessed at GET http://localhost:8080/api//:product_id)

    // get all the  (accessed at GET http://localhost:8080/api/)
    .get(function(req, res) {
       Product.find(function(err,products ) {
           if (err)
               res.send(err);

           res.json(products);
       });
   });

router.route('/products/:product_id')
    .get(function(req, res) {
    Product.findById(req.params.product_id, function(err, product) {
      if (err)
        res.send(err);
      res.json(product);
    });
    })

   // update the product with this id (accessed at PUT http://localhost:8080/api//:product_id)
   .put(function(req, res) {
       // use our product model to find the product we want
        Product.findById(req.params.product_id, function(err, product) {
        console.log(req.params.product_id);
            if (err)
                res.send(err);

            product.name = req.body.name;  // update the  info
            product.quantity= req.body.quantity;
            product.brand= req.body.brand;
            // save the product
            product.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'product updated!' });
            });

        });
    })

	// delete the prouct with this id
	.delete(function(req, res) {
		Product.remove({
			_id: req.params.product_id
		}, function(err, product) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
