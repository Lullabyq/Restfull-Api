const { faker } = require('@faker-js/faker')
const { v4: uuidv4 } = require('uuid')

const { SALARY_RANGE, EMPLOYEE_NUMBER, POSITIONS } = require('../constants')


faker.seed(1)

let employees = []

for (let i = 0; i < EMPLOYEE_NUMBER; i++) {
  const position = faker.random.arrayElement(POSITIONS)
  const { min, max } = SALARY_RANGE[position]
  const firstName = faker.name.firstName()

  employees.push({
    id: uuidv4(),
    firstName,
    lastName: faker.name.lastName(),
    birthday: faker.date.past(70),
    position,
    salary: faker.datatype.number(min, max),
  })
}

module.exports = employees
