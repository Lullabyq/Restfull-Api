const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const { TOKEN_EXP_TIME } = require('../constants')
const UsersModel = require('../models/users.model')
const { WrongCredentialsError, ServerError } = require('../errors/error')


exports.registerUser = async (userData) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(userData.password, salt)
    const id = uuidv4()
    const user = {...userData, id, password}

    await UsersModel.save(user)

    return jwt.sign(
      { sub: id },
      process.env.JWT_KEY,
      { expiresIn: TOKEN_EXP_TIME }
    )
  } catch (err) {
    throw new ServerError()
  }
}

exports.authenticateUser = (password, user) => {
  if (!bcrypt.compareSync(password, user.password)) {
    throw new WrongCredentialsError()
  }

  return jwt.sign(
    { sub: user.id },
    process.env.JWT_KEY,
    { expiresIn: TOKEN_EXP_TIME }
  )
}

exports.authorizeUser = (token) => {
  try {
    jwt.verify(token, process.env.JWT_KEY)

    return { isValid: true }
  } catch (err) {
    throw new WrongCredentialsError(err.message)
  }
}
