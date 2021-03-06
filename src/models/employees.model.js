const knex = require('../db')
const db = knex('employees')


// exports.save = async (newEmpls) => {
//   const employees = []

//   for (const employee of newEmpls) {
//     const rows = await db
//       .clone()
//       .insert(employee)
//       .returning("*")

//     employees.push(rows[0])
//   }

//   return employees
// }

exports.save = async (employee) => await db
  .clone()
  .insert(employee)
  .returning("*")

exports.getMany = async ({
  limit,
  offset,
  sort,
  order,
  filter
}) => await db
  .clone()
  .select()
  .limit(limit)
  .offset(offset)
  .orderBy(sort, order)
  .whereILike('firstName', `%${filter}%`)
  .orWhereILike('lastName', `%${filter}%`)

exports.getById = async (id) => await db
  .clone()
  .select()
  .where({ id })

exports.delete = async (id) => await db
  .clone()
  .del()
  .where({ id })

exports.update = async (newEmployee) => await db
  .clone()
  .update(newEmployee)
  .where({ id: newEmployee.id })
  .returning("*")

exports.patch = async (newEmployee) => {
  const id = newEmployee.id
  const [dbEmp] = await db.select().where({ id })

  const values = { ...dbEmp, ...newEmployee }

  return await db
    .clone()
    .update(values)
    .where({ id })
    .returning("*")
}
