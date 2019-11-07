import React from 'react'
import {connect} from 'react-redux'
import {getUserThunk} from '../store/user'

//COMPONENT:
class UserProfile extends React.Component {
  componentDidMount() {
    this.props.getUserThunk()
  }

  render() {
    const {user} = this.props
    return (
      <div>
        <h2>Hello ${user.email}</h2>
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
