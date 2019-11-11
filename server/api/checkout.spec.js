const {expect} = require('chai')
const session = require('supertest-session')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Product = db.model('product')

const totalPrice = 12345
const formData = {
  firstName: 'Bob',
  lastName: 'Bobert',
  phoneNumber: '(123)456-7890',
  email: 'imAnEmail@mail.com',
  streetAddress: '101 Sesame St',
  city: 'Valhallah',
  state: 'VA',
  zipcode: '90210'
}
const address = `${formData.streetAddress}, ${formData.city}, ${
  formData.state
}, ${formData.zipcode}`
let testSession
let allProducts

describe('Checkout routes', async () => {
  beforeEach(async () => {
    try {
      await db.sync({force: true})
      await Promise.all([
        Product.create({
          name: 'Unicorn Puffs',
          description:
            'Includes all the vitamins and minerals for growing unicorns',
          price: 400
        }),
        Product.create({
          name: 'Honey Nut Cheerios',
          description: 'For building strong dinosaur bones and muscles!',
          price: 249,
          imageUrl:
            'https://images-na.ssl-images-amazon.com/images/I/51TaBLzGG3L._AC_SY400_.jpg'
        }),
        Product.create({
          name: 'Kix',
          description: 'Kid Tested, Mother Approved',
          price: 399,
          imageUrl:
            'https://images-na.ssl-images-amazon.com/images/I/51q%2BNKNBzSL._SX425_.jpg'
        }),
        Product.create({
          name: 'Wheaties',
          description: 'The Breakfast of Champions',
          price: 199,
          imageUrl:
            'https://images-na.ssl-images-amazon.com/images/I/81iMOFYh7RL._SY550_.jpg'
        })
      ])
      testSession = session(app)
      allProducts = await testSession.get('/api/products').expect(200)

      let cartProducts = [
        {
          product: allProducts.body[0],
          quantity: 3
        },
        {
          product: allProducts.body[1],
          quantity: 1
        },
        {
          product: allProducts.body[2],
          quantity: 9
        },
        {
          product: allProducts.body[3],
          quantity: 2
        }
      ]
      await testSession
        .post('/api/cart')
        .send(cartProducts[2])
        .expect(201)
      await testSession
        .post('/api/cart')
        .send(cartProducts[1])
        .expect(201)
      await testSession
        .post('/api/cart')
        .send(cartProducts[3])
        .expect(201)
      await testSession.post('/api/cart').send(cartProducts[1])
    } catch (err) {
      console.error(err)
    }
  })

  describe('api/cart/checkout/guest', () => {
    it('clears the cart', async () => {
      let res1 = await testSession.get('/api/cart').expect(200)
      expect(res1.body).to.be.an('array')
      expect(res1.body.length).to.be.equal(3)
      await testSession
        .post('/api/cart/checkout/guest')
        .send({formData, totalPrice})
        .expect(201)
      let res2 = await testSession.get('/api/cart').expect(200)
      expect(res2.body).to.be.an('array')
      expect(res2.body.length).to.be.equal(0)
    })
    it('places an order', async () => {
      let res1 = await testSession.get('/api/orders').expect(200)
      expect(res1.body).to.be.an('array')
      expect(res1.body.length).to.be.equal(0)
      await testSession
        .post('/api/cart/checkout/guest')
        .send({formData, totalPrice})
        .expect(201)
      let res2 = await testSession.get('/api/orders').expect(200)
      expect(res2.body).to.be.an('array')
      expect(res2.body.length).to.be.equal(1)
    })
    it('adds all items in cart to the order', async () => {
      await testSession
        .post('/api/cart/checkout/guest')
        .send({formData, totalPrice})
        .expect(201)
      let allOrders = await testSession.get('/api/orders').expect(200)
      expect(allOrders.body).to.be.an('array')
      expect(allOrders.body[0].products.length).to.be.equal(3)
    })

    it('makes an order with the total price', async () => {
      await testSession
        .post('/api/cart/checkout/guest')
        .send({formData, totalPrice})
        .expect(201)
      let allOrders = await testSession.get('/api/orders').expect(200)
      let order = allOrders.body[0]
      expect(order.totalPrice).to.be.equal(totalPrice)
    })
    it('makes an order with the checkout form data', async () => {
      await testSession
        .post('/api/cart/checkout/guest')
        .send({formData, totalPrice})
        .expect(201)
      let allOrders = await testSession.get('/api/orders').expect(200)
      let order = allOrders.body[0]
      expect(order.email).to.be.equal(formData.email)
      expect(order.address).to.be.equal(address)
      expect(order.phoneNumber).to.be.equal(formData.phoneNumber)
      expect(order.firstName).to.be.equal(formData.firstName)
      expect(order.lastName).to.be.equal(formData.lastName)
    })
  })
})
