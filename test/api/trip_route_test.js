var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGODB_URL = 'mongodb://localhost/carpool_test';
var mongoose = require('mongoose');
var Trip = require(__dirname + '/../../models/trip');
var User = require(__dirname + '/../../models/user');
var url = 'localhost:3000/api';

require(__dirname + '/../../server');

describe('Trip routes', function() {
  before(function(done) {
    //populate a trip to search for
    var trip = new Trip();
    trip._id = mongoose.Types.ObjectId('421d88ab95136958181e421f');
    trip.origin = "Bellevue, WA";
    trip.dest = "Seattle, WA";
    trip.originTime = 8 * 1000 * 60 * 60;
    trip.destTime = 20 * 1000 * 60 * 60;
    trip.travelers = [mongoose.Types.ObjectId('560d88ab95136958181e421f')];
    trip.save(function(err, data) {
      if (err) throw err;
      var user = new User();
      user.email = "test email";
      user._id = mongoose.Types.ObjectId('560d88ab95136958181e421f');
      user.carSeats = 4;
      user.trips = [mongoose.Types.ObjectId('421d88ab95136958181e421f')];
      user.basic.email = 'test email';
      user.generateHash('foobar123', function(err, res) {
        if (err) throw err;
        user.save(function(err, data) {
          if (err) throw err;
          user.generateToken(function(err, token) {
            if (err) throw err;
            this.token = token;
            done();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }.bind(this));
  });

  before(function(done) {
    //populate a trip to search for
    var trip2 = new Trip();
    trip2._id = mongoose.Types.ObjectId('111d88ab95136958181e421f');
    trip2.origin = "Bellevue, WA";
    trip2.dest = "Seattle, WA";
    trip2.originTime = 8 * 1000 * 60 * 60;
    trip2.destTime = 20 * 1000 * 60 * 60;
    trip2.travelers = [mongoose.Types.ObjectId('560d88ab95136958181e421f')];
    trip2.save(function(err, data) {
      if (err) throw err;
      done();
    });
  });

  before(function(done) {
    //populate a trip to search for
    var trip3 = new Trip();
    trip3._id = mongoose.Types.ObjectId('333d88ab95136958181e421f');
    trip3.origin = "Bellevue, WA";
    trip3.dest = "Seattle, WA";
    trip3.originTime = 8 * 1000 * 60 * 60;
    trip3.destTime = 20 * 1000 * 60 * 60;
    trip3.travelers = [mongoose.Types.ObjectId('560d88ab95136958181e421f')];
    trip3.save(function(err, data) {
      if (err) throw err;
      done();
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('should search +/- 30 min', function(done) {
    var tripSearch = {"origin": "Bellevue, WA", "dest": "Seattle, WA",
                      "originTime": "07:59 AM", // 29 min under
                      "destTime": "08:01 PM"}; // 29 min over
    tripSearch = JSON.stringify(tripSearch);
    chai.request(url)
      .get('/trips/' + tripSearch)
      .set('token', this.token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.trips[0].origin).to.not.eql(undefined);
        done();
      });
  });

  it('should search trips by user id', function(done) {
    
    chai.request(url)
      .get('/trips')
      .set('token', this.token)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.trips[0].origin).to.not.eql(undefined);
        done();
      });
  });

  it('should be able to subscribe to a trip', function(done) {
    chai.request(url)
      .put('/trips')
      .set('token', this.token)
      .send({tripConfig: {"remove": "false", "userEmail": "test email", "tripId": "111d88ab95136958181e421f"}})
      .end(function(err, res) {
        if (err) throw err;
        User.findOne({email: "test email"}, function(err, user) {
          expect(err).to.eql(null);
          expect(user.trips.indexOf('111d88ab95136958181e421f')).to.not.eql(-1);
          Trip.findOne({_id: '111d88ab95136958181e421f'}, function(err, trip) {
            expect(err).to.eql(null);
            expect(trip.travelers.indexOf('560d88ab95136958181e421f')).to.not.eql(-1);
            done();
          });
        });
      });
  });

  it('should be able to unsubscribe to a trip', function(done) {
    chai.request(url)
      .put('/trips')
      .set('token', this.token)
      .send({tripConfig: {"remove": "true", "tripId": "111d88ab95136958181e421f"}})
      .end(function(err, res) {
        if (err) throw err;
        User.findOne({email: "test email"}, function(err, user) {
          expect(err).to.eql(null);
          expect(user.trips.indexOf('111d88ab95136958181e421f')).to.eql(-1);
          Trip.findOne({_id: '111d88ab95136958181e421f'}, function(err, trip) {
            expect(err).to.eql(null);
            expect(trip.travelers.indexOf('570d88ab95136958181e421f')).to.eql(-1);
            done();
          });
        });
      });
  });

  it('should be able to make a new trip', function(done) {
    chai.request(url)
      .post('/trips')
      .set('token', this.token)
      .send({"newTrip": {"tripName": "test name", "origin": "Renton, WA",
                    "originTime": "09:00 AM", "dest": "Everett, WA",
                    "destTime": "10:00 AM", "weekDays": "mon",
                    "userEmail": "test email"}}
            )
      .end(function(err, res) {
        Trip.findOne({origin: "Renton, WA"}, function(err, doc) {
          expect(err).to.eql(null);
          expect(doc.dest).to.eql("Everett, WA");
          done();
        });
      });
  });

  it('should be able to delete a trip', function(done) {
    chai.request(url)
      .delete('/trips/' + '333d88ab95136958181e421f')
      .set('token', this.token)
      .end(function(err, res) {
        Trip.findOne({_id: '333d88ab95136958181e421f'}, function(err, data) {
          expect(err).to.eql(null);
          expect(data).to.eql(null);
          done();
        });
      });
  });
});