import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import convertToDollars from '../../utils/utils'

const DetailedProduct = props => {
  const handleClick = event => {
    event.preventDefault()
    props.addToCart({product: product, quantity: 1})
  }
  return <div />
}

const mapDispatchToProps = dispatch => ({
  addToCart: cart => dispatch(addToCart(cart))
})

export default connect(null, mapDispatchToProps)(DetailedProduct)
