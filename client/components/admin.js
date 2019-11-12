import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import NotFound from './not-found'

const admin = props => {
  return props.isAdmin ? (
    <div>
      <h1>Welcome Administrator!</h1>
      <div className="admin-links">
        <Link to="/admin/users">View All Users</Link>
        <Link to="/admin/orders">View All Orders</Link>
      </div>
    </div>
  ) : (
    <NotFound />
  )
}

const mapState = state => ({
  isAdmin: !!state.user.isAdmin
})

const connectedAdmin = connect(mapState, null)(admin)

export default connectedAdmin
