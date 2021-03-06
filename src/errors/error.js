class BadRequestError extends Error {
  constructor(message = `Bad request`, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
  }
}

class WrongCredentialsError extends Error {
  constructor(message = 'Wrong login or password') {
    super(message)
    this.statusCode = 403
  }
}

class ServerError extends Error {
  constructor(message = 'Server Error') {
    super(message)
    this.statusCode = 500
  }
}

class DBConnectionError extends ServerError {
  constructor(message = 'Fail to connect') {
    super(message)
  }
}

module.exports = {
  BadRequestError,
  WrongCredentialsError,
  ServerError,
  DBConnectionError
}
