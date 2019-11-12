import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import {singleProductThunk} from '../store/detailed-product'
import convertToDollars from '../../utils/utils'
import {toast} from 'react-toastify'

class DetailedProduct extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    let productId = this.props.match.params.id
    this.props.singleProductThunk(productId)
  }

  handleClick(event) {
    event.preventDefault()
    let product = this.props.product
    this.props.addToCart({product: product, quantity: 1})
    toast.success(`${product.name} added to cart!`)
  }

  render() {
    const {product} = this.props

    return (
      <div className="detailed-product-container fake-button">
        <img className="single-product-img" src={product.imageUrl} />
        <div className="single-product-info">
          <h3 className="single-product-name">{product.name}</h3>
          <p className="single-product-price">
            Price: {convertToDollars(product.price)}
          </p>
          <p>{product.description}</p>
          <button
            onClick={event => this.handleClick(event)}
            className="add-to-cart"
          >
            Add To Cart
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.detailedProduct
})

const mapDispatch = dispatch => ({
  addToCart: cart => dispatch(addToCart(cart)),
  singleProductThunk: arg => dispatch(singleProductThunk(arg))
})

export default connect(mapState, mapDispatch)(DetailedProduct)
