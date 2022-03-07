const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const { POSITIONS } = require('../constants')
const employees = require('../db/employee')
const { BadRequestError } = require('../errors/error')

const ajv = new Ajv()
addFormats(ajv)

const requireAll = (schema) => ({
  ...schema,
  required: Object.keys(schema.properties)
})

const employeeSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', maxLength: 100 },
    lastName: { type: 'string', maxLength: 100 },
    birthday: { type: 'string', format: 'date-time' },
    position: { enum: POSITIONS },
    salary: { type: 'number' },
    password: { type: 'string', minLength: 4 }
  },
  additionalProperties: { type: 'string' }
}

exports.validateEmployee = (req, res, next) => {
  const validate = ajv.compile(requireAll(employeeSchema))

  if (employees.filter(({ login }) => login === req.body.login).length) {
    return next(
      new BadRequestError(`User already exists`)
    )
  }

  if (validate(req.body)) {
    return next()
  }

  return next(validate.errors)
}
