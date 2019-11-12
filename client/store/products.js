import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
// const SINGLE_PRODUCT = 'SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS (exported for testing)
 */
export const gotProductsAction = productsArr => ({
  type: GET_PRODUCTS,
  products: productsArr
})

// const singleProductAction = productObj => ({
//   type: SINGLE_PRODUCT,
//   product: productObj
// })
/**
 * THUNK CREATORS
 */

export const gotProductsThunk = () => {
  return async dispatch => {
    const {data} = await axios.get('api/products')
    dispatch(gotProductsAction(data))
  }
}

// export const singleProductThunk = productId => {
//   return async dispatch => {
//     const {data} = await axios.get(`api/products/${productId}`)
//     dispatch(singleProductAction(data))
//   }
// }
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    // case SINGLE_PRODUCT:
    //   return action.product
    default:
      return state
  }
}
