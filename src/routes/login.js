const { authenticateEmployee } = require('../contollers/auth.controller')
const employees = require('../db/employees')

exports.authenticateUser = (req, res, next) => {
  const { password, login } = req.body

  if (!password || !login) {
    return next(new BadRequestError())
  }

  const user = employees.find(person => person.login === login)

  if (!user) {
    return res.status(403).json({ error: 'Wrong password or login' })
  }

  try {
    const accessToken = authenticateEmployee(password, user)

    return res.json({ accessToken })
  } catch (err) {
    return next(err)
  }
}