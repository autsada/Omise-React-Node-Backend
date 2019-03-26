const express = require('express');

const {omiseCheckoutCreditCard, omiseCheckoutInternetBanking, omiseWebHooks, getInternetBankingCharge} = require('../checkoutControl/checkout')

const checkoutRoutes = express.Router()

checkoutRoutes.post('/checkout-creditCard', omiseCheckoutCreditCard)
checkoutRoutes.post('/checkout-internetBanking', omiseCheckoutInternetBanking)
checkoutRoutes.post('/webhooks', omiseWebHooks)
checkoutRoutes.get('/bank-charge', getInternetBankingCharge)

module.exports = checkoutRoutes