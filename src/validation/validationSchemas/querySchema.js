module.exports = {
  type: 'object',
  properties: {
    sort: { enum: ['firstName', 'lastName', 'id', 'salary', 'birthday', 'position'] },
    order: { enum: ['asc', 'desc'] },
  },
}
