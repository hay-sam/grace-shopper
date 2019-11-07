import React from 'react'

const CheckoutForm = props => {
  const {state, handleChange, handleSubmit} = props

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <label name="firstName">First Name:</label>
      <input
        name="firstName"
        value={state.firstName}
        onChange={handleChange}
        required
      />
      <label name="lastName">Last Name:</label>
      <input
        name="lastName"
        value={state.lastName}
        onChange={handleChange}
        required
      />
      <label name="email">Email:</label>
      <input
        name="email"
        type="email"
        value={state.email}
        onChange={handleChange}
        required
      />
      <label name="phoneNumber">Phone Number:</label>
      <input
        name="phoneNumber"
        value={state.phoneNumber}
        onChange={handleChange}
        required
      />
      <label name="streetAddress">Street Address:</label>
      <input
        name="streetAddress"
        value={state.streetAddress}
        onChange={handleChange}
      />
      <label name="city">City:</label>
      <input name="city" value={state.city} onChange={handleChange} required />
      <label name="state">State:</label>
      <input
        name="state"
        value={state.state}
        onChange={handleChange}
        required
      />
      <label name="zipcode">Zipcode:</label>
      <input
        name="zipcode"
        value={state.zipcode}
        onChange={handleChange}
        required
      />
      <button type="submit">Place Order</button>
    </form>
  )
}

export default CheckoutForm
