import React from 'react'

const CartItem = props => {
  const item = props.item
  const product = item.product
  return (
    <div>
      <h3>{product.name}</h3>
      <img src={product.imageUrl} />
      <p>Price: {product.price}</p>
    </div>
  )
}

export default CartItem
