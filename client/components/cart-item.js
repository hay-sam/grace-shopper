import React from 'react'
import convertToDollars from '../../utils/utils'
import {connect} from 'react-redux'
import {editCart, deleteProduct} from '../store/cart'

const CartItem = props => {
  const item = props.item
  const product = item.product

  const handleChange = async event => {
    await props.editCart({
      product: product,
      quantity: Number(event.target.value)
    })
    props.updateCartUI()
  }

  const handleDelete = async event => {
    await props.deleteProduct(item)
    props.updateCartUI()
  }

  return (
    <div className="cart-item">
      <div className="cart-item-header">
        <span>{product.name}</span>
      </div>
      <div className="cart-item-content">
        <img className="cart-item-img" src={product.imageUrl} />
        <div className="cart-item-info">
          <p style={{paddingBottom: '10px', margin: '10px 0px'}}>
            Price: {convertToDollars(product.price)}
          </p>
          <div className="cart-item-info-line" style={{display: 'flex'}}>
            <label name="quantity" style={{display: 'inline'}}>
              Quantity:{' '}
            </label>
            <select
              style={{display: 'inline'}}
              name="quantity"
              onChange={handleChange}
              defaultValue={item.quantity}
            >
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
          </div>
          <button className="cart-item-info-line" onClick={handleDelete}>
            Remove Item
          </button>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  editCart: product => dispatch(editCart(product)),
  deleteProduct: product => dispatch(deleteProduct(product))
})

const connectedCartItem = connect(null, mapDispatchToProps)(CartItem)

export default connectedCartItem
