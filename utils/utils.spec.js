const {expect} = require('chai')
const convertToDollars = require('./utils')

describe('converToDollars function', () => {
  describe('functions properly', () => {
    it('converts pennies less than 10', () => {
      expect(convertToDollars(5)).to.be.equal('$ 0.05')
    })

    it('converts pennies less than 100', () => {
      expect(convertToDollars(18)).to.be.equal('$ 0.18')
    })

    it('converts pennies more than 100', () => {
      expect(convertToDollars(150)).to.be.equal('$ 1.50')
    })
  })
})
