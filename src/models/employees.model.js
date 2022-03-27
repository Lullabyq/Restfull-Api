const knex = require('../db')
const db = knex('employees')


exports.save = async (newEmpls) => {
  const employees = []

  for (const employee of newEmpls) {
    const rows = await db
      .clone()
      .insert(employee)
      .returning("*")

    employees.push(rows[0])
  }

  return employees
}

exports.getMany = async () => await db
  .clone()
  .select()

exports.getById = async (id) => await db
  .clone()
  .select()
  .where({ id })

exports.delete = async (id) => await db
  .clone()
  .del()
  .where({ id })

exports.update = async (newEmployee) => {
  const id = newEmployee.id
  const [dbEmp] = await db.select().where({ id })

  const values = { ...dbEmp, ...newEmployee }

  return await db
    .clone()
    .update(values)
    .where({ id })
    .returning("*")
}
