const router = require('express').Router()
module.exports = router

const cartProductIndex = (cart, product) => {
  return cart.findIndex(elem => elem.product.id === product.id)
}

router.get('/', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  console.log(req.session)
  res.status(200).send(req.session.cart)
})

router.post('/', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  let cart = req.session.cart
  let productIndex = cartProductIndex(cart, req.body.product)
  if (productIndex >= 0) {
    cart[productIndex].quantity += req.body.quantity
  } else {
    cart.push({product: req.body.product, quantity: req.body.quantity})
  }
  console.log(req.session)
  res.status(201).send()
})

router.put('/', (req, res, next) => {
  let cart = req.session.cart
  let productIndex = cartProductIndex(cart, req.body.product)
  if (productIndex >= 0) {
    cart[productIndex].quantity = req.body.quantity
  }
  console.log(req.session)
  res.status(201).send()
})

router.delete('/', (req, res, next) => {
  let cart = req.session.cart
  let productIndex = cartProductIndex(cart, req.body.product)
  if (productIndex >= 0) {
    delete cart[productIndex]
  }
  console.log(req.session)
  res.status(201).send()
})
