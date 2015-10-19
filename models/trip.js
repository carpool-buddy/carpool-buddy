var mongoose = require('mongoose');

var tripSchema = mongoose.Schema({
  tripName: String,
  origin: String,
  originTime: String,
  dest: String,
  destTime: String,
  weekDays: String,
  map: String,
  travellers: [{type: ObjectId}],
  seatsLeft: {type: 32-bit integer}
});

module.exports = mongoose.model('Trip', tripSchema);