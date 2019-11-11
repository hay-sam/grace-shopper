import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {gotProductsAction, gotProductsThunk} from './products'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('`gotProductsAction` action creator', () => {
  const productsArr = [
    {name: 'coco puffs', price: 400},
    {name: 'cheerios', price: 350}
  ]
  const gotProducts = gotProductsAction(productsArr)

  it('creates an object with `type` and `products`', () => {
    expect(gotProducts.type).to.equal('GET_PRODUCTS')
    expect(gotProducts.products[1].name).to.equal('cheerios')
  })
})

describe('`gotProductsThunk` thunk creator', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  it('eventually dispatches the `GET_PRODUCTS` action', async () => {
    const productsArr = [
      {name: 'coco puffs', price: 400},
      {name: 'cheerios', price: 350}
    ]
    mockAxios.onGet('/api/products').replyOnce(200, productsArr)
    await store.dispatch(gotProductsThunk())
    const actions = store.getActions()
    expect(actions[0].type).to.be.equal('GET_PRODUCTS')
    expect(actions[0].products).to.be.deep.equal(productsArr)
  })
})
