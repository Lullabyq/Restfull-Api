const db = require('../db')


exports.save = async (newEmpls) => {
  const employees = []

  for (const em of newEmpls) {
    const res = await db.query(
      `
      INSERT INTO employees (id, firstName, lastName, birthday, position, salary)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [em.id, em.firstName, em.lastName, em.birthday, em.position, em.salary]
    )

    employees.push(res.rows[0])
  }

  return employees
}

exports.getMany = async () => {
  const res = await db.query('SELECT * FROM employees')

  return res.rows
}

exports.getById = async (id) => {
  const res = await db.query('SELECT * FROM employees WHERE id = $1', [id])

  return res.rows[0]
}

exports.delete = async (id) => {
  const res = await db.query('DELETE FROM employees WHERE id = $1', [id])

  return res.rows
}

exports.update = async ({ id, firstName, lastName, birthday, position, salary }) => {
  const response = await db.query('SELECT * FROM employees WHERE id = $1', [id])
  const emp = response.rows[0]

  const res = await db.query(
    `
    UPDATE employees
    SET firstName = $2, lastName = $3, birthday = $4, position = $5, salary = $6
    WHERE id = $1
    `,
    [
      id,
      firstName ?? emp.firstName,
      lastName ?? emp.lastName,
      birthday ?? emp.birthday,
      position ?? emp.position,
      salary ?? emp.salary
    ]
  )

  return res.rows[0]
}
