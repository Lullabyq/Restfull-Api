const employees = require('../db/employees')

exports.getEmployees = (req, res, next) => {
  res.json({ data: employees })
}
