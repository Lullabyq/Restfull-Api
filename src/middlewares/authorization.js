const AuthController = require('../contollers/auth.controller');
const { WrongCredentialsError } = require('../errors/error');


module.exports = (req, res, next) => {
  const token = req.get('Authorization')?.replace(/Bearer\s/, '');

  if (!token) {
    next(new WrongCredentialsError('Try to login first'))
  }

  try {
    AuthController.authorizeUser(token)

    return next()
  } catch (err) {
    return next(err)
  }
}
