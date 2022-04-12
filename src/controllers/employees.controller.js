const { ServerError } = require('../errors/error')
const EmployeesModel = require('../models/employees.model')


exports.create = async (newEmp) => {
  try {
    return await EmployeesModel.save(newEmp)
  } catch (err) {
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

exports.getMany = async (query) => {
  try {
    return await EmployeesModel.getMany(query)
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
    throw new ServerError()
  }
}

exports.patch = async (employee) => {
  try {
    return await EmployeesModel.patch(employee)
  } catch (err) {
    throw new ServerError()
  }
}
