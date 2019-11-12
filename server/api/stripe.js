const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)
module.exports = router

router.post('/charge', async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: 'jenny.rosen@example.com'
  })
  res.status(201).send(charge)
})

router.post('/checkout', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          name: 'T-shirt',
          description: 'Comfortable cotton t-shirt',
          images: ['https://example.com/t-shirt.png'],
          amount: 500,
          currency: 'usd',
          quantity: 1
        }
      ],
      success_url:
        process.env.SUCCESS_URL ||
        'http://localhost:8080/?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: process.env.CANCEL_URL || 'http://localhost:8080/cart'
    })
    res.status(201).send(session)
  } catch (err) {
    console.error(err)
  }
})
