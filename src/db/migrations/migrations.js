/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('login').notNullable()
      table.string('password').notNullable()
    })
    .createTable('employees', (table) => {
      table.increments('id');
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('position').notNullable()
      table.integer('salary').notNullable()
      table.string('birthday')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('users')
    .dropTable('employees')
};
