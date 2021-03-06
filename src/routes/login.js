const AuthController = require('../controllers/auth.controller')
const { BadRequestError, WrongCredentialsError } = require('../errors/error')


exports.authenticateUser = async (req, res, next) => {
  const { password, login } = req.body

  if (!password || !login) {
    throw new BadRequestError()
  }

  const user = await AuthController.getByLogin(login)

  if (!user.length) {
    throw new WrongCredentialsError()
  }

  const accessToken = AuthController.authenticate(password, user[0])

  return res.json({ accessToken })
}
