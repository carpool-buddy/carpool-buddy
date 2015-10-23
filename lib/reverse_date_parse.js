module.exports = function(milliseconds) {
  var date = new Date(milliseconds);
  var time = '';
  var amPm;
  var hours;
  var minutes = '';
  if (date.getUTCMinutes() < 10) {
    minutes += '0' + date.getUTCMinutes();
  } else {
    minutes = date.getUTCMinutes();
  }
  if (date.getUTCHours() > 12) {
    amPm = ' PM';
    hours = date.getUTCHours() - 12;
  } else {
    amPm = ' AM';
    hours = date.getUTCHours() || '12';
  }
  time += hours + ":" + minutes + amPm;
  return time;
};

