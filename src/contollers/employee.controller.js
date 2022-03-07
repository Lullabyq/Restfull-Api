exports.getEmployees = (req, res, next) => {
  const response = JSON.stringify(employees, null, 2)

  res.setHeader('Content-Type', 'application/json')
  res.send(response)
}
