import React from 'react'

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="not-found">
        <h1>404 - not found</h1>
        <img
          className="lost-img"
          src="https://www.nestle-cereals.com/uk/sites/g/files/qirczx211/f/wysiwyg_images/404_3.png"
        />
      </div>
    )
  }
}
