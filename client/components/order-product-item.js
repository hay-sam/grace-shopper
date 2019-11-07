import React from 'react'

const OrderProductItem = props => {
  const product = props.product
  return (
    <div>
      <p>Name: {product.name}</p>
      <p>Price: {product.price}</p>
      <p>Quantity: {product.orderProducts.quantity}</p>
    </div>
  )
}

export default OrderProductItem
