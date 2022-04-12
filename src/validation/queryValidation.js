const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const { makeValidation } = require('./helpers/makeValidation')
const querySchema = require('./validationSchemas/querySchema')


const ajv = new Ajv({ allErrors: true })
addFormats(ajv)


exports.validate = (query) => {
  const validate = ajv.compile(querySchema)

  return makeValidation(query, validate)
}
