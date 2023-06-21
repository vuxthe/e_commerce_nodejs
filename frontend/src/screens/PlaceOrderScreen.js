import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutStep from '../components/CheckoutStep'
import { FREE_SHIP_PRICE, SHIPPING_PRICE } from '../constants/cartConstants'
import { createOrder, resetCreatedOrder, redirectToPayment } from '../actions/orderActions'
import { resetCart } from '../actions/cartActions'
import Price from '../components/Price'

function PlaceOrderScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)

  cart.itemsPrice = Number(
    cart.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)
  )
  cart.shippingPrice =
    cart.itemsPrice > FREE_SHIP_PRICE ? 0 : Number((cart.itemsPrice * SHIPPING_PRICE).toFixed(2))
  cart.totalPrice = Number((cart.itemsPrice + cart.shippingPrice).toFixed(2))

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [navigate, success])

  const placeOrderHandler = async () => {
    await dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
    dispatch(resetCart())
    dispatch(resetCreatedOrder())
    if (cart.paymentMethod === 'bankTransfer') {
        const paymentUrl = `http://localhost:4000/order/create_payment_url?amount=${cart.totalPrice}`;
        window.location.href = paymentUrl;
    }
  }



  const PAYMENT_METHOD = {
    cod: 'Thanh toán khi nhận hàng',
    bankTransfer: 'Thanh toán online',
  }

  return (
    <>
      <CheckoutStep step={4} />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Thông tin nhận hàng</h2>
              <p>
                <strong>Địa chỉ: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Thanh toán</h2>
              <p>
                <strong>Phương thức: </strong>
                {PAYMENT_METHOD[cart.paymentMethod]}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Sản phẩm</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant='danger'>Giỏ hàng của bạn còn trống</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4} align='end'>
                          {item.qty} x <Price>{item.price}</Price>
                          <sup>₫</sup> = <Price>{item.price * item.qty}</Price>
                          <sup>₫</sup>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Thành tiền</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tiền hàng</Col>
                  <Col>
                    <Price>{cart.itemsPrice}</Price>
                    <sup>₫</sup>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phí vận chuyển</Col>
                  <Col>
                    <Price>{cart.shippingPrice}</Price>
                    <sup>₫</sup>
                  </Col>
                </Row>
                <Row>
                  {cart.shippingPrice === 0 ? (
                    false
                  ) : (
                    <Col className='text-danger'>
                      Mua thêm {Number((FREE_SHIP_PRICE - cart.itemsPrice).toFixed(2))} để được miễn
                      phí vận chuyển
                    </Col>
                  )}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tổng cộng</Col>
                  <Col>
                    <Price>{cart.totalPrice}</Price>
                    <sup>₫</sup>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Đặt hàng
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
