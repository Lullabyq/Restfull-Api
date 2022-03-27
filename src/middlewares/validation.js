const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const { BadRequestError } = require('../errors/error')
const AuthController = require('../controllers/auth.controller')
const userSchema = require('../validationSchemas/userSchema')
const employeeSchema = require('../validationSchemas/employeeSchema')
const formatInvalidEmpl = require('../helpers/formatInvalidEmpl')
const formatValidationErrors = require('../helpers/formatValidationErrors')


const ajv = new Ajv()
addFormats(ajv)

exports.userValidation = async (req, res, next) => {
  try {
    const newUser = req.body
    const validate = ajv.compile(userSchema)

    const registredUser = await AuthController.getByLogin(newUser.login)

    if (registredUser.length) {
      throw new BadRequestError(`User already exists`)
    }

    const isValid = validate(newUser)

    if (!isValid) {
      const error = formatValidationErrors(validate.errors)

      return next(error)
    }

    return next()
  } catch (err) {
    return next(err)
  }
}

const validateSingleEmployee = async (employee, isStrict) => {
  const validate = isStrict
    ? ajv.compile(employeeSchema.strict)
    : ajv.compile(employeeSchema.basic)

  const isValid = validate(employee)
  const messages = validate.errors?.map(err => err.message)

  return { employee, isValid, messages }
}

exports.employeeValidation = async (req, res, next) => {
  try {
    const isStrictValidation = req.method === 'POST'
    const newEmployees = Array.isArray(req.body)
      ? req.body
      : [req.body]

    const employeesWithStatus = await Promise.all(
      newEmployees.map(async (em) =>
        await validateSingleEmployee(em, isStrictValidation)
      )
    )

    const invalidEmployees = employeesWithStatus.filter(em => !em.isValid)

    if (invalidEmployees.length) {
      throw { errors: formatInvalidEmpl(invalidEmployees) }
    }

    req.body = employeesWithStatus.map(em => em.employee)

    return next()
  } catch (err) {
    return next(err)
  }
}
