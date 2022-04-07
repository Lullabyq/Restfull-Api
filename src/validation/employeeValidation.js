const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const { default: ValidationError } = require('ajv/dist/runtime/validation_error')

const employeeSchema = require('./validationSchemas/employeeSchema')
const formatValidationErrors = require('../helpers/formatValidationErrors')


const ajv = new Ajv()
addFormats(ajv)


const makeValidation = (target, validate) => {
  const isValid = validate(target)

  if (!isValid) {
    const errors = formatValidationErrors(validate.errors)

    throw new ValidationError(errors)
  }
}

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
