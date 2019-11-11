/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Order = db.model('order')
const Product = db.model('product')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')

  describe('/api/users/:userId/orders', () => {
    const agent = request.agent(app)

    beforeEach(async () => {
      const cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })
      const sampleProduct = await Product.create({
        name: 'cocoa puffs',
        price: 5
      })
      const order = await Order.create({
        totalPrice: 5
      })
      await order.setUser(cody)
      await order.addProduct(sampleProduct, {through: {quantity: 6}})
    })

    it('GET /api/users/:userId/orders if request is sent by that user', async () => {
      await agent
        .post('/auth/login')
        .send({email: 'cody@puppybook.com', password: 'bones'})

      const res = await agent.get('/api/users/1/orders').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].userId).to.be.equal(1)
    })
  })
}) // end describe('User routes')
