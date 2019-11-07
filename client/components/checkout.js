import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import convertToDollars from '../../utils/utils'
import {guestCheckout, userCheckout, getCart} from '../store/cart'
import {connect} from 'react-redux'
import CheckoutItem from './checkout-item'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
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

  async handleClick() {
    if (this.props.isLoggedIn) {
      await this.props.userCheckout(this.state.totalPrice, this.props.user.id)
    } else {
      await this.props.guestCheckout(this.state.totalPrice)
    }
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <Link to="/cart">Return to Cart</Link>
        <h2>Checkout</h2>
        <div className="checkout-split">
          <div className="checkout-form" />
          <div className="order-summary-col">
            <h3 className="order-summary-header">Order Summary</h3>
            <div className="checkout-items-container">
              {this.props.cart.map(entry => (
                <CheckoutItem key={entry.product.id} item={entry} />
              ))}
            </div>
          </div>
        </div>

        <h3>Order total: {convertToDollars(this.state.totalPrice)}</h3>
        <button onClick={() => this.handleClick()}>Place Order</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id,
  cart: state.cart,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  guestCheckout: totalPrice => dispatch(guestCheckout(totalPrice)),
  userCheckout: (totalPrice, id) => dispatch(userCheckout(totalPrice, id)),
  getCart: () => dispatch(getCart())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
)
