import React from 'react'

const CheckoutForm = props => {
  const {state, handleChange, handleSubmit} = props

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-item">
        <label name="firstName">First Name:</label>
        <input
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-item">
        <label name="lastName">Last Name:</label>
        <input
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-item">
        <label name="email">Email:</label>
        <input
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-item">
        <label name="phoneNumber">Phone Number:</label>
        <input
          name="phoneNumber"
          value={state.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-item">
        <label name="streetAddress">Street Address:</label>
        <input
          name="streetAddress"
          value={state.streetAddress}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label name="city">City:</label>
        <input
          name="city"
          value={state.city}
          onChange={handleChange}
          required
        />
        <label name="state">State:</label>
        <input
          name="state"
          value={state.state}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-item">
        <label name="zipcode">Zipcode:</label>
        <input
          name="zipcode"
          value={state.zipcode}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Place Order</button>
    </form>
  )
}

export default CheckoutForm
