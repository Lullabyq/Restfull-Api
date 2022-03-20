const AuthController = require("../contollers/auth.controller")
const UsersModel = require('../models/users.model')


exports.registerUser = (req, res, next) => {
  const { password } = req.body

  if (!password) {
    return next(new BadRequestError())
  }

  const token = AuthController.registerUser(req.body)

  res.status(201).json({ token })
}

exports.getUsers = (req, res, next) => {
  const users = UsersModel.getAll()

  res.json({ data: users })
}
