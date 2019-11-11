const router = require('express').Router()
module.exports = router

const cartProductIndex = (cart, product) => {
  return cart.findIndex(elem => elem.product.id === product.id)
}

router.use('/checkout', require('./checkout'))

router.get('/', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  res.status(200).send(req.session.cart)
})

router.post('/', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  let cart = req.session.cart
  let reqQuantity = req.body.quantity
  if (reqQuantity < 1) {
    reqQuantity = 1
  }
  let productIndex = cartProductIndex(cart, req.body.product)
  if (productIndex >= 0) {
    cart[productIndex].quantity += reqQuantity
    if (cart[productIndex].quantity > 10) {
      cart[productIndex].quantity = 10
    }
  } else {
    cart.push({product: req.body.product, quantity: reqQuantity})
  }
  res.status(201).send(req.session.cart)
})

router.put('/', (req, res, next) => {
  let cart = req.session.cart
  let productIndex = cartProductIndex(cart, req.body.product)
  if (productIndex >= 0) {
    cart[productIndex].quantity = req.body.quantity
    if (cart[productIndex].quantity > 10) {
      cart[productIndex].quantity = 10
    }
    if (cart[productIndex].quantity < 1) {
      cart[productIndex].quantity = 1
    }
  }
  res.status(201).send(req.session.cart)
})

router.delete('/', (req, res, next) => {
  let cart = req.session.cart
  console.log(req.body)
  let productIndex = cartProductIndex(cart, req.body.product)
  if (productIndex >= 0) {
    cart.splice(productIndex, 1)
  }
  res.status(201).send(req.session.cart)
})

router.use('/checkout', require('./checkout'))
