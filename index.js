const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

const checkoutRoutes = require('./Routes/checkoutRoutes')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use(checkoutRoutes)

app.listen(80, () => {
  console.log('Server is up')
})
