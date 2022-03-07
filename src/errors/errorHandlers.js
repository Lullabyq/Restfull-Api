const errorLogger = (err, req, res, next) => {
  console.error(err)
  next(err)
}
const errorResponder = (err, req, res, next) => {
  res.status(err.statusCode).send(err.message)
}

module.exports = { errorLogger, errorResponder }
