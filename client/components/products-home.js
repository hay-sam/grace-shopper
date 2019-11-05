import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  constructor(props) {
    super()
    this.props = props
  }

  render() {
    const {products} = this.props

    return (
      <div>
        <div>
          <h2>All Products Available for Purchase:</h2>
        </div>
        <div>
          {products.map(product => {
            const productId = product.id
            return (
              <div key={productId}>
                <img src={product.imageUrl} />
                <h3>{products.name}</h3>
                <h4>{products.description}</h4>
              </div>
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

export default connect(mapState)(AllProducts)
