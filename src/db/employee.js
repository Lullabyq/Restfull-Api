const { faker } = require('@faker-js/faker')
const { SALARY_RANGE, EMPLOYEE_NUMBER } = require('../constants')

faker.seed(1)

const JOB_POSITIONS = Object.keys(SALARY_RANGE)

const employees = []

for (let id = 0; id < EMPLOYEE_NUMBER; id++) {
  const position = faker.random.arrayElement(JOB_POSITIONS)
  const { min, max } = SALARY_RANGE[position]

  employees.push({
    id,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthday: faker.date.past(70),
    position,
    salary: faker.datatype.number(min, max)
  })
}

module.exports = employees
