const AuthController = require("../contollers/auth.controller")
const UsersModel = require('../models/users.model')
const { BadRequestError } = require('../errors/error')


exports.registerUser = async (req, res, next) => {
  try {
    const { password } = req.body

    if (!password) {
      throw new BadRequestError()
    }

    const token = await AuthController.registerUser(req.body)

    res.status(201).json({ token })
  } catch (err) {
    next(err)
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    const users = await UsersModel.getAll()

    res.json({ data: users })
  } catch (err) {
    next(err)
  }
}
