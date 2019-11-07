import React from 'react'
import {Link} from 'react-router-dom'

class SingleOrder extends React.Component {
  render() {
    return (
      <div>
        <h1>This is a single order!</h1>
        <Link to="/users/:userId/orders">Return to Orders</Link>
      </div>
    )
  }
}

export default SingleOrder
