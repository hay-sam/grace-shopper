const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Product = db.model('product')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Create method', () => {
    let order
    beforeEach(async () => {
      let cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })
      let sampleProduct1 = await Product.create({
        name: 'cocoa puffs',
        price: 199
      })
      let sampleProduct2 = await Product.create({
        name: 'chex',
        price: 50
      })
      order = await Order.create({
        firstName: 'Cody',
        lastName: 'The Pug',
        email: 'cody@email.com',
        phoneNumber: '123456789',
        address: 'Doggie Treat Lane',
        totalPrice: 5
      })
      await order.setUser(cody)
      await order.addProduct(sampleProduct1, {through: {quantity: 6}})
      await order.addProduct(sampleProduct2, {through: {quantity: 2}})
    })

    describe('makes order', () => {
      it('has information', () => {
        expect(order.firstName).to.be.equal('Cody')
        expect(order.lastName).to.be.equal('The Pug')
        expect(order.email).to.be.equal('cody@email.com')
        expect(order.phoneNumber).to.be.equal('123456789')
        expect(order.address).to.be.equal('Doggie Treat Lane')
        expect(order.totalPrice).to.be.equal(5)
      })

      it('is associated with user', () => {
        expect(order.userId).to.be.equal(1)
      })

      it('contains products and their corresponding quantities', async () => {
        const products = await order.getProducts()
        expect(products[0].name).to.be.equal('cocoa puffs')
        expect(products[0].orderProducts.quantity).to.be.equal(6)
      })
    })
  })
})
