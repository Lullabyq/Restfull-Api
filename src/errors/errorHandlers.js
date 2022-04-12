exports.errorLogger = (err, req, res, next) => {
  console.error(err)
  next(err)
}

exports.errorResponder = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 400
  const responseBody = 'errors' in err
    ? { errors: err.errors }
    : { message: err.message }

  return res.status(statusCode).json(responseBody)
}
