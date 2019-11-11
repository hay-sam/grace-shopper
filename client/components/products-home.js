import React from 'react'
import {connect} from 'react-redux'
import {gotProductsThunk} from '../store/products'
import ProductItem from './product-item'

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  componentDidMount() {
    this.props.gotProductsThunk()
  }

  render() {
    const {products} = this.props
    return (
      <div>
        <div>
          <h2>All Products Available for Purchase:</h2>
        </div>
        <div className="cereal-container">
          {products.map(product => {
            const productId = product.id
            return (
              <ProductItem
                key={productId}
                product={product}
                className="product-item"
              />
            )
          })}
        </div>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => ({
  gotProductsThunk: () => dispatch(gotProductsThunk())
})

export default connect(mapState, mapDispatch)(AllProducts)
