module.exports = (invalidEmp) => invalidEmp
  .map(em => ({
    message: em.messages,
    user: em.employee
  }))
  .flat(1)