module.exports = {
  type: 'object',
  properties: {
    firstName: { type: 'string', maxLength: 100 },
    lastName: { type: 'string', maxLength: 100 },
    password: { type: 'string', minLength: 4 },
    login: { type: 'string', minLength: 4}
  }
}
