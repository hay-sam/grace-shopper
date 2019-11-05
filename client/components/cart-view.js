import React from 'react'
import CartItem from './cart-item'
import {Link} from 'react-router-dom'

class CartView extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: [
        {
          product: {
            id: 1,
            name: 'cocoa puffs',
            price: 5,
            imageUrl:
              'https://cdn.shopify.com/s/files/1/1305/4751/products/StaySteady_Vanilla_Almond_Life_2000x.png?v=1542324908'
          },
          quantity: 100
        },
        {
          product: {
            id: 2,
            name: 'chex',
            price: 10,
            imageUrl:
              'https://cdn.shopify.com/s/files/1/1305/4751/products/StaySteady_Vanilla_Almond_Life_2000x.png?v=1542324908'
          },
          quantity: 10
        }
      ],
      totalPrice: 0
    }
  }

  componentDidMount() {
    this.calculateTotalPrice()
  }

  calculateTotalPrice() {
    let total = this.state.cart.reduce(
      (accumProduct, item) => accumProduct + item.product.price * item.quantity,
      0
    )
    this.setState({...this.state, totalPrice: total})
  }

  render() {
    return (
      <div>
        <h1>Your Cart</h1>
        <Link to="/">Return to Homepage</Link>
        {this.state.cart.map(product => {
          return <CartItem key={product.id} item={product} />
        })}
        <h3>Total Price: {this.state.totalPrice}</h3>
      </div>
    )
  }
}

export default CartView
