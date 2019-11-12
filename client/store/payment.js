import axios from 'axios'

const GOT_PAYMENT_STATUS = 'GOT_PAYMENT_STATUS'

const gotPaymentStatus = paymentStatus => ({
  type: GOT_PAYMENT_STATUS,
  paymentStatus
})

export const getPaymentStatus = () => {
  return async function(dispatch) {
    const {data} = await axios.get('/api/cart/checkout/status')
    dispatch(gotPaymentStatus(data))
  }
}

const paymentStatusReducer = (paymentStatus = false, action) => {
  switch (action.type) {
    case GOT_PAYMENT_STATUS:
      return action.paymentStatus
    default:
      return paymentStatus
  }
}

export default paymentStatusReducer
