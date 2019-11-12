import React from 'react'
import {getUsers} from '../store/users'
import {connect} from 'react-redux'
import AdminUsersItem from './admin-users-item'

class AdminUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div>
        {this.props.users.map(user => (
          <AdminUsersItem key={user.id} user={user} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers())
})

const connectedAdminUsers = connect(mapStateToProps, mapDispatchToProps)(
  AdminUsers
)

export default connectedAdminUsers
