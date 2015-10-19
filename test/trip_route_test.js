var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGODB_URL = 'mongodb://localhost/carpool_test';
var mongoose = require('mongoose');
var Trip = require(__dirname + '/../models/trip');
var User = require(__dirname + '/../models/user');
var url = 'localhost:3000/api';

require(__dirname + '/../server');

describe('Trip routes', function() {
  before(function(done) {
    //populate a trip to search for
    var trip = new Trip();
    trip.origin = "origin";
    trip.dest = "dest";
    trip.originTime = 8 * 1000 * 60 * 60;
    trip.destTime = 20 * 1000 * 60 * 60;
    trip.travelers = [mongoose.Types.ObjectId('560d88ab95136958181e421f')];
    trip.save(function(err, data) {
      if (err) throw err;
      var user = new User();
      user.email = "test email";
      user._id = mongoose.Types.ObjectId('560d88ab95136958181e421f');
      user.save(function(err, data) {
        if (err) throw err;
        done();
      });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('should search +/- 30 min', function(done) {
    var tripSearch = {"origin": "origin", "dest": "dest",
                      "originTime": "07:59 AM", // 29 min under
                      "destTime": "08:01 PM"}; // 29 min over
    chai.request(url)
      .get('/trips')
      .send({tripSearch: tripSearch})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.trips[0].origin).to.eql("origin");
        done();
      });
  });

  it('should search trips by user id', function(done) {
    chai.request(url)
      .get('/trips')
      .send({userEmail: "test email"})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.trips[0].origin).to.eql("origin");
        done();
      });
  });
});