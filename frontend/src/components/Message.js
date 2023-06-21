import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({className, variant, children}) {
  return (
    <Alert variant={variant} className={className}>{children}</Alert>
  )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message