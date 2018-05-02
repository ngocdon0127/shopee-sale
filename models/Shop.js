var bcrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');

module.exports = function (mongoose) {
  var shopSchema = mongoose.Schema({
    shopeeId: String,
    shopName: String,
    url: String
  });

  var Shop = mongoose.model("Shop", shopSchema);
  return Shop;
}