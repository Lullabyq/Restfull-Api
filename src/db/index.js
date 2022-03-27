const knex = require('knex')
const knexFile = require('./knexfile')
const knexStringcase = require('knex-stringcase')

const options = knexStringcase(knexFile)

module.exports = knex(options)
