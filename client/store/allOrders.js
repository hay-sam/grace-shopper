import axios from 'axios'

const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'

const gotAllOrders = allOrders => ({
  type: GOT_ALL_ORDERS,
  allOrders
})

export const getAllOrders = () => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(gotAllOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = []

const allOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_ORDERS:
      return action.allOrders
    default:
      return state
  }
}

export default allOrdersReducer
