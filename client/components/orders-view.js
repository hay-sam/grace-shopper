import React from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/orders'
import OrdersItem from './orders-item'
import NotFound from './not-found'

class OrdersView extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getOrders(userId)
  }

  render() {
    const orders = this.props.orders
    return !this.props.isLoggedIn ? (
      <NotFound />
    ) : (
      <div className="orders-view">
        <h1>Order History</h1>
        {orders.map(order => {
          return <OrdersItem key={order.id} order={order} />
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  getOrders: userId => dispatch(getOrders(userId))
})

const connectedOrdersView = connect(mapStateToProps, mapDispatchToProps)(
  OrdersView
)

export default connectedOrdersView
