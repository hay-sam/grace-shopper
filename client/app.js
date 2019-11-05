import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import CartView from './components/cart-view'

const App = () => {
  return (
    <div>
      <Navbar />
      <CartView />
    </div>
  )
}

export default App
