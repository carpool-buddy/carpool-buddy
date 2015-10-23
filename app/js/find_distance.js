module.exports = function(location1, location2, callback) {
  var distance = require('google-distance');

  distance.apiKey = process.env.GOOGLE_MAPS_API_KEY;
  distance.get(
    {
      origin: location1,
      destination: location2,
      units: 'imperial'
    },

    function (err, data) {
      if (err) return console.log(err);
      callback(parseInt(data.distance));
  });
};