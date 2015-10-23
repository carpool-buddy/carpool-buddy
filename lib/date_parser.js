module.exports = function(dateString) {
  var time = 0;
  // If pm add 12 hours worth of milliseconds
  if (dateString.slice(6, 8) === 'PM') time += (12 * 1000 * 60 * 60);
  // add x hours worth of milliseconds
  time += Number(dateString.slice(0, 2)) * 1000 * 60 * 60;
  // add x minutes worth of milliseconds
  time += Number(dateString.slice(3, 5)) * 1000 * 60;
  return time;
};
