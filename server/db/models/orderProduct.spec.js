const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Product = db.model('product')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('create method', () => {
    let cody
    let sampleProduct
    let order
    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })
      sampleProduct = await Product.create({
        name: 'cocoa puffs',
        price: 5
      })
      order = await Order.create({totalPrice: 5, userId: 1})
    })

    describe('makes order', () => {
      it('has total price', () => {
        expect(order.totalPrice).to.be.equal(5)
      })

      it('is associated with user', () => {
        expect(order.userId).to.be.equal(1)
      })
    })
  })
})

describe('Order Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('makes order', () => {
    let cody
    let sampleProduct
    let order
    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })
      sampleProduct = await Product.create({
        name: 'cocoa puffs',
        price: 5
      })
      order = await Order.create({totalPrice: 5, userId: 1})
      await order.addProduct(sampleProduct, {through: {quantity: 6}})
    })

    it('can get products associated with an order', async () => {
      let products = await order.getProducts()

      expect(products[0].name).to.be.equal('cocoa puffs')
    })
    it('can retrieve quantity from through table', async () => {
      let products = await order.getProducts()

      expect(products[0].orderProducts.quantity).to.be.equal(6)
    })
  })
})
