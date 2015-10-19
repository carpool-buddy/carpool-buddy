var expect = require('chai').expect;
var dateParser = require(__dirname + "/../lib/date_parser");

describe('Date Parser', function() {
  it('should take in a string formated "hh:mm AM" and return that time in milliseconds', function() {
    var time1 = "10:30 AM";
    var time2 = "08:00 AM";
    var time3 = "10:30 PM";
    var time4 = "08:00 PM";
    expect(dateParser(time1)).to.eql((10 * 1000 * 60 * 60) + (30 * 1000 * 60));
    expect(dateParser(time2)).to.eql(8 * 1000 * 60 * 60);
    expect(dateParser(time3)).to.eql((22 * 1000 * 60 * 60) + (30 * 1000 * 60));
    expect(dateParser(time4)).to.eql(20 * 1000 * 60 * 60);
  });
});