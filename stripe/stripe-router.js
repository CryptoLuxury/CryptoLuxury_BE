const express = require('express');
const bodyParser = require("body-parser");

const router = express.Router()

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

router.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());

router.post('/create-checkout-session', async (req, res) => {
    console.log(req.body)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${req.body.name}`,
          },
          unit_amount: `${req.body.price}`,
        },
        quantity: `${req.body.quantity}`,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000/admin',
  });

  res.json({ id: session.id });
});

module.exports = router