import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import convertToDollars from '../../utils/utils'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

const ProductItem = props => {
  let product = props.product

  const handleClick = event => {
    event.preventDefault()
    props.addToCart({product: product, quantity: 1})
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="product-item fake-button">
      <span className="product-name">{product.name}</span>
      <img className="product-img" src={product.imageUrl} />
      <span className="product-price">
        Price: {convertToDollars(product.price)}
      </span>
      <div style={{display: 'flex'}}>
        <Link to={`/products/${product.id}`}>More details</Link>
        <button onClick={handleClick}>Add To Cart</button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addToCart: cart => dispatch(addToCart(cart))
})

const connectedProductItem = connect(null, mapDispatchToProps)(ProductItem)

export default connectedProductItem
