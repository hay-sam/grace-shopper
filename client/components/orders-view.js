import React from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/orders'
import OrdersItem from './orders-item'

class OrdersView extends React.Component {
  componentDidMount() {
    this.props.getOrders(this.props.match.params.userId)
  }

  render() {
    const orders = this.props.orders
    console.log(orders)
    return (
      <div>
        <h1>These are all your orders!</h1>
        {orders.map(order => {
          return <OrdersItem key={order.id} order={order} />
        })}
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
