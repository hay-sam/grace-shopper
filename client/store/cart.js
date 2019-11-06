import axios from 'axios'

const ADDED_TO_CART = 'ADD_TO_CART'
const GOT_CART = 'GOT_CART'
const EDITED_CART = 'EDITED_CART'
const DELETED_PRODUCT = 'DELETED_PRODUCT'

const addedToCart = cart => ({
  type: ADDED_TO_CART,
  cart
})

const gotCart = cart => ({
  type: GOT_CART,
  cart
})

const editedCart = cart => ({
  type: EDITED_CART,
  cart
})

const deletedProduct = cart => ({
  type: DELETED_PRODUCT,
  cart
})

export const addToCart = product => {
  return async function(dispatch) {
    const {data} = await axios.post('/api/cart', product)
    dispatch(addedToCart(data))
  }
}

export const getCart = () => {
  return async function(dispatch) {
    const {data} = await axios.get('/api/cart')
    dispatch(gotCart(data))
  }
}

export const editCart = product => {
  return async function(dispatch) {
    const {data} = await axios.put('/api/cart', product)
    dispatch(editedCart(data))
  }
}

export const deleteCart = product => {
  return async function(dispatch) {
    const {data} = await axios.delete('/api/cart', product)
    dispatch(deletedProduct(data))
  }
}

const initialState = []

const cartReducer = (cart = initialState, action) => {
  switch (action.type) {
    case ADDED_TO_CART:
      return action.cart
    case GOT_CART:
      return action.cart
    default:
      return cart
  }
}

export default cartReducer
