const router = require('express').Router()
const {User} = require('../db/models')

//router for when a user wants to view their own profile:
router.get('/:id', async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.id)
    res.json(users) //returns the users as an object that contains email, password, address, etc.
  } catch (err) {
    next(err)
  }
})

//router for when a user wants to edit their info (address/phone, etc.)
router.put('/edit-profile/:id', async (req, res, next) => {
  try {
    await User.update(req.body, {where: {id: req.params.id}})
    const user = await User.findByPk(req.params.id)
    res.json({
      message: 'User has been updated',
      user
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
