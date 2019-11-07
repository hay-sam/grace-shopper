import React from 'react'
import {connect} from 'react-redux'
import {editUserThunk} from '../store/user'

class EditProfileForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      email: '',
      address: '',
      phone: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.editUserThunk(this.state)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />

        <label htmlFor="address">address</label>
        <input
          name="address"
          value={this.state.address}
          onChange={this.handleChange}
        />

        <label htmlFor="phone">phone</label>
        <input
          name="phone"
          value={this.state.phone}
          onChange={this.handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  editUserThunk: arg => dispatch(editUserThunk(arg))
})

export default connect(null, mapDispatch)(EditProfileForm)
