const { ServerError, BadRequestError } = require('../errors/error')
const EmployeesModel = require('../models/employees.model')
const { DB_PAGINATION_LIMIT } = require('../constants')


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

exports.getMany = async (amount, from, filter, order) => {
  try {
    const limit = amount ?? DB_PAGINATION_LIMIT
    const offset = from ?? 0
    const column = filter ?? 'id'
    const direction = order ?? 'asc'

    return await EmployeesModel.getMany({ limit, offset, column, direction })
  } catch (err) {
    if (err instanceof BadRequestError) {
      throw err
    }

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
