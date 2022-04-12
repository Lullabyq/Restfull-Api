const { DB_PAGINATION_LIMIT } = require('../constants')
const QueryValidation = require('../validation/queryValidation')


exports.parseQuery = (query) => {
  const { limit, offset, sort, order, filter } = query

  QueryValidation.validate(query)

  return (
    {
      limit: limit ?? DB_PAGINATION_LIMIT,
      offset: offset ?? 0,
      order: order ?? 'asc',
      filter: filter ?? '',
      sort: sort ?? 'id'
    }
  )
}
