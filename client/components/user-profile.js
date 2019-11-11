import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//COMPONENT:
const UserProfile = props => {
  const {user} = props

  return (
    <div>
      <h2>Hello {user.email}</h2>
      <p>phone: {user.phone ? user.phone : 'No phone on file'}</p>
      <p>address: {user.address ? user.address : 'No address on file'}</p>
      <h3>
        Stay up to date with the Seriously Cereal Store's latest and greatest!
      </h3>
      <Link
        style={{textDecoration: 'underline', color: 'blue'}}
        to={`/users/edit-profile/${user.id}`}
      >
        Click Here to Edit Profile Info
      </Link>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, null)(UserProfile)
