module.exports = function (err, req, res, next) {
  console.error(err.stack);

  res.status(err.status || 500);

  res.json({
    message: err.message,
    error: process.env.NODE_ENV !== "production" ? err.stack : {},
  });
};
