const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProducts', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
})

module.exports = OrderProduct
