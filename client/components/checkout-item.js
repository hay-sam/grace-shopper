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
        <img className="checkout-item-img" src={product.imageUrl} />
        <div className="checkout-item-info">
          <p>Price: {convertToDollars(product.price * item.quantity)}</p>
          {item.quantity > 1 ? (
            <p style={{fontSize: 'small'}}>
              {' '}
              Each: {convertToDollars(product.price)}
            </p>
          ) : (
            ''
          )}

          <p>Quantity: {item.quantity}</p>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItem
