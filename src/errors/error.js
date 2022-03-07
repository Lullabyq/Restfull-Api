class BadRequestError extends Error {
  constructor() {
    super()
    this.message = `Bad request`
    this.statusCode = 400
  }
}

module.exports = { BadRequestError }
