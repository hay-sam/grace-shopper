import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import convertToDollars from '../../utils/utils'

const ProductItem = props => {
  let product = props.product

  const handleClick = event => {
    event.preventDefault()
    props.addToCart({product: product, quantity: 1})
  }

  return (
    <div className="product-item">
      <span className="product-name">{product.name}</span>
      <img className="product-img" src={product.imageUrl} />
      <span className="product-price">
        Price: {convertToDollars(product.price)}
      </span>
      <button onClick={handleClick} className="add-to-cart">
        Add To Cart
      </button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addToCart: cart => dispatch(addToCart(cart))
})

const connectedProductItem = connect(null, mapDispatchToProps)(ProductItem)

export default connectedProductItem
