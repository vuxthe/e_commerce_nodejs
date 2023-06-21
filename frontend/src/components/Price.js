import React from 'react'
import numeral from 'numeral'

function Price({ children }) {
  const price = numeral(children).format('0,0')
  return <span>{price}</span>
}

export default Price
