const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const employeeSchema = require('./validationSchemas/employeeSchema')
const makeValidation = require('./helpers/makeValidation')


const ajv = new Ajv({ allErrors: true })
addFormats(ajv)


exports.create = (emp) => {
  const validate = ajv.compile(employeeSchema.strict)

  return makeValidation(emp, validate)
}

exports.update = (emp) => {
  const validate = ajv.compile(employeeSchema.strict)

  return makeValidation(emp, validate)
}

exports.patch = (emp) => {
  const validate = ajv.compile(employeeSchema.basic)

  return makeValidation(emp, validate)
}
