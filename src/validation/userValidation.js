const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const { default: ValidationError } = require('ajv/dist/runtime/validation_error')

const userSchema = require('./validationSchemas/userSchema')
const formatValidationErrors = require('../helpers/formatValidationErrors')


const ajv = new Ajv()
addFormats(ajv)


exports.register = (newUser) => {
  const validate = ajv.compile(userSchema)
  const isValid = validate(newUser)

  if (!isValid) {
    const error = formatValidationErrors(validate.errors)

    throw new ValidationError(error)
  }
}
