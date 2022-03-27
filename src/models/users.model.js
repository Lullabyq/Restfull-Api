const knex = require('../db')
const db = knex('users')


exports.save = async ({ password, firstName, lastName, login }) => await db
  .clone()
  .insert({ password, firstName, lastName, login })
  .returning(['id', 'firstName', 'lastName', 'login'])

exports.getAll = async () => await db
  .clone()
  .select('id', 'login', 'firstName', 'lastName')

exports.getByLogin = async (login) => await db
  .clone()
  .select()
  .where({ login })
