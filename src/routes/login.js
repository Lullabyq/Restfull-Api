const AuthController = require('../contollers/auth.controller')
const UsersModel = require('../models/users.model')
const { BadRequestError, WrongCredentialsError } = require('../errors/error')


exports.authenticateUser = async (req, res, next) => {
  try {
    const { password, login } = req.body

    if (!password || !login) {
      throw new BadRequestError()
    }

    const user = await UsersModel.getUserByLogin(login)

    if (!user) {
      throw new WrongCredentialsError()
    }

    const accessToken = AuthController.authenticateUser(password, user)

    return res.json({ accessToken })
  } catch (err) {
    return next(err)
  }
}
