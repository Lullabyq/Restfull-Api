const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const { POSITIONS } = require('../constants')
const { BadRequestError } = require('../errors/error')

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
    birthday: { type: 'string', format: 'date-time' },
    position: { enum: POSITIONS },
    salary: { type: 'number' },
    password: { type: 'string', minLength: 4 }
  },
  additionalProperties: { type: 'string' }
}

exports.validateUser = (newUser, users) => {
  const validate = ajv.compile(requireAll(userSchema))

  if (users.filter(({ login }) => login === newUser.login).length) {
    throw new BadRequestError(`User already exists`)
  }

  const isValid = validate(newUser)

  if (isValid) {
    return { isValid, user: newUser }
  }

  return { isValid, errors: validate.errors }
}
