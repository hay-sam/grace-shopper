import React from 'react'

const OrderProductItem = props => {
  const product = props.product
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      <p>Quantity: {product.orderProducts.quantity}</p>
    </div>
  )
}

export default OrderProductItem
