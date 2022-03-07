const express = require('express')

const { getEmployees } = require('./contollers/employee.controller')
const { registerEmployee, authenticateEmployee } = require('./contollers/auth.controller')
const authorization = require('./middlewares/authorization')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('Home page')
})

router.route('/registration')
  .post(registerEmployee)

router.route('/authentication')
  .post(authenticateEmployee)

router.route('/employees')
  .get(authorization, getEmployees)

router.use('*', (req, res, next) => {
  res.status(404).send('Page not found')
})

module.exports = router
