const { faker } = require('@faker-js/faker')
const { POSITIONS } = require('../constants')

const EMPLOYEE_NUMBER = 100

faker.seed(1)

const employees = []

const getSalaryByPositionId = (index) => {
  const min = index * 300 + 100
  const max = index * 400 + 200

  return faker.datatype.number({ min, max })
}

for (let i = 0; i < EMPLOYEE_NUMBER; i++) {
  const position = faker.random.arrayElement(POSITIONS)
  const firstName = faker.name.firstName()
  const salary = getSalaryByPositionId(POSITIONS.indexOf(position))

  employees.push({
    'first_name': firstName,
    'last_name': faker.name.lastName(),
    birthday: faker.date.past(70),
    position,
    salary,
  })

  console.log(employees[i]);
}

module.exports = employees
