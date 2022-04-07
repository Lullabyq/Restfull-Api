const AuthController = require("../controllers/auth.controller")
const UserValidation = require('../validation/userValidation')
const { BadRequestError } = require('../errors/error')

exports.userValidation = async (req, res, next) => {
  const newUser = req.body

  const registredUser = await AuthController.getByLogin(newUser.login)

  if (registredUser.length) {
    throw new BadRequestError(`User already exists`)
  }

  UserValidation.register(newUser)

  return next()
}

exports.registerUser = async (req, res, next) => {
  const { password } = req.body

  if (!password) {
    throw new BadRequestError()
  }

  const { token, user } = await AuthController.register(req.body)

  return res.status(201).json({ token, user })
}

exports.getUsers = async (req, res, next) => {
  const users = await AuthController.getAll()

  return res.json(users)
}
