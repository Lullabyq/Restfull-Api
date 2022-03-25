module.exports = (req, res, next) => {
  console.log(req.method, req.path, res.statusCode)

  return next()
}
