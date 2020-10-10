const User = require('../models/user');
const braintree = require('braintree');
const { response } = require('express');
require ('dotenv').config()

const gateway = new braintree.BraintreeGateway({
environment: braintree.Environment.Sandbox,
merchantId: process.env.BRAINTREE_MERCHANT_ID,
publicKey: process.env.BRAINTREE_PUBLIC_KEY,
privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

exports.generateToken = (req, res) =>{
  gateway.clientToken.generate({}, function(err, response){
    if(err){
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  })
}

exports.processPayment = (req, res) =>{
  let nonceFromTheClient = req.body.paymentMethodNonce
  let amountFromTheClient = req.body.amount
  
  let newTransaction = gateway.transaction.sale({
    amount: amountFromTheClient,
    paymentMethodNonce: nonceFromTheClient,
    merchantAccountId:"av3n93rz",
    options: {
      submitForSettlement: true
    }
  }, (error, result) =>{
      if(error){
        console.log(error)
        res.status(500).json(error)
      } else {
        res.json(result)
      }
  })
}