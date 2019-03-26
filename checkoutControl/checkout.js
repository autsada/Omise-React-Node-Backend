const fs = require('fs')
const path = require('path')
const util = require('util')

const omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY
});

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const rootDir = require('../helper/path')

const filePath = path.join(rootDir, 'data', 'internetBankingCharge.json')

const omiseCheckoutCreditCard = async (req, res, next) => {
  try {
    const { email, name, amount, token } = req.body;

    const customer = await omise.customers.create({
      email,
      description: `${name}, id (123)`,
      card: token
    });

    const charge = await omise.charges.create({
      amount: amount,
      currency: "thb",
      customer: customer.id
    });

    res.send({
      authorizeUri: charge.authorize_uri,
      status: charge.status,
      amount: charge.amount / 100
    });
  } catch (err) {
    console.log(err);
  }
  next();
};

const omiseCheckoutInternetBanking = async (req, res, next) => {
  try {
    const { email, name, amount, token } = req.body;

    const charge = await omise.charges.create({
      amount,
      source: token,
      currency: "thb",
      return_uri: "http://localhost:4000/message"
    });

    res.send({ authorizeUri: charge.authorize_uri });
  } catch (err) {
    console.log(err);
  }
  next();
};

const omiseWebHooks = async (req, res, next) => {
  try {
    const { data } = req.body;

    if (data.status === "successful" || data.status === "failed") {
      const charge = {
        id: data.id,
        status: data.status,
        amount: data.funding_amount
      }

      await writeFile(filePath, JSON.stringify(charge))
    }
  } catch (err) {
    console.log(err)
  }
  next()
};

const readFileData = async () => {
  try {
    const chargeData = await readFile(filePath, 'utf8')

    if (!chargeData) {
      return {}
    }

    return JSON.parse(chargeData)
  } catch (err) {
    console.log(err)
  }
}

const getInternetBankingCharge = async (req, res, next) => {
  try {
    const charge = await readFileData()

    res.send({...charge})
    await writeFile(filePath, JSON.stringify({}))
  } catch (err) {
    console.log(err)
  }
  next()
};

module.exports = {
  omiseCheckoutCreditCard,
  omiseCheckoutInternetBanking,
  omiseWebHooks,
  getInternetBankingCharge
};
