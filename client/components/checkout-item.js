import React from 'react'
import convertToDollars from '../../utils/utils'

const CheckoutItem = props => {
  const item = props.item
  const product = item.product

  return (
    <div className="checkout-item">
      <h3>{product.name}</h3>
      <img className="cereal-img" src={product.imageUrl} />
      <p>Price: {convertToDollars(product.price * item.quantity)}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  )
}

export default CheckoutItem
