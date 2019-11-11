const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  describe('Validations', () => {
    it('requires name', async () => {
      const product = Product.build({price: 400})

      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })
    it('requires name to not be an empty string', async () => {
      const product = Product.build({
        name: '',
        price: 400
      })

      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation notEmpty on name failed')
      }
    })
  })
})
