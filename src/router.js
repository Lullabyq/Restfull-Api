const express = require('express')

const { getEmployees } = require('./routes/employees')
const { registerUser } = require('./routes/users')
const { authenticateUser } = require('./routes/login')
const authorization = require('./middlewares/authorization')
const validateNewUser = require('./middlewares/validation')

const router = express.Router()

router.route('/')
  .get((_, res) => res.send('Home page'))

router.route('/login')
  .post(authenticateUser)

router.route('/users')
  .post(validateNewUser, registerUser)

router.route('/employees')
  .get(authorization, getEmployees)

router.route('*')
  .all((_, res) => res.status(404).send('Page not found'))

module.exports = router
