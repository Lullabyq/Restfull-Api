const initialEmployees = require('../initialEmployees')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      login: 'admin',
      password: '$2a$10$y/9LsdXxdZDE2k5Ny942ZeaLcPA0Twq/5asKZiulIPhN0gfVyzwtu', // 1234
      first_name: "anton",
      last_name: 'antonov'
    }
  ]);
  await knex('employees').del()
  await knex('employees').insert(initialEmployees);
};
