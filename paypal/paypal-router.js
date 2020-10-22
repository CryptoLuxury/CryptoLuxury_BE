const express = require('express');
const paypal = require('paypal-rest-sdk');
const restricted = require('../admins/restricted-middleware')

const router = express.Router()

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AZG3om2STdET85N8LjYaF8vpxPHd2tme1QXRDr9Qu9k1qtxfkPUNWnI7frZ5Flwkmbe9v2fN8305w4Pu',
    'client_secret': process.env.CLIENT_ID
});

function add(data){
    return data
}

router.post('/pay', (req, res) => {
    const data = req.body;

    try {
        add(data)
        .then(info => {
            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": "https://crypto-luxury.herokuapp.com/paypal/success",
                    "cancel_url": "https://crypto-luxury.herokuapp.com/paypal/cancel"
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": `${info.name}`,
                            "sku": `${info.sku}`,
                            "price": `${info.price}`,
                            "currency": "USD",
                            "quantity": `${info.quantity}`
                        }]
                    },
                    "amount": {
                        "currency": "USD",
                        "total": `${info.price}`
                    },
                    "description": `${info.description}`
                }]
            }

            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    for(let i = 0;i < payment.links.length;i++){
                    if(payment.links[i].rel === 'approval_url'){
                        res.redirect(payment.links[i].href);
                    }
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({ message: 'Payment method failed', error: err.message })
        })
  
    }
    catch(err) {
        res.status(500).json({ message: 'Payment method failed', error: err.message })
    }
})

router.get('/success', (req, res) => {
    for (const key in req.query) {
        console.log(key, req.query[key])
    }      
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
    });
  });

  router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router