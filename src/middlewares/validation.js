const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const { BadRequestError } = require('../errors/error')
const EmployeesController = require('../controllers/employees.controller')
const AuthController = require('../controllers/auth.controller')
const userSchema = require('../validationSchemas/userSchema')
const employeeSchema = require('../validationSchemas/employeeSchema')
const formatInvalidEmpl = require('../helpers/formatInvalidEmpl')


const ajv = new Ajv()
addFormats(ajv)

const requireAll = (schema) => ({
  ...schema,
  required: Object.keys(schema.properties)
})


exports.userValidation = async (req, res, next) => {
  try {
    const newUser = req.body
    const validate = ajv.compile(requireAll(userSchema))
    const isUniq = await AuthController.checkUniq(newUser)

    if (!isUniq) {
      throw new BadRequestError(`User already exists`)
    }

    const isValid = validate(newUser)

    if (!isValid) {
      return next(validate.errors)
    }

    return next()
  } catch (err) {
    return next(err)
  }
}

const validateSingleEmployee = async (newEmployee) => {
  const validate = ajv.compile(requireAll(employeeSchema))
  const isUniq = await EmployeesController.checkUniq(newEmployee)

  if (!isUniq) {
    return {
      employee: newEmployee,
      isValid: false,
      messages: [`Employee ${newEmployee.firstName} ${newEmployee.lastName} already exist`]
    }
  }

  const isValid = validate(newEmployee)
  const messages = validate.errors?.map(err => err.message)

  return {
    employee: newEmployee,
    isValid,
    messages,
  }
}

exports.employeeValidation = async (req, res, next) => {
  try {
    const newEmployees = Array.isArray(req.body) ? req.body : [req.body]
    const employeesWithStatus = await Promise.all(newEmployees.map(async (em) => (
      await validateSingleEmployee(em)
    )))

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
