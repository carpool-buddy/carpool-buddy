var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;


var tripSchema = mongoose.Schema({
  tripName: String,
  origin: String,
  originTime: Number,
  dest: String,
  destTime: Number,
  weekDays: String,
  map: String,
  travelers: [ObjectId],

  seatsLeft: Number
});

module.exports = mongoose.model('Trip', tripSchema);
