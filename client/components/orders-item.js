import React from 'react'
import {withRouter} from 'react-router'
import OrderProductItem from './order-product-item'

class OrdersItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(currentState => ({showDetails: !currentState.showDetails}))
  }

  render() {
    const order = this.props.order
    return (
      <div>
        <h2>Order Number: {order.id}</h2>
        <button onClick={() => this.handleClick(order.id)}>
          View Order Details
        </button>
        {this.state.showDetails
          ? order.products.map(product => (
              <OrderProductItem key={product.id} product={product} />
            ))
          : null}
      </div>
    )
  }
}

export default withRouter(OrdersItem)
