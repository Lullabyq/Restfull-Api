const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { TOKEN_EXP_TIME } = require('../constants')
const UsersModel = require('../models/users.model')
const { WrongCredentialsError, ServerError } = require('../errors/error')


exports.register = async (userData) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(userData.password, salt)
    const newUser = { ...userData, password }

    const [user] = await UsersModel.save(newUser)

    const token = jwt.sign(
      { sub: user.id },
      process.env.JWT_KEY,
      { expiresIn: TOKEN_EXP_TIME }
    )

    return { token, user }
  } catch (err) {
    console.log(err.message);
    throw new ServerError()
  }
}

exports.authenticate = (password, user) => {
  console.log(user);
  if (!bcrypt.compareSync(password, user.password)) {
    throw new WrongCredentialsError()
  }

  return jwt.sign(
    { sub: user.id },
    process.env.JWT_KEY,
    { expiresIn: TOKEN_EXP_TIME }
  )
}

exports.authorize = (token) => {
  try {
    jwt.verify(token, process.env.JWT_KEY)

    return { isValid: true }
  } catch (err) {
    throw new WrongCredentialsError(err.message)
  }
}

exports.getAll = async () => {
  try {
    return await UsersModel.getAll()
  } catch (err) {
    throw new ServerError()
  }
}

exports.getByLogin = async (login) => {
  try {
    return await UsersModel.getByLogin(login)
  } catch (err) {
    console.log(err.message);
    throw new ServerError()
  }
}
