import React, {Component} from 'react'
import Switch from 'react-switch'
import {connect} from 'react-redux'
import {admin} from '../store/user'

class AdminUsersItem extends Component {
  constructor(props) {
    super(props)
    this.state = {checked: this.props.user.isAdmin}
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(checked) {
    await this.props.updateIsAdmin(this.props.user.id, checked)
    this.setState({checked})
  }

  render() {
    return (
      <label>
        <h3>{this.props.user.email}</h3>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    )
  }
}

const mapDispatch = dispatch => ({
  updateIsAdmin: (userId, checked) =>
    dispatch(admin(userId, {isAdmin: checked}))
})

const connectedAdminUsersItem = connect(null, mapDispatch)(AdminUsersItem)

export default connectedAdminUsersItem
