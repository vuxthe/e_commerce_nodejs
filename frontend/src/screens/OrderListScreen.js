import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Table, Button, Modal } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Price from '../components/Price'
import { deleteOrderById, listAllOrders } from '../actions/orderActions'

function OrderListScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList
  const { userInfo } = useSelector((state) => state.userLogin)
  const { success: deleteSuccess } = useSelector((state) => state.orderDelete)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, userInfo, navigate, deleteSuccess])

  const [selectedOrder, setSelectedOrder] = useState('')

  const [show, setShow] = useState(false)

  const closeModalHandler = () => setShow(false)
  const confirmDeleteUser = (order) => {
    setShow(true)
    setSelectedOrder(order)
  }

  const deleteHandler = (order) => {
    setShow(false)
    dispatch(deleteOrderById(order._id))
  }

  const reloadOrderList = () => {
    dispatch(listAllOrders())
  }

  return (
    <>
      <Row className='justify-content-between'>
          <Col md={11}>
            <h2>Danh sách đơn hàng</h2>
          </Col>
          <Col md={1} className='d-flex justify-content-end align-items-center'>
            <i className='fa-solid fa-rotate' role='button' onClick={reloadOrderList}></i>
          </Col>
        </Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>MÃ ĐƠN</th>
                <th>KHÁCH HÀNG</th>
                <th>NGÀY ĐẶT</th>
                <th>TỔNG CỘNG</th>
                <th>THANH TOÁN</th>
                <th>GIAO HÀNG</th>
                <th>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{(order.user && order.user.name) || 'Khách lạ'}</td>
                  <td>{(order.createdAt + '').substring(0, 10)}</td>
                  <td>
                    <Price>{order.totalPrice}</Price>
                    <sup>đ</sup>
                  </td>
                  <td>
                    {order.paymentMethod === 'cod'
                      ? 'Thanh toán khi nhận hàng'
                      : order.isPaid
                      ? order.paidAt
                      : order.isSentPayment
                      ? 'Đã chuyển khoản'
                      : 'Chưa thanh toán'}
                  </td>
                  <td>{order.isDelivered ? order.deliveredAt : 'Đang giao'}</td>
                  <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => confirmDeleteUser(order)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      <Modal show={show} onHide={closeModalHandler} centered backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có muốn xóa đơn hàng <b>{selectedOrder._id}</b> không?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModalHandler}>
            Đóng
          </Button>
          <Button variant='primary' onClick={() => deleteHandler(selectedOrder)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default OrderListScreen
