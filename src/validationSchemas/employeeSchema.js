const { POSITIONS } = require('../constants')


module.exports =  {
  type: 'object',
  properties: {
    firstName: { type: 'string', maxLength: 100 },
    lastName: { type: 'string', maxLength: 100 },
    birthday: { type: 'string', format: 'date-time' },
    position: { enum: POSITIONS },
    salary: { type: 'number' },
  },
}
