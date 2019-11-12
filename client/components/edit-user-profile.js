import React from 'react'
import {connect} from 'react-redux'
import {editUserThunk} from '../store/user'
import {withRouter} from 'react-router-dom'
import NotFound from './not-found'

class EditProfileForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      email: '',
      address: '',
      phone: ''
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.editUserThunk(this.props.match.params.userid, this.state)
    this.props.history.push('/users/profile')
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return !this.props.isLoggedIn ? (
      <NotFound />
    ) : (
      <form className="edit-profile-container" onSubmit={this.handleSubmit}>
        <label htmlFor="email">email (required)</label>
        <input
          name="email"
          type="email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="address">address (required)</label>
        <input
          name="address"
          value={this.state.address}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="phone">phone (required)</label>
        <input
          name="phone"
          value={this.state.phone}
          onChange={this.handleChange}
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    )
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  editUserThunk: (arg1, arg2) => dispatch(editUserThunk(arg1, arg2))
})

export default withRouter(connect(mapState, mapDispatch)(EditProfileForm))
