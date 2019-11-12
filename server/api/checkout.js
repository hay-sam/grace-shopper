const router = require('express').Router()
const {Order, User, Product} = require('../db/models/index')
const stripe = require('stripe')(process.env.STRIPE_KEY)

router.get('/status', (req, res, next) => {
  if (!req.session.paymentSuccess) {
    req.session.paymentSuccess = false
  }
  res.status(201).send(req.session.paymentSuccess)
})

router.post('/stripe', async (req, res, next) => {
  try {
    const line_items = req.session.cart.map(item => ({
      name: item.product.name,
      description: item.product.description,
      images: [item.product.imageUrl],
      amount: item.product.price,
      currency: 'usd',
      quantity: item.quantity
    }))

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      success_url: process.env.SUCCESS_URL || 'http://localhost:8080/checkout',
      cancel_url: process.env.CANCEL_URL || 'http://localhost:8080/cart'
    })
    req.session.paymentSuccess = true
    res.status(201).send(checkoutSession)
  } catch (err) {
    console.error(err)
  }
})

router.post('/guest', async (req, res, next) => {
  try {
    const formData = req.body.formData
    const address = `${formData.streetAddress}, ${formData.city}, ${
      formData.state
    }, ${formData.zipcode}`
    const order = await Order.create({
      totalPrice: req.body.totalPrice,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      address
    })
    await req.session.cart.forEach(async item => {
      const product = await Product.findByPk(item.product.id)
      await order.addProduct(product, {through: {quantity: item.quantity}})
    })
    req.session.cart = []
    req.session.paymentSuccess = null
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
  }
})

const isSameUser = (req, res, next) => {
  if (Number(req.params.userId) !== Number(req.user.id)) {
    res.status(403).send()
  } else {
    next()
  }
}

router.post('/user/:userId', isSameUser, async (req, res, next) => {
  try {
    const formData = req.body.formData
    const address = `${formData.streetAddress}, ${formData.city}, ${
      formData.state
    }, ${formData.zipcode}`
    const order = await Order.create({
      totalPrice: req.body.totalPrice,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      address,
      userId: req.params.userId
    })
    await req.session.cart.forEach(async item => {
      const product = await Product.findByPk(item.product.id)
      await order.addProduct(product, {through: {quantity: item.quantity}})
    })
    req.session.cart = []
    req.session.paymentSuccess = null
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
