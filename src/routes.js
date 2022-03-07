const express = require('express')

const { getEmployees, registerEmployee } = require('./contollers/employee.controller')
const { authenticateEmployee } = require('./contollers/auth.controller')
const { validateEmployee } = require('./contollers/validator.controller')
const authorization = require('./middlewares/authorization')

const router = express.Router()

router.route('/')
  .get((_, res) => res.send('Home page'))

router.route('/authentication')
  .post(authenticateEmployee)

router.route('/employees')
  .get(authorization, getEmployees)
  .post(validateEmployee, registerEmployee)

router.route('*')
  .all((_, res) => res.status(404).send('Page not found'))

module.exports = router
