const EmployeesController = require('../controllers/employees.controller')


exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await EmployeesController.getMany()

    return res.json(employees)
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

    await EmployeesController.deleteOne(id)

    return res.status(200).json({})
  } catch (err) {
    return next(err)
  }
}

exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params
    const emp = req.body[0]

    const updatedEmployee = { ...emp, id }
    const [employee] = await EmployeesController.update(updatedEmployee)

    return res.status(200).json(employee)
  } catch (err) {
    return next(err)
  }
}
