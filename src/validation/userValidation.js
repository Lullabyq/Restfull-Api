const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const userSchema = require('./validationSchemas/userSchema')
const { makeValidation } = require('./helpers/makeValidation')


const ajv = new Ajv({ allErrors: true })
addFormats(ajv)


exports.register = (newUser) => {
  const validate = ajv.compile(userSchema)

  return makeValidation(newUser, validate)
}
