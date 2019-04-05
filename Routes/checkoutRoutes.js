const express = require('express')

const {checkoutCreditCard, checkoutInternetBanking, omiseWebHooks, getInternetBankingCharge} = require('../controlller/checkoutControl')

const Route = express.Router()

Route.post('/checkout-credit-card', checkoutCreditCard)
Route.post('/checkout-internet-banking', checkoutInternetBanking)
Route.post('/webhooks', omiseWebHooks)
Route.get('/bank-charge', getInternetBankingCharge)

module.exports = Route