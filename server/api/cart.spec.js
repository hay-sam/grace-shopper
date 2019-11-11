const {expect} = require('chai')
const request = require('supertest')
const session = require('supertest-session')

const app = require('../index')

describe('Cart routes', () => {
  const sampleProducts = [
    {
      id: 3,
      name: 'cocoa puffs',
      price: 500
    },
    {
      id: 1,
      name: 'chex',
      price: 499
    },
    {
      id: 2,
      name: 'reeses puffs',
      price: 200
    },
    {
      id: 5,
      name: 'waffle crisp',
      price: 150
    },
    {
      id: 4,
      name: 'corn pops',
      price: 250
    }
  ]
  const cartProducts = [
    {
      product: sampleProducts[0],
      quantity: 3
    },
    {
      product: sampleProducts[1],
      quantity: 1
    },
    {
      product: sampleProducts[2],
      quantity: 9
    },
    {
      product: sampleProducts[3],
      quantity: 2
    },
    {
      product: sampleProducts[4],
      quantity: 5
    }
  ]
  let testSession
  describe('POST /api/cart/', () => {
    beforeEach(() => {
      testSession = session(app)
    })

    it('Adds a product to the cart', async () => {
      const res = await testSession
        .post('/api/cart')
        .send(cartProducts[0])
        .expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body[0].product.name).to.be.equal(sampleProducts[0].name)
      expect(res.body[0].product.price).to.be.equal(sampleProducts[0].price)
    })
    it('Adds the right number of products', async () => {
      const res = await testSession
        .post('/api/cart')
        .send(cartProducts[2])
        .expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body[0].quantity).to.be.equal(9)
    })
    it("Won't create duplicate entries if product already in cart", async () => {
      let res1 = await testSession
        .post('/api/cart')
        .send(cartProducts[3])
        .expect(201)
      expect(res1.body).to.be.an('array')
      expect(res1.body.length).to.be.equal(1)
      expect(res1.body[0].quantity).to.be.equal(2)
      let res2 = await testSession
        .post('/api/cart')
        .send(cartProducts[3])
        .expect(201)
      expect(res2.body[0].quantity).to.be.equal(4)
      expect(res2.body.length).to.be.equal(1)
    })
    it("Won't add more than 10 of the same item", async () => {
      let res = await testSession
        .post('/api/cart')
        .send(cartProducts[2])
        .expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body[0].quantity).to.be.equal(9)
      res = await testSession
        .post('/api/cart')
        .send(cartProducts[2])
        .expect(201)
      expect(res.body[0].quantity).to.be.equal(10)
      expect(res.body.length).to.be.equal(1)
    })
    it('Will add a minimum of 1 item to the cart', async () => {
      let res = await testSession
        .post('/api/cart')
        .send({product: sampleProducts[2], quantity: -5})
        .expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body[0].quantity).to.be.equal(1)
    })
    it('Can add multiple products to the cart', async () => {
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
      await testSession
        .post('/api/cart')
        .send(cartProducts[0])
        .expect(201)
      await testSession
        .post('/api/cart')
        .send(cartProducts[4])
        .expect(201)
      await testSession
        .post('/api/cart')
        .send(cartProducts[2])
        .expect(201)
      const res = await testSession
        .post('/api/cart')
        .send(cartProducts[1])
        .expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(5)
      expect(res.body[1].quantity).to.be.equal(2)
      expect(res.body[0].quantity).to.be.equal(10)
      expect(res.body[3].product.name).to.be.equal('cocoa puffs')
    })
  })
  describe('PUT /api/cart/', async () => {
    beforeEach(async () => {
      testSession = session(app)
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
      await testSession
        .post('/api/cart')
        .send(cartProducts[0])
        .expect(201)
      await testSession
        .post('/api/cart')
        .send(cartProducts[4])
        .expect(201)
      await testSession
        .post('/api/cart')
        .send(cartProducts[2])
        .expect(201)
      await testSession
        .post('/api/cart')
        .send(cartProducts[1])
        .expect(201)
    })

    it('Edits the quantity of a cart item', async () => {
      let res = await testSession.get('/api/cart').expect(200)
      expect(res.body[1].quantity).to.be.equal(2)
      res = await testSession
        .put('/api/cart')
        .send({product: sampleProducts[1], quantity: 3})
        .expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body[1].quantity).to.be.equal(3)
    })
    it('Allows for a max quantity of 10', async () => {
      let res = await testSession.get('/api/cart').expect(200)
      expect(res.body[1].quantity).to.be.equal(2)
      res = await testSession
        .put('/api/cart')
        .send({product: sampleProducts[1], quantity: 11})
        .expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body[1].quantity).to.be.equal(10)
    })
    it('Allows for a min quantity of 1', async () => {
      let res = await testSession.get('/api/cart').expect(200)
      expect(res.body[1].quantity).to.be.equal(2)
      res = await testSession
        .put('/api/cart')
        .send({product: sampleProducts[1], quantity: -20})
        .expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body[1].quantity).to.be.equal(1)
    })
  })
  describe('GET /api/cart/', () => {
    beforeEach(async () => {
      testSession = session(app)
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
      await testSession
        .post('/api/cart')
        .send(cartProducts[0])
        .expect(201)
      await testSession
        .post('/api/cart')
        .send(cartProducts[4])
        .expect(201)
      await testSession
        .post('/api/cart')
        .send(cartProducts[2])
        .expect(201)
    })

    it('Returns the cart', async () => {
      let res = await testSession.get('/api/cart').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(5)
      expect(res.body[0].product.name).to.be.equal(sampleProducts[2].name)
    })
  })
  describe('DELETE /api/cart/', () => {
    beforeEach(async () => {
      testSession = session(app)
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
      await testSession
        .post('/api/cart')
        .send(cartProducts[2])
        .expect(201)
    })

    it('Removes all of a given product from the cart', async () => {
      let res = await testSession.get('/api/cart').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(3)
      expect(res.body[0].product.name).to.be.equal(sampleProducts[2].name)
      let res2 = await testSession
        .delete('/api/cart')
        .send(cartProducts[2])
        .expect(201)
      expect(res2.body).to.be.an('array')
      expect(res2.body.length).to.be.equal(2)
      expect(res2.body[0].product.name).to.be.equal(sampleProducts[1].name)
    })
  })
})
