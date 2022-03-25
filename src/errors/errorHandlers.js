exports.errorLogger = (err, req, res, next) => {
  console.error(err)
  next(err)
}

exports.errorResponder = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 400
  const responseBody = 'errors' in err
    ? { errors: err.errors }
    : { error: err.message }

  return res.status(statusCode).json(responseBody)
}
