import React from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/orders'

class OrdersView extends React.Component {
  componentDidMount() {
    this.props.getOrders(1)
  }

  render() {
    return (
      <div>
        <h1>These are all your orders!</h1>
        <p>{this.props.orders[0].totalPrice}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  getOrders: userId => dispatch(getOrders(userId))
})

const connectedOrdersView = connect(mapStateToProps, mapDispatchToProps)(
  OrdersView
)

export default connectedOrdersView
