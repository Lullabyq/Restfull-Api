const { v4: uuidv4 } = require('uuid')
const { ServerError } = require('../errors/error')
const EmployeesModel = require('../models/employees.model')


const addId = (emp) => ({ ...emp, id: uuidv4() })

exports.createMany = async (newEmp) => {
  try {
    const newEmployeesWithId = newEmp.map(addId)

    return await EmployeesModel.save(newEmployeesWithId)
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

exports.updateEmployee = async (employee) => {
  try {
    return await EmployeesModel.update(employee)
  } catch (err) {
    throw new ServerError()
  }
}
