import React from 'react'
import {withRoute, Redirect, Link} from 'react-router-dom'

const admin = () => {
  return (
    <div>
      <h1>Welcome Administrator!</h1>
      <div className="admin-links">
        <Link to="/admin/users">View All Users</Link>
        <Link to="/admin/orders">View All Orders</Link>
      </div>
    </div>
  )
}

export default admin
