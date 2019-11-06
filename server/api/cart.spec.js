const {expect} = require('chai')
const request = require('supertest')

const app = require('../index')

describe('Cart routes', () => {
  describe('/api/cart/', () => {
    const sampleProduct = {
      id: 3,
      name: 'cocoa puffs',
      price: 5
    }
    const cartProduct = {
      product: sampleProduct,
      quantity: 3
    }
    beforeEach(async () => {})

    it('Post /api/cart', async () => {
      const res = await request(app)
        .post('/api/cart')
        .send(cartProduct)
        .expect(201)
      expect(res.body).to.be.an('array')
      expect(res.body[0].product.name).to.be.equal(sampleProduct.name)
    })
  })
})
