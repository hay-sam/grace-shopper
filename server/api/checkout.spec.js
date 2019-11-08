// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const Order = db.model('order')
// const User = db.model('user')

// describe('Checkout routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/checkout/guest', () => {
//     const cart= [
//       {product:{
//         name: 'cocoa puffs',
//         price: 90
//       },
//       quantity:},
//       {product:{
//         name:,
//         price:
//       },
//       quantity:},
//       {product:{
//         name:,
//         price:
//       },
//       quantity:},
//       {product:{
//         name:,
//         price:
//       }
//     ]

//     beforeEach(() => {
//       return Product.create(sampleProduct)
//     })

//     it('GET /api/products', async () => {
//       const res = await request(app)
//         .get('/api/products')
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].name).to.be.equal(sampleProduct.name)
//     })
//   })
// })
