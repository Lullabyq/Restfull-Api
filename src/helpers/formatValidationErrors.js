module.exports = (err) => ({
  message: `${err[0].instancePath.slice(1)} ${err[0].message}`
})
