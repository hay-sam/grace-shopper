const router = require('express').Router()
const {Order, Product, User} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    res.status(403).send("Where do you think you're going?")
  }
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{model: Product}, {model: User}]
    })
    res.status(200).send(orders)
  } catch (err) {
    console.error(err)
  }
})
