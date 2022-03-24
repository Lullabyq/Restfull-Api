const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const { BadRequestError } = require('../errors/error')
const EmployeesModel = require('../models/employees.model')
const UsersModel = require('../models/users.model')
const userSchema = require('../validationSchemas/userSchema')
const employeeSchema = require('../validationSchemas/employeeSchema')


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
    const isUniq = await UsersModel.checkUniqUser(newUser)

    if (!isUniq) {
      throw new BadRequestError(`User already exists`)
    }

    const result = validate(newUser)

    if (!result.isValid) {
      return next(result.errors)
    }

    return next()
  } catch (err) {
    return next(err)
  }
}

exports.employeeValidation = (req, res, next) => {
  const newEmployee = req.body
  const validate = ajv.compile(requireAll(employeeSchema))

  if (!EmployeesModel.checkUniqEmployee(newEmployee)) {
    return next(new BadRequestError(
      `Employee ${newEmployee.firstName} ${newEmployee.lastName} already exist`,
      409
    ))
  }

  const result = validate(newEmployee)

  if (!result.isValid) {
    return next(result.errors)
  }

  return next()
}
