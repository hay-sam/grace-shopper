import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'

const ProductItem = props => {
  let product = props.product

  const handleClick = event => {
    event.preventDefault()
    props.addToCart({product: product, quantity: 1})
  }

  return (
    <div>
      <img className="cereal-img" src={product.imageUrl} />
      <h3>{product.name}</h3>
      <button onClick={handleClick}>Add To Cart</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addToCart: cart => dispatch(addToCart(cart))
})

const connectedProductItem = connect(null, mapDispatchToProps)(ProductItem)

export default connectedProductItem
