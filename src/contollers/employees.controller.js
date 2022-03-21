const { v4: uuidv4 } = require('uuid')
const EmployeesModel = require('../models/employees.model')


const addId = (emp) => ({ ...emp, id: uuidv4() })

exports.createNewEmployees = (newEmp) => {
  const newEmployeesWithId = Array.isArray(emp)
    ? newEmp.map(emp => addId(emp))
    : addId(newEmp)

  EmployeesModel.save(newEmployeesWithId)

  return
}

// exports.deleteEmployees = (idToDelete) => {
//   employees = employees.filter(emp => emp.id === idToDelete)
// }
