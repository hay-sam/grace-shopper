const router = require('express').Router()
const {User} = require('../db/models')

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
    next(err)
  }
})

module.exports = router
