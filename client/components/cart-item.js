import React from 'react'

const CartItem = props => {
  const item = props.item
  const product = item.product
  return (
    <div className="cart-item">
      <h3>{product.name}</h3>
      <img className="cereal-img" src={product.imageUrl} />
      <p>Price: {product.price}</p>
      <select>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
      </select>
      <button>Delete</button>
    </div>
  )
}

export default CartItem
