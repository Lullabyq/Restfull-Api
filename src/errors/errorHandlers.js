exports.errorLogger = (err, req, res, next) => {
  console.error(err)
  next(err)
}

exports.errorResponder = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 400

  let responseBody = { error: err.message }

  if (Array.isArray(err)) {
    const errorsMessages = err.map(e => e.message)

    responseBody = err.length === 1
      ? { error: errorsMessages[0] }
      : { errors: errorsMessages }
  }

  return res.status(statusCode).json(responseBody)
}
