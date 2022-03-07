const EMPLOYEE_NUMBER = 5

const SALARY_RANGE = {
  'Junior Software Engineer': {
    min: 800,
    max: 1200
  },
  'Software Engineer': {
    min: 1200,
    max: 1500
  },
  'Senior Software Engineer': {
    min: 2000,
    max: 3000
  },
  'Lead Software Engineer': {
    min: 3000,
    max: 5000
  }
}

const POSITIONS = Object.keys(SALARY_RANGE)

module.exports = { EMPLOYEE_NUMBER, POSITIONS, SALARY_RANGE }
