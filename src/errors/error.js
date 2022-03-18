class BadRequestError extends Error {
  constructor(message = `Bad request`) {
    super(message)
    this.statusCode = 400
  }
}

class WrongCredentialsError extends Error {
  constructor(message = 'Wrong login or password') {
    super(message)
    this.statusCode = 403
  }
}

module.exports = { BadRequestError, WrongCredentialsError }
