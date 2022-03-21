const EmployeesController = require('../contollers/employees.controller')
const EmployeesModel = require('../models/employees.model')
const { ServerError } = require('../errors/error')


exports.turnToArray = (req, res, next) => {
  const employees = req.body

  if (!Array.isArray(employees)) {
    req.body = [employees]
  }

  return next()
}

exports.getAllEmployees = (req, res, next) => {
  const employees = EmployeesModel.getAll()

  res.json({ data: employees })
}

exports.getSingleEmployee = (req, res, next) => {
  const { id } = req.params
  const employee = EmployeesModel.getEmployeeById(id)

  res.json({ data: employee })
}

exports.addNewEmployees = (req, res, next) => {
  const newEmployees = req.body

  try {
    EmployeesController.createNewEmployees(newEmployees)

    return res.status(201).json(employees)
  } catch (err) {
    return next(new ServerError())
  }
}

exports.deleteEmployee = (req, res, next) => {
  const { id } = req.params

  EmployeesController.deleteEmployees(id)
}
