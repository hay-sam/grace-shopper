import React from 'react'
import CartItem from './cart-item'
import {Link, withRouter} from 'react-router-dom'
import convertToDollars from '../../utils/utils'
import {getCart} from '../store/cart'
import {connect} from 'react-redux'

class CartView extends React.Component {
  constructor() {
    super()
    this.state = {
      totalPrice: 0
    }
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this)
    this.updateCartUI = this.updateCartUI.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.getCart()
    this.calculateTotalPrice()
  }

  async updateCartUI() {
    await this.props.getCart()
    this.calculateTotalPrice()
  }
  handleClick(event) {
    event.preventDefault()
    this.props.history.push('/checkout')
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
        <h3>Your Cart</h3>
        <Link to="/">Return to Homepage</Link>
        <div className="cart-content">
          <div className="cart-items-col">
            <div className="cart-items">
              {this.props.cart.map(product => {
                return (
                  <CartItem
                    key={product.id}
                    item={product}
                    updateCartUI={this.updateCartUI}
                  />
                )
              })}
            </div>
          </div>
          <div className="cart-info-col">
            <h3>Total Price: {convertToDollars(this.state.totalPrice)}</h3>
            <button onClick={this.handleClick}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart())
})

const connectedCartView = connect(mapStateToProps, mapDispatchToProps)(CartView)

export default withRouter(connectedCartView)
