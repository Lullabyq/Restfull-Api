const { v4: uuidv4 } = require('uuid')
const { ServerError } = require('../errors/error')
const EmployeesModel = require('../models/employees.model')


const addId = (emp) => ({ ...emp, id: uuidv4() })

exports.createNewEmployees = (newEmp) => {
  try {
    const newEmployeesWithId = Array.isArray(newEmp)
    ? newEmp.map(emp => addId(emp))
    : addId(newEmp)

    EmployeesModel.save(newEmployeesWithId)

    return newEmployeesWithId
  } catch (err) {
    throw new ServerError()
  }
}

// exports.deleteEmployees = (idToDelete) => {
//   employees = employees.filter(emp => emp.id === idToDelete)
// }
