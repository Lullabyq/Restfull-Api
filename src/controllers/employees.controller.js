const { ServerError } = require('../errors/error')
const EmployeesModel = require('../models/employees.model')


exports.createMany = async (newEmp) => {
  try {
    return await EmployeesModel.save(newEmp)
  } catch (err) {
    console.log(err.message);
    throw new ServerError()
  }
}

exports.deleteOne = async (id) => {
  try {
    return await EmployeesModel.delete(id)
  } catch (err) {
    throw new ServerError()
  }
}

exports.getMany = async () => {
  try {
    return await EmployeesModel.getMany()
  } catch (err) {
    throw new ServerError()
  }
}

exports.getById = async (id) => {
  try {
    return await EmployeesModel.getById(id)
  } catch (err) {
    throw new ServerError()
  }
}

exports.update = async (employee) => {
  try {
    return await EmployeesModel.update(employee)
  } catch (err) {
    console.log(err.message);
    throw new ServerError()
  }
}
