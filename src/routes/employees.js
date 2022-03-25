const EmployeesController = require('../controllers/employees.controller')


exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await EmployeesController.getMany()

    return res.json({ data: employees })
  } catch (err) {
    return next(err)
  }
}

exports.getSingleEmployee = async (req, res, next) => {
  try {
    const { id } = req.params
    const employee = await EmployeesController.getById(id)

    return res.json({ data: employee })
  } catch (err) {
    return next (err)
  }
}

exports.addNewEmployees = async (req, res, next) => {
  try {
    const newEmployees = req.body
    const employees = await EmployeesController.createMany(newEmployees)

    return res.status(201).json(employees)
  } catch (err) {
    return next(err)
  }
}

exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params

    await EmployeesController.deleteOne(id) // can i send request to model?
  } catch (err) {
    return next(err)
  }
}

exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedEmployee = {
      ...req.body,
      id
    }

    const employee = await EmployeesController.updateEmployee(updatedEmployee)

    return res.status(200).json({ data: employee })
  } catch (err) {
    return next(err)
  }
}
