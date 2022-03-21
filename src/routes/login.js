const AuthController = require('../contollers/auth.controller')
const UsersModel = require('../models/users.model')
const { BadRequestError, WrongCredentialsError } = require('../errors/error')


exports.authenticateUser = (req, res, next) => {
  const { password, login } = req.body

  if (!password || !login) {
    return next(new BadRequestError())
  }

  const user = UsersModel.getUserByLogin(login)

  if (!user) {
    return next(new WrongCredentialsError())
  }

  try {
    const accessToken = AuthController.authenticateUser(password, user)

    return res.json({ accessToken })
  } catch (err) {
    return next(err)
  }
}
