var bcrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');

module.exports = function (mongoose) {
  var itemSchema = mongoose.Schema({
    shopeeId: String,
    shopId: String,
    url: String,
    itemName: String,
    price: Number,
    quantity: Number,
    priceHistory: [{
      time: Date,
      price: Number
    }],
    quantityHistory: [{
      time: Date,
      quantity: Number
    }]
  });

  var Item = mongoose.model("Item", itemSchema);
  return Item;
}