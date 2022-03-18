const { registerUser } = require("../contollers/auth.controller")


exports.registerUser = (req, res, next) => {
  const { password } = req.body

  if (!password) {
    return next(new BadRequestError())
  }

  const token = registerUser(password)

  res.status(201).json({ token })
}
