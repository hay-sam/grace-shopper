import React from 'react'
import convertToDollars from '../../utils/utils'
import {connect} from 'react-redux'
import {editCart, deleteProduct} from '../store/cart'

const CartItem = props => {
  const item = props.item
  const product = item.product

  const handleChange = async event => {
    await props.editCart({product: product, quantity: event.target.value})
    props.updateCartUI()
  }

  const handleDelete = async event => {
    await props.deleteProduct(item)
    props.updateCartUI()
  }

  return (
    <div className="cart-item">
      <h3>{product.name}</h3>
      <img className="cereal-img" src={product.imageUrl} />
      <p>Price: {convertToDollars(product.price)}</p>
      <select onChange={handleChange} defaultValue={item.quantity}>
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
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  editCart: product => dispatch(editCart(product)),
  deleteProduct: product => dispatch(deleteProduct(product))
})

const connectedCartItem = connect(null, mapDispatchToProps)(CartItem)

export default connectedCartItem
