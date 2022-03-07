exports.errorLogger = (err, req, res, next) => {
  console.error(err)
  next(err)
}

exports.errorResponder = (err, req, res, next) => {
  return res.status(err.statusCode).send(err.message)
}
