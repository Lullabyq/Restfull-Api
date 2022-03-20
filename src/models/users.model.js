const users = require('../db/users')


exports.checkUniqUser = (newUser) => users
  .filter(({ login }) => login === newUser.login)
  .length

exports.save = (user) => {
  users.push(user)
}

exports.getAll = () => users

exports.getUserByLogin = (login) => users.find(person => person.login === login)
