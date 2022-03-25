const Router = require('express-promise-router')

const {
  getAllEmployees,
  getSingleEmployee,
  addNewEmployees,
  deleteEmployee,
  updateEmployee
} = require('./routes/employees')
const { registerUser, getUsers } = require('./routes/users')
const { authenticateUser } = require('./routes/login')
const authorization = require('./middlewares/authorization')
const { userValidation, employeeValidation } = require('./middlewares/validation')


const router = Router()

router.route('/')
  .get((_, res) => res.json({ data: 'Home page' }))

router.route('/login')
  .post(authenticateUser)

router.route('/users')
  .post(userValidation, registerUser)
  .get(getUsers)

router.route('/employees')
  .all(authorization)
  .get(getAllEmployees)
  .post(employeeValidation, addNewEmployees)

router.route('/employees/:id')
  .all(authorization)
  .get(getSingleEmployee)
  .put(employeeValidation, updateEmployee)
  .delete(deleteEmployee)

router.route('*')
  .all((_, res) => res.status(404).json({ message: 'Page not found' }))

module.exports = router
