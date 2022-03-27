require('dotenv').config({ path: '../../.env' })

module.exports = {
  client: 'pg',
  connection: process.env.DB_URL,
  migrations: { directory: './migrations' },
  seeds: { directory: './seeds' },
}
