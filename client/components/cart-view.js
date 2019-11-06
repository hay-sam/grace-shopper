import React from 'react'
import CartItem from './cart-item'
import {Link} from 'react-router-dom'
import convertToDollars from '../../utils/utils'
import {getCart} from '../store/cart'
import {connect} from 'react-redux'

class CartView extends React.Component {
  constructor() {
    super()
    this.state = {
      totalPrice: 0
    }
  }

  async componentDidMount() {
    await this.props.getCart()
    this.calculateTotalPrice()
  }

  calculateTotalPrice() {
    let total = this.props.cart.reduce(
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
        {this.props.cart.map(product => {
          return <CartItem key={product.id} item={product} />
        })}
        <h3>Total Price: {convertToDollars(this.state.totalPrice)}</h3>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart())
})

const connectedCartView = connect(mapStateToProps, mapDispatchToProps)(CartView)

export default connectedCartView
