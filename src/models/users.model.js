const db = require('../db')


exports.save = async ({ id, password, firstName, lastName, login }) => {
  const res = await db.query(
    'INSERT INTO users (id, password, firstName, lastName, login) values ($1, $2, $3, $4, $5) RETURNING *',
    [id, password, firstName, lastName, login]
  )

  return res.rows[0]
}

exports.getAll = async () => {
  const res = await db.query('SELECT * FROM users')

  return res.rows
}

exports.getByLogin = async (login) => {
  const res = await db.query(
    'SELECT * FROM users where login = $1',
    [login]
  )

  return res.rows[0]
}

exports.checkUniq = async (newUser) => {
  const res = await db.query(
    'SELECT * FROM users where login = $1',
    [newUser.login]
  )

  return !res.rows.length
}
