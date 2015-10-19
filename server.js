var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jsonParser = require('body-parser').json();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/carpooldb');
var port = process.env.PORT || 3000;
process.env.APP_SECRET = process.env.APP_SECRET || 'unsecure';

var tripRouter = require(__dirname + '/routes/trip_routes');
app.use('/api', tripRouter);

var userRouter = require(__dirname + '/routes/user_routes');
app.use('/api', userRouter);

app.use('/', express.static(__dirname + '/app/public'));

app.listen(port, function() {
  console.log('server up on port: ' + port);
});