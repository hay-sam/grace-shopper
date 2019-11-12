const router = require('express').Router()
const {Order, User, Product} = require('../db/models/index')
const stripe = require('stripe')(process.env.STRIPE_KEY)

const stripeCheckout = async (req, res, next) => {
  try {
    const line_items = req.session.cart.map(item => ({
      name: item.product.name,
      description: item.product.description,
      images: [item.product.imageUrl],
      amount: item.product.price,
      currency: 'usd',
      quantity: item.quantity
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      success_url: process.env.SUCCESS_URL || 'http://localhost:8080/products',
      cancel_url: process.env.CANCEL_URL || 'http://localhost:8080/cart'
    })
    req.CHECKOUT_SESSION_ID = session.id
    next()
  } catch (err) {
    console.error(err)
  }
}

router.post('/guest', stripeCheckout, async (req, res, next) => {
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
    res.status(201).send(req.CHECKOUT_SESSION_ID)
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

router.post(
  '/user/:userId',
  isSameUser,
  stripeCheckout,
  async (req, res, next) => {
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
      res.status(201).send(req.CHECKOUT_SESSION_ID)
    } catch (error) {
      console.error(error)
    }
  }
)

module.exports = router
