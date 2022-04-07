const Router = require('express-promise-router')

const {
  getAllEmployees,
  getSingleEmployee,
  addSingleEmployee,
  deleteEmployee,
  updateEmployee,
  patchEmployee
} = require('./routes/employees')
const { registerUser, getUsers, userValidation } = require('./routes/users')
const { authenticateUser } = require('./routes/login')
const authorization = require('./middlewares/authorization')


const router = Router()

router.route('/login')
  .post(authenticateUser)

router.route('/users')
  .get(getUsers)
  .post(userValidation, registerUser)

router.route('/employees')
  .all(authorization)
  .get(getAllEmployees)
  .post(addSingleEmployee)

router.route('/employees/:id')
  .all(authorization)
  .get(getSingleEmployee)
  .put(updateEmployee)
  .patch(patchEmployee)
  .delete(deleteEmployee)

router.route('*')
  .all((_, res) => res.status(404).json({ message: 'Page not found' }))

module.exports = router
