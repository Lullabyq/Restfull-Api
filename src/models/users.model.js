const db = require('../db')
const { DBConnectionError } = require('../errors/error')


exports.save = async ({ id, password, firstName, lastName, login }) => {
  try {
    const res = await db.query(
      'INSERT INTO users (id, password, firstName, lastName, login) values ($1, $2, $3, $4, $5) RETURNING *',
      [id, password, firstName, lastName, login]
    )

    return res.rows[0]
  } catch (err) {
    console.log(err.message);

    throw new DBConnectionError()
  }
}

exports.getAll = async () => {
  try {
    const res = await db.query('SELECT * FROM users')

    return res.rows
  } catch (err) {
    console.log(err.message);

    throw new DBConnectionError()
  }
}

exports.getUserByLogin = async (login) => {
  try {
    const res = await db.query(
      'SELECT * FROM users where login = $1',
      [login]
    )

    return res.rows[0]
  } catch (err) {
    console.log(err.message);

    throw new DBConnectionError()
  }
}

exports.checkUniqUser = async (newUser) => {
  try {
    const res = await db.query(
      'SELECT * FROM users where login = $1',
      [newUser.login]
    )

    return !res.rows.length
  } catch (err) {
    console.log(err);
    console.log(err.message);

    throw new DBConnectionError()
  }

}
