const AuthController = require('../controllers/auth.controller');
const { WrongCredentialsError } = require('../errors/error');


module.exports = (req, res, next) => {
  try {
    const token = req.get('Authorization')?.replace(/Bearer\s/, '');

    if (!token) {
      throw new WrongCredentialsError('Try to login first')
    }

    AuthController.authorize(token)

    return next()
  } catch (err) {
    return next(err)
  }
}
