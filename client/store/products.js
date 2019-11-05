import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const gotProductsAction = productsArr => ({
  type: GET_PRODUCTS,
  products: productsArr
})

/**
 * THUNK CREATORS
 */

export const gotProductsThunk = () => {
  return async dispatch => {
    const {data} = await axios.get('api/products')
    console.log('in the thunk:', data)
    dispatch(gotProductsAction(data))
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
