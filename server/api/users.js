const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

//securty check function that will stop the router request if the user is not who they say they are
const isMeOrAdmin = (req, res, next) => {
  if (Number(req.params.userId) === Number(req.user.id)) {
    next()
  } else if (req.user.isAdmin) {
    next()
  } else {
    res.status(403).send("Where do you think you're going?")
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    res.status(403).send("Where do you think you're going?")
  }
}

//router to get all users (excluding the user who makes the request)
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.getAllUsersExceptMe(req.user.id)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//router for when a user wants to view their own profile:
router.get('/:userId', isMeOrAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user) //returns the users as an object that contains email, password, address, etc.
  } catch (err) {
    next(err)
  }
})

//router for when a user wants to edit their info (address/phone, etc.)
router.put('/edit-profile/:userId', isMeOrAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const newProperties = {
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin
    }
    await user.update(newProperties)
    res.json(user)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/:userId/orders', isMeOrAdmin, async (req, res, next) => {
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
