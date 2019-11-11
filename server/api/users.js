const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

const isMe = (req, res, next) => {
  if (Number(req.params.userId) === Number(req.user.id)) {
    next()
  } else {
    res.status(403).send("Where do you think you're going?")
  }
}

//router to get all users
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

//router for when a user wants to view their own profile:
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user) //returns the users as an object that contains email, password, address, etc.
  } catch (err) {
    next(err)
  }
})

//router for when a user wants to edit their info (address/phone, etc.)
router.put('/edit-profile/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const newProperties = {
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone
    }
    await user.update(newProperties, {where: {id: req.params.id}})
    res.json(user)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

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
