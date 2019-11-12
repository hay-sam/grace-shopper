import axios from 'axios'

/**
 * ACTION TYPES
 */
const SINGLE_PRODUCT = 'SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {name: '', price: 0, description: '', imageUrl: ''}

/**
 * ACTION CREATORS (exported for testing)
 */

const singleProductAction = productObj => ({
  type: SINGLE_PRODUCT,
  product: productObj
})

export const singleProductThunk = productId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(singleProductAction(data))
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
