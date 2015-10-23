module.exports = function(err, res, status) {
  var statusMessage = '';
  if(status === 401) {
    statusMessage = "Could not authenticate.";
  }
  if(status === 500) {
    statusMessage = "Server error.";
  }

  return res.status(status || 500).json({msg: statusMessage || "Error. Please try again later."});
};
