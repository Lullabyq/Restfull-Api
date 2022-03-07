const { faker } = require('@faker-js/faker')
const { SALARY_RANGE, EMPLOYEE_NUMBER, POSITIONS } = require('../constants')

faker.seed(1)

const employees = []

for (let id = 0; id < EMPLOYEE_NUMBER; id++) {
  const position = faker.random.arrayElement(POSITIONS)
  const { min, max } = SALARY_RANGE[position]
  const firstName = faker.name.firstName()

  employees.push({
    id,
    firstName,
    lastName: faker.name.lastName(),
    birthday: faker.date.past(70),
    position,
    salary: faker.datatype.number(min, max),
    login: firstName
  })
}

module.exports = employees
