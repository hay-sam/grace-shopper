import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import {singleProductThunk} from '../store/products'
import convertToDollars from '../../utils/utils'

class DetailedProduct extends React.Component {
  componentDidMount() {
    this.props.singleProductThunk()
  }

  handleClick(event) {
    event.preventDefault()
    this.props.addToCart({product: product, quantity: 1})
  }

  render() {
    const {currentProduct} = this.props
    return (
      <div>
        <span className="product-name">{currentProduct.name}</span>
        <img className="product-img" src={currentProduct.imageUrl} />
        <span className="product-price">
          Price: {convertToDollars(currentProduct.price)}
        </span>
        <p>{currentProduct.description}</p>
        <button onClick={handleClick} className="add-to-cart">
          Add To Cart
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.product
})

const mapDispatch = dispatch => ({
  addToCart: () => dispatch(addToCart()),
  singleProductThunk: () => dispatch(singleProductThunk())
})

export default connect(mapState, mapDispatch)(DetailedProduct)
