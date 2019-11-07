const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

const isMe = (req, res, next) => {
  if (Number(req.params.userId) === Number(req.user.id)) {
    next()
  } else {
    res.status(403).send("Where do you think you're going?")
  }
}

router.get('/:userId/orders', isMe, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: req.params.userId},
      include: [{model: Product}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
