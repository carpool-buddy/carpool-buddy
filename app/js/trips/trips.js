module.exports = function(app) {
  require('./controllers/trips_controller')(app);
  require('./directives/trip_form_directive')(app);
};
