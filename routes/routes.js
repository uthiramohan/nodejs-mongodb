

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var mongoose   = require('mongoose');
var Product     = require('./app/models/product');

exports.add(function(req, res) {

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
  exports.finding(function(req, res) {
       Product.find(function(err,products ) {
           if (err)
               res.send(err);

           res.json(products);
       });
   });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// START THE SERVER
// =============================================================================
