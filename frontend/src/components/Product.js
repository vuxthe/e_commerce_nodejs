import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import Price from './Price'

function Product({ product }) {
  return (
    <>
      <Card className='my-3 p-3 rounded'>
        <Link to={`/products/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
          {/* <Card.Img src="../../images/mouse.jpg" variant='top' /> */}
        </Link>
        <Card.Body>
          <Link to={`/products/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as='div'>
            <Rating value={product.rating} text={`${product.numReviews} Đánh Giá`} />
          </Card.Text>

          <Card.Text as='h4'>
            <div>
              <Price>{product.price}</Price>
              <sup>₫</sup>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
