import React from 'react'

const OrderProductItem = props => {
  const product = props.product
  return (
    <div>
      <h5>{product.name}</h5>
    </div>
  )
}

export default OrderProductItem
