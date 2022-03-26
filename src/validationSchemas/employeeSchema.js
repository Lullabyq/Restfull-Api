const { POSITIONS } = require('../constants')


const basic =  {
  type: 'object',
  properties: {
    firstName: { type: 'string', maxLength: 100 },
    lastName: { type: 'string', maxLength: 100 },
    birthday: { type: 'string', format: 'date-time' },
    position: { enum: POSITIONS },
    salary: { type: 'number' },
  },
}

const strict = {
  required: ['firstName', 'firstName', 'birthday', 'position', 'salary']
}

Object.setPrototypeOf(strict, basic)

module.exports = { basic, strict }
