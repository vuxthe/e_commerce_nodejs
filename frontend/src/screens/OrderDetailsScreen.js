import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'
import { PAYMENT_METHOD } from '../constants/cartConstants'
import ordersApi from '../api/ordersApi'
import Price from '../components/Price'

function OrderDetailsScreen() {
  const dispatch = useDispatch()
  const params = useParams()
  const orderId = params.id

  const orderDetails = useSelector((state) => state.orderDetails)
  const userLogin = useSelector((state) => state.userLogin)
  const { order, loading, error } = orderDetails

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [orderId, dispatch])

  const [show, setShow] = useState(false)

  const closeModalHandler = () => setShow(false)
  const showModalHandler = () => setShow(true)

  const paymentHandler = async () => {
    await ordersApi.orderSentpayment(orderId, userLogin.userInfo.token)
    dispatch(getOrderDetails(orderId))
    setShow(false)
  }

  const markReceivePaymentHandler = async () => {
    await ordersApi.orderPaid(orderId, userLogin.userInfo.token)
    dispatch(getOrderDetails(orderId))
  }

  const markDeliveredHandler = async () => {
    await ordersApi.orderDelivered(orderId, userLogin.userInfo.token)
    dispatch(getOrderDetails(orderId))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Đơn hàng {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Thông tin nhận hàng</h2>
              <p>
                <strong>Tên: </strong> {(order.user && order.user.name) || 'Khách lạ'}
              </p>
              <p>
                <strong>Địa chỉ: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Đã giao vào lúc {order.deliveredAt}</Message>
              ) : (
                <Message variant='warning'>Đang chuẩn bị hàng</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Thanh toán</h2>
              <p>
                <strong>Phương thức: </strong>
                {PAYMENT_METHOD[order.paymentMethod]}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Thanh toán vào lúc {order.paidAt}</Message>
              ) : order.isSentPayment ? (
                <Message variant='warning'>Đã chuyển khoản - Chưa xác nhận</Message>
              ) : (
                <Message variant='primary'>Chưa thanh toán</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Sản phẩm</h2>
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
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
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Tổng kết</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tiền hàng</Col>
                  <Col>
                    <Price>{order.totalPrice}</Price>
                    <sup>₫</sup>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phí vận chuyển</Col>
                  <Col>
                    <Price>{order.shippingPrice}</Price>
                    <sup>₫</sup>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tổng cộng</Col>
                  <Col>
                    <Price>{order.totalPrice}</Price>
                    <sup>₫</sup>
                  </Col>
                </Row>
              </ListGroup.Item>
              <Button
                onClick={showModalHandler}
                disabled={
                  (order && order.isPaid) ||
                  (order && order.isSentPayment) ||
                  order.paymentMethod === 'cod' ||
                  order.paymentMethod === 'bankTransfer'
                }
              >
                {(order && order.isPaid && 'Đã thanh toán') ||
                  (order && order.isSentPayment && 'Đã chuyển khoản') ||
                  (order.paymentMethod === 'cod' && 'Thanh toán khi nhận hàng') ||
                  'Chờ xác nhận thanh toán'}
              </Button>
            </ListGroup>
          </Card>
          {userLogin.userInfo.isAdmin && (
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Admin area</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                <Button onClick={markReceivePaymentHandler} disabled={order.isPaid} >Đã nhận thanh toán</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                <Button onClick={markDeliveredHandler} disabled={order.isDelivered}>Đã giao hàng</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
      {/* <Modal show={show} onHide={closeModalHandler} centered backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chuyển khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn hãy chuyển khoản đến tài khoản sau:</p>
          <p>Ngân hàng: xxxx</p>
          <p>Số tài khoản: xxx xxx xxx xxx</p>
          <p>Tên chủ thẻ: xx xxxxx x</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModalHandler}>
            Đóng
          </Button>
          <Button variant='primary' onClick={paymentHandler}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  )
}

export default OrderDetailsScreen
