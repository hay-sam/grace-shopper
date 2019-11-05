import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './products-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts', () => {
  let testProduct

  beforeEach(() => {
    testProduct = shallow(<AllProducts name="Fruit Loops" />)
  })

  it('renders the name')
})
