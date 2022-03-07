const { verify } = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.get('Authorization')?.replace(/Bearer\s/, '');

  if (!token) {
    res.status(400).send("Token wasn't provided")
  }

  verify(token, process.env.KEY, (err, decoded) => {
    if (err) {
      res.status(405).send(err.message)
    }

    next()
  })
}