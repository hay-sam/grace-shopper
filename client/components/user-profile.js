import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import NotFound from './not-found'

//COMPONENT:
const UserProfile = props => {
  const {user} = props

  return !props.isLoggedIn ? (
    <NotFound />
  ) : (
    <div className="profile-container">
      <h2>Hello {user.email}</h2>
      <p>phone: {user.phone ? user.phone : 'No phone on file'}</p>
      <p>address: {user.address ? user.address : 'No address on file'}</p>
      <h3>
        Stay up to date with the Seriously Cereal Store's latest and greatest!
      </h3>
      <div className="fake-button">
        <Link to={`/users/edit-profile/${user.id}`}>
          Click Here to Edit Profile Info
        </Link>
        <Link to={`/users/${user.id}/orders`}>My Orders</Link>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState, null)(UserProfile)
