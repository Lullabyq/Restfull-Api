const { default: ValidationError } = require("ajv/dist/runtime/validation_error")
const formatValidationErrors = require("../../helpers/formatValidationErrors")


exports.makeValidation = (target, validate) => {
  const isValid = validate(target)

  if (!isValid) {
    const errors = formatValidationErrors(validate.errors)

    throw new ValidationError(errors)
  }
}
