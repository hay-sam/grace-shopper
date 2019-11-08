import React from 'react'
import convertToDollars from '../../utils/utils'

const CheckoutItem = props => {
  const item = props.item
  const product = item.product

  return (
    <div className="checkout-item">
      <div className="checkout-item-header">
        <span>{product.name}</span>
      </div>
      <div className="checkout-item-content">
        <img className="cereal-img" src={product.imageUrl} />
        <div className="checkout-item-info">
          <p>Price: {convertToDollars(product.price * item.quantity)}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItem
