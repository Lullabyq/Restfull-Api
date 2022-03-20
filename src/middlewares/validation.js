const ValidationController = require('../contollers/validator.controller')


const catchErrors = (callback, next) => {
  try {
    const result = callback()

    if (!result.isValid) {
      return next(result.errors)
    }
  } catch (err) {
    return next(err)
  }
}

exports.userValidation = (req, res, next) => {
  const newUser = req.body

  catchErrors(
    ValidationController.validateUser.bind(null, newUser),
    next
  )

  return next()
}

exports.employeeValidation = (req, res, next) => {
  const newEmployees = req.body

  newEmployees.forEach(emp => {
    catchErrors(
      ValidationController.validateEmployee.bind(null, emp),
      next
    )
  })

  return next()
}
