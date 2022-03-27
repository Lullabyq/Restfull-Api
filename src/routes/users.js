const AuthController = require("../controllers/auth.controller")
const { BadRequestError } = require('../errors/error')


exports.registerUser = async (req, res, next) => {
  try {
    const { password } = req.body

    if (!password) {
      throw new BadRequestError()
    }

    const { token, user } = await AuthController.register(req.body)

    return res.status(201).json({ token, user })
  } catch (err) {
    return next(err)
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    const users = await AuthController.getAll()

    console.log(users);

    return res.json(users)
  } catch (err) {
    return next(err)
  }
}
