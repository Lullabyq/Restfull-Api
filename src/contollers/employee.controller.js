const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const employees = require('../db/employee')

exports.getEmployees = (_, res) => {
  res.json(employees)
}

exports.registerEmployee = (req, res, next) => {
  const { password: plainPass } = req.body

  if (!plainPass) {
    next(new BadRequestError())
  }

  const salt = bcrypt.genSaltSync(10)
  const password = bcrypt.hashSync(plainPass, salt)
  const id = employees.length

  employees.push({
    ...req.body,
    id,
    password
  })

  const token = jwt.sign({ sub: id }, process.env.KEY, { expiresIn: 60 * 5 })

  res.json({ token })
}
