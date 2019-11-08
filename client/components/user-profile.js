import React from 'react'
import {connect} from 'react-redux'
import {getUserThunk} from '../store/user'
import {Link} from 'react-router-dom'

//COMPONENT:
class UserProfile extends React.Component {
  // componentDidMount() {
  //   this.props.getUserThunk(this.props.user.id)
  // }

  render() {
    const {user} = this.props
    return (
      <div>
        <h2>Hello {user.email}</h2>
        <p>phone: {user.phone}</p>
        <p>address: {user.address}</p>
        <Link to={`/users/edit-profile/${user.id}`}>Edit Profile Info</Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  getUserThunk: arg => dispatch(getUserThunk(arg))
})

export default connect(mapState, mapDispatch)(UserProfile)
