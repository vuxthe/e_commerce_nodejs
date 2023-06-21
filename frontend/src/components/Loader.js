import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader({ customStyle }) {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
        ...customStyle,
      }}
    >
      <span className='visually-hidden'>Đang tải...</span>
    </Spinner>
  )
}

export default Loader
