import React from 'react'
import {getUsers} from '../store/users'
import {connect} from 'react-redux'
import AdminUsersItem from './admin-users-item'
import NotFound from './not-found'

class AdminUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return !this.props.isAdmin ? (
      <NotFound />
    ) : (
      <div>
        {this.props.users.map(user => (
          <AdminUsersItem key={user.id} user={user} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  isAdmin: !!state.user.isAdmin
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers())
})

const connectedAdminUsers = connect(mapStateToProps, mapDispatchToProps)(
  AdminUsers
)

export default connectedAdminUsers
