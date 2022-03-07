const bcrypt = require('bcryptjs')
const { sign } = require('jsonwebtoken');

const employees = require('../db/employee')
const { BadRequestError } = require('../errors/error')

exports.authenticateEmployee = (req, res, next) => {
  const { password, login } = req.body

  if (!password || !login) {
    return next(new BadRequestError())
  }

  const user = employees.find(person => person.login === login)

  if (!user) {
    return res.status(403).send("User with such login doesn't exist")
  }

  try {
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(403).json('Wrong password')
    }

    const payload = { sub: user.id }
    const accessToken = sign(payload, process.env.KEY, { expiresIn: 60 * 5 })

    return res.json({ accessToken, refreshToken })
  } catch (err) {
    return next(err)
  }
}
