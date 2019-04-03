const express = require('express')

const {checkoutCreditCard} = require('../controlller/checkoutControl')

const Route = express.Router()

Route.post('/checkout-credit-card', checkoutCreditCard)

module.exports = Route