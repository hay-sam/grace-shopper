import React from 'react'
import {withRouter} from 'react-router'

const OrdersItem = props => {
  const order = props.order

  const handleClick = orderId => {
    props.history.push(`/users/:userId/orders/${orderId}`)
  }

  return (
    <div>
      <h2>Order Number: {order.id}</h2>
      <button onClick={() => handleClick(order.id)}>View Order Details</button>
    </div>
  )
}

export default withRouter(OrdersItem)
