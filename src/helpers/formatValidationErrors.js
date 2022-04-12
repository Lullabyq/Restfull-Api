module.exports = (errors) => errors
  .map(err => ({
    message: `${err.instancePath.slice(1)} ${err.message}`
  }))