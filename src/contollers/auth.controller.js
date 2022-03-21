const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const { TOKEN_EXP_TIME } = require('../constants')
const UsersModel = require('../models/users.model')
const { WrongCredentialsError } = require('../errors/error')


exports.registerUser = (userData) => {
  const salt = bcrypt.genSaltSync(10)
  const password = bcrypt.hashSync(userData.password, salt)
  const id = uuidv4()
  const user = {...userData, id, password}

  UsersModel.save(user)

  return jwt.sign(
    { sub: id },
    process.env.KEY,
    { expiresIn: TOKEN_EXP_TIME }
  )
}

exports.authenticateUser = (password, user) => {
  if (!bcrypt.compareSync(password, user.password)) {
    throw new WrongCredentialsError()
  }

  return jwt.sign(
    { sub: user.id },
    process.env.KEY,
    { expiresIn: TOKEN_EXP_TIME }
  )
}

exports.authorizeUser = (token) => {
  try {
    jwt.verify(token, process.env.KEY)

    return { isValid: true }
  } catch (err) {
    throw new WrongCredentialsError(err.message)
  }
}
