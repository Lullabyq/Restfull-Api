const EmployeesController = require('../controllers/employees.controller')
const EmployeeValidation = require('../validation/employeeValidation')


exports.getAllEmployees = async (req, res, next) => {
  const { limit, offset, sort, order, firstName, lastName } = req.query
  const filters = {
    firstName,
    lastName
  }

  const employees = await EmployeesController.getMany(
    limit,
    offset,
    sort,
    order,
    filters
  )

  return res.json(employees)
}

exports.getSingleEmployee = async (req, res, next) => {
  const { id } = req.params
  const employee = await EmployeesController.getById(id)

  return res.json(employee)
}

exports.addSingleEmployee = async (req, res, next) => {
  const newEmployee = req.body

  EmployeeValidation.create(newEmployee)

  const employees = await EmployeesController.create(newEmployee)

  return res.status(201).json(employees)
}

exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params

  await EmployeesController.deleteOne(id)

  return res.status(200).json({})
}

exports.updateEmployee = async (req, res, next) => {
  const { id } = req.params
  const emp = req.body

  EmployeeValidation.update(emp)

  const updatedEmployee = { ...emp, id }
  const [employee] = await EmployeesController.update(updatedEmployee)

  return res.status(200).json(employee)
}

exports.patchEmployee = async (req, res, next) => {
  const { id } = req.params
  const emp = req.body

  EmployeeValidation.patch(emp)

  const updatedEmployee = { ...emp, id }
  const [employee] = await EmployeesController.patch(updatedEmployee)

  return res.status(200).json(employee)
}
