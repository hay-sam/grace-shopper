const Sequelize = require('sequelize')
const db = require('../db')
//find way to map through card array to order.addProducts all at once
const OrderProduct = db.define('orderProducts', {
  quantity: {
    type: Sequelize.INTEGER,

    validate: {
      min: 1
    }
  }
})

module.exports = OrderProduct
