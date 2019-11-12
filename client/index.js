import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        closeOnClick
        pauseOnVisibilityChange
        draggable
      />
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
