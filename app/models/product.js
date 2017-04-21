var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var productSchema   = new Schema({
    name: String,
    quantity: String,
    brand: String,


});

module.exports = mongoose.model('product', productSchema);
