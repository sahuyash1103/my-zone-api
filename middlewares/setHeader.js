module.exports = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "x-auth-token");
  res.header("Access-Control-Expose-Headers", "x-auth-token");
  next();
};
