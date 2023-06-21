import React, { useEffect } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Row, Col, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import CheckoutStep from '../components/CheckoutStep'
import Price from '../components/Price'
import Meta from '../components/Meta'

function CartScreen() {
  const productId = useParams().id
  const location = useLocation()
  const navigate = useNavigate()
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  const stepCount = cart.paymentMethod
    ? 4
    : cart.shippingAddress && Object.keys(cart.shippingAddress).length !== 0
    ? 3
    : 2

  return (
    <>
    <Meta title="Giỏ hàng" />
    <Row>
      <CheckoutStep step={stepCount} />
      <Col md={8}>
        <h1>Giỏ hàng</h1>
        {cartItems.length === 0 ? (
          <Message>
            Giỏ hàng của bạn còn trống <Link to='/'>Trở về</Link>
          </Message>
        ) : (
          <ListGroup md={6}>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className='align-items-center'>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link to={`/products/${item.product}`}>
                      <strong>{item.name}</strong>
                    </Link>
                  </Col>
                  <Col md={2}>
                  <Price>{item.price}</Price>
                    <sup>₫</sup>
                  </Col>
                  <Col md={2}>
                    <Form>
                      <Form.Label>Số Lượng: </Form.Label>
                      <Form.Control
                        type='number'
                        min='1'
                        max={`${item.countInStock}`}
                        value={item.qty}
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                      />
                    </Form>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fa fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Tạm tính: ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) sản phẩm</h2>
              <Price>{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}</Price>
              <sup>₫</sup>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Mua hàng
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    </>
  )
}

export default CartScreen
