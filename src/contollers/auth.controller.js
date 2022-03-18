const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const { WrongCredentialsError } = require('../errors/error')

exports.registerUser = (plainPass) => {
  const salt = bcrypt.genSaltSync(10)
  const password = bcrypt.hashSync(plainPass, salt)

  users.push({
    ...req.body,
    id: uuidv4(),
    password
  })

  return jwt.sign({ sub: id }, process.env.KEY, { expiresIn: 60 * 5 })
}

exports.authenticateUser = (password, user) => {
  if (!bcrypt.compareSync(password, user.password)) {
    throw new WrongCredentialsError()
  }

  const payload = { sub: user.id }

  return jwt.sign(payload, process.env.KEY, { expiresIn: 60 * 5 })
}

exports.authorizeUser = (token) => {
  try {
    jwt.verify(token, process.env.KEY)

    return { isValid: true }
  } catch (err) {
    throw new WrongCredentialsError(err.message)
  }
}
