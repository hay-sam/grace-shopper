import {expect} from 'chai'
import {getOrders} from './orders'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {orders: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getOrders', () => {
    it('eventually dispatches the GOT ORDERS action', async () => {
      const orders = [
        {
          firstName: 'Cody',
          lastName: 'The Pug',
          email: 'cody@email.com',
          phoneNumber: '123456789',
          address: 'Doggie Treat Lane',
          totalPrice: 5,
          userId: 1
        }
      ]
      mockAxios.onGet('/api/users/1/orders').replyOnce(200, orders)
      await store.dispatch(getOrders(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ORDERS')
      expect(actions[0].orders).to.be.deep.equal(orders)
    })
  })
})
