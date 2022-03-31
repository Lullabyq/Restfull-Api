const EmployeesController = require('../controllers/employees.controller')


exports.getAllEmployees = async (req, res, next) => {
  const { limit, offset, filter, order } = req.query
  const employees = await EmployeesController.getMany(limit, offset, filter, order)

  return res.json(employees)
}

exports.getSingleEmployee = async (req, res, next) => {
  const { id } = req.params
  const employee = await EmployeesController.getById(id)

  return res.json({ data: employee })
}

exports.addNewEmployees = async (req, res, next) => {
  const newEmployees = req.body
  const employees = await EmployeesController.createMany(newEmployees)

  return res.status(201).json(employees)
}

exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params

  await EmployeesController.deleteOne(id)

  return res.status(200).json({})
}

exports.updateEmployee = async (req, res, next) => {
  const { id } = req.params
  const emp = req.body[0]

  const updatedEmployee = { ...emp, id }
  const [employee] = await EmployeesController.update(updatedEmployee)

  return res.status(200).json(employee)
}

exports.patchEmployee = async (req, res, next) => {
  const { id } = req.params
  const emp = req.body[0]

  const updatedEmployee = { ...emp, id }
  const [employee] = await EmployeesController.patch(updatedEmployee)

  return res.status(200).json(employee)
}
