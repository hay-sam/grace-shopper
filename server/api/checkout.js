const router = require('express').Router()
const {Order, User, Product} = require('../db/models/index')

router.post('/guest', async (req, res, next) => {
  try {
    const order = await Order.create({totalPrice: req.body.totalPrice})
    await req.session.cart.forEach(async item => {
      const product = await Product.findByPk(item.product.id)
      await order.addProduct(product, {through: {quantity: item.quantity}})
    })
    req.session.cart = []
    res.status(201).send()
  } catch (error) {
    console.error(error)
  }
})

router.post('/user/:userId', async (req, res, next) => {
  try {
    const order = await Order.create({
      totalPrice: req.body.totalPrice,
      userId: req.params.userId
    })
    await req.session.cart.forEach(async item => {
      const product = await Product.findByPk(item.product.id)
      await order.addProduct(product, {through: {quantity: item.quantity}})
    })
    req.session.cart = []
    res.status(201).send()
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
