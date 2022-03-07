require('dotenv').config()

const express = require('express')

const router = require('./routes')
const logger = require('./middlewares/logger')
const { errorLogger, errorResponder } = require('./errors/errorHandlers')

const app = express()

app.use(express.json())
app.use(router, logger)
app.use(errorLogger, errorResponder)

app.listen(process.env.PORT, () => {
  console.log(`Server is running: http://localhost:${process.env.PORT}`)
})
