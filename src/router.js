const express = require('express')

const {
  turnToArray,
  getAllEmployees,
  getSingleEmployee,
  addNewEmployees,
  deleteEmployees
} = require('./routes/employees')
const { registerUser, getUsers } = require('./routes/users')
const { authenticateUser } = require('./routes/login')
const authorization = require('./middlewares/authorization')
const { userValidation, employeeValidation } = require('./middlewares/validation')


const router = express.Router()

router.route('/')
  .get((_, res) => res.send('Home page'))

router.route('/login')
  .post(authenticateUser)

router.route('/users')
  .post(userValidation, registerUser)
  .get(getUsers)

router.route('/employees')
  .all(authorization)
  .get(getAllEmployees)
  .post(turnToArray, employeeValidation, addNewEmployees)
  // .delete(deleteEmployees)

router.route('/employees/:id')
  .all(authorization)
  .get(getSingleEmployee)
  .post(turnToArray, employeeValidation, addNewEmployees)
  // .delete(deleteEmployees)

router.route('*')
  .all((_, res) => res.status(404).send('Page not found'))

module.exports = router
