const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Order
