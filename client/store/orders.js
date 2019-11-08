import axios from 'axios'

// action type
const GOT_ORDERS = 'GOT_ORDERS'

// action creator
const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders
})

// thunk creator

export const getOrders = userId => {
  return async function(dispatch) {
    try {
      const {data} = await axios.get(`/api/users/${userId}/orders`)
      dispatch(gotOrders(data))
    } catch (err) {
      console.error(err.stack)
    }
  }
}

const initialState = []

const ordersReducer = (orders = initialState, action) => {
  switch (action.type) {
    case GOT_ORDERS:
      return action.orders
    default:
      return orders
  }
}

export default ordersReducer
