const users = require('../db/employees')
const validateUser = require('../contollers/validator.controller')

exports.validate = (req, res, next) => {
  try {
    const newUser = req.body
    const result = validateUser(newUser, users)

    if (result.isValid) {
      return next()
    }

    return next(result.errors)
  } catch (err) {
    return next(err)
  }
}
