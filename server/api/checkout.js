const router = require('express').Router()
const {Order, User, Product} = require('../db/models/index')

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
    res.status(201).send()
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
    res.status(201).send()
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
