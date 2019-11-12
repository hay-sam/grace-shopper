import React from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store/allOrders'
import OrdersItem from './orders-item'
import NotFound from './not-found'

class AdminOrders extends React.Component {
  componentDidMount() {
    this.props.getAllOrders()
  }

  render() {
    return !this.props.isAdmin ? (
      <NotFound />
    ) : (
      <div>
        {this.props.allOrders.map(order => (
          <OrdersItem key={order.id} order={order} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allOrders: state.allOrders,
  isAdmin: !!state.user.isAdmin
})

const mapDispatchToProps = dispatch => ({
  getAllOrders: () => dispatch(getAllOrders())
})

const connectedAdminOrders = connect(mapStateToProps, mapDispatchToProps)(
  AdminOrders
)

export default connectedAdminOrders
