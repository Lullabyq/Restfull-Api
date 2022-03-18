const { authorizeUser } = require('../contollers/auth.controller');
const { BadRequestError } = require('../errors/error');

module.exports = (req, res, next) => {
  const token = req.get('Authorization')?.replace(/Bearer\s/, '');

  if (!token) {
    next(new BadRequestError())
  }

  try {
    authorizeUser()

    return next()
  } catch (err) {
    return next(err)
  }

  // return next(authorizeUser())
}