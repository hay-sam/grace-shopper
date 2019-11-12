import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import convertToDollars from '../../utils/utils'
import {guestCheckout, userCheckout, getCart} from '../store/cart'
import {connect} from 'react-redux'
import CheckoutItem from './checkout-item'
import CheckoutForm from './checkout-form'
import {toast} from 'react-toastify'
const stripe = Stripe('pk_test_4ZNZp0kgKdPufZzDPz5xjvlw00FxJy57rk')
import axios from 'axios'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalPrice: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  async handleSubmit(event) {
    event.preventDefault()
    console.log('before api call')
    const {data} = await axios.post('/api/cart/checkout/stripe')
    if (this.props.isLoggedIn) {
      await this.props.userCheckout(
        this.state.totalPrice,
        this.props.user.id,
        this.state
      )
    } else {
      await this.props.guestCheckout(this.state.totalPrice, this.state)
    }
    console.log('before redirect')
    const {error} = await stripe.redirectToCheckout({
      sessionId: data.id
    })
    console.log('after redirect')
    this.props.history.push('/products')
    toast.success('Order Placed Successfully')
  }
  handleChange(event) {
    this.setState({...this.state, [event.target.name]: event.target.value})
  }
  render() {
    return (
      <div>
        <Link to="/cart">Return to Cart</Link>
        <h2>Checkout</h2>
        <div className="checkout-split">
          <div className="checkout-form-col">
            <CheckoutForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              state={this.state}
            />
            <h3>Order total: {convertToDollars(this.state.totalPrice)}</h3>
          </div>

          <div className="order-summary-col">
            <span className="order-summary-header">Order Summary</span>
            <div className="checkout-items-container">
              {this.props.cart.map(entry => (
                <CheckoutItem key={entry.product.id} item={entry} />
              ))}
            </div>
          </div>
        </div>
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
  guestCheckout: (totalPrice, formData) =>
    dispatch(guestCheckout(totalPrice, formData)),
  userCheckout: (totalPrice, id, formData) =>
    dispatch(userCheckout(totalPrice, id, formData)),
  getCart: () => dispatch(getCart())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
)
