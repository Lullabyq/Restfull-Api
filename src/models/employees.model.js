const employees = require('../db/employees')


const checkUniqFullName = (a, b) => {
  const fullName1 = `${a.firstName}${a.lastName}`.toLowerCase()
  const fullName2 = `${b.firstName}${b.lastName}`.toLowerCase()

  return fullName1 === fullName2
}

exports.checkUniqEmployee = (newEmp) => !employees
  .filter(emp => checkUniqFullName(emp, newEmp)
    && emp.birthday === newEmp.birthday
  )
  .length

exports.save = (newEmpls) => {
  employees.push(...newEmpls)
}

exports.getAll = () => employees

exports.getEmployeeById = (id) => {
  if (!employees.length) return []

  return employees.filter(emp => emp.id === id)
}
