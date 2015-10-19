var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, unique: true},
  basic: {
    email: String,
    password: String
  },
  carSeats: {type: 32-bit integer},
  trips: [{type: Object id}]
});

userSchema.methods.generateHash = function(password, callback) {
  bcrypt.hash(password, 8, function(err, hash) {
    if (err) return callback(err, hash);
    this.basic.password = hash;
    callback(null, hash);
  }.bind(this));
};

userSchema.methods.compareHash = function(password, callback) {
  bcrypt.compare(password, this.basic.password, callback);
};

userSchema.methods.generateToken = function(callback) {
  eat.encode({id: this._id}, process.env.APP_SECRET, callback);
};

module.exports = mongoose.model('User', userSchema);