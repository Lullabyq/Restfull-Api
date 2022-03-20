const AuthController = require('../contollers/auth.controller')
const UsersModel = require('../models/users.model')
const { BadRequestError } = require('../errors/error')


exports.authenticateUser = (req, res, next) => {
  const { password, login } = req.body

  if (!password || !login) {
    return next(new BadRequestError())
  }

  const user = UsersModel.getUserByLogin(login)

  if (!user) {
    return res.status(403).json({ error: 'Wrong password or login' })
  }

  try {
    const accessToken = AuthController.authenticateUser(password, user)

    return res.json({ accessToken })
  } catch (err) {
    return next(err)
  }
}
