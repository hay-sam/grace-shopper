const convertToDollars = pennies => {
  const penniesString = pennies.toString()
  if (pennies < 10) {
    return `$ 0.0${penniesString}`
  } else if (pennies < 100) {
    return `$ 0.${penniesString}`
  } else {
    const cents = penniesString.slice(penniesString.length - 2)
    const dollars = penniesString.slice(0, penniesString.length - 2)
    return `$ ${dollars}.${cents}`
  }
}

module.exports = convertToDollars
