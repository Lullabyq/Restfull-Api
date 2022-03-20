const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const { POSITIONS } = require('../constants')
const { BadRequestError } = require('../errors/error')
const EmployeesModel = require('../models/employees.model')
const UsersModel = require('../models/users.model')


const ajv = new Ajv()
addFormats(ajv)

const requireAll = (schema) => ({
  ...schema,
  required: Object.keys(schema.properties)
})

const userSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', maxLength: 100 },
    lastName: { type: 'string', maxLength: 100 },
    password: { type: 'string', minLength: 4 },
    login: { type: 'string', minLength: 4}
  }
}

const employeeSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', maxLength: 100 },
    lastName: { type: 'string', maxLength: 100 },
    birthday: { type: 'string', format: 'date-time' },
    position: { enum: POSITIONS },
    salary: { type: 'number' },
  },
}

exports.validateUser = (newUser) => {
  const validate = ajv.compile(requireAll(userSchema))

  if (!UsersModel.checkUniqUser(newUser)) {
    throw new BadRequestError(`User already exists`)
  }

  const isValid = validate(newUser)

  if (isValid) {
    return { isValid, user: newUser }
  }

  return { isValid, errors: validate.errors }
}

exports.validateEmployee = (newEmployee) => {
  const validate = ajv.compile(requireAll(employeeSchema))

  if (!EmployeesModel.checkUniqEmployee(newEmployee)) {
    throw new BadRequestError(
      `Employee ${newEmployee.firstName} ${newEmployee.lastName} already exist`,
      409
    )
  }

  const isValid = validate(newEmployee)

  if (isValid) {
    return { isValid, employee: newEmployee }
  }

  return { isValid, errors: validate.errors }
}
