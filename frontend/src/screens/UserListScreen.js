import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Table, Button, Modal } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser, logout } from '../actions/userActions'

function UserListScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList
  const { userInfo } = useSelector((state) => state.userLogin)
  const { success: deleteSuccess } = useSelector((state) => state.userDelete)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login')
    }

    setDeleteAdminCount(0)
  }, [dispatch, userInfo, navigate, deleteSuccess])

  const [deleteAdminCount, setDeleteAdminCount] = useState(0)

  const deleteHandler = (user) => {
    if (user.isAdmin) {
      setShow(false)
      setDeleteAdminCount((prev) => prev + 1)
    } else {
      setShow(false)
      dispatch(deleteUser(user._id))
    }
  }

  const [selectedUser, setSelectedUser] = useState({})
  const [show, setShow] = useState(false)

  const closeModalHandler = () => setShow(false)
  const confirmDeleteUser = (user) => {
    setShow(true)
    setSelectedUser(user)
  }

  const reloadUserList = () => {
    dispatch(listUsers())
  }

  return (
    <>
      <Row className='justify-content-between'>
        <Col md={11}>
          <h1>Danh sách tài khoản</h1>
        </Col>
        <Col md={1} className='d-flex justify-content-end align-items-center'>
          <i className='fa-solid fa-rotate' role='button' onClick={reloadUserList}></i>
        </Col>
      </Row>
      {deleteAdminCount === 1 && <Message variant='danger'>Không thể xóa tài khoản admin</Message>}
      {deleteAdminCount > 1 && deleteAdminCount < 3 && (
        <Message variant='danger'>{`Đã bảo là không thể xóa tài khoản admin. Đừng có lì nha >.<`}</Message>
      )}
      {deleteAdminCount >= 3 && deleteAdminCount < 4 && (
        <Message variant='danger'>{`Lì một lần nữa là out nha sếp :v`}</Message>
      )}
      {deleteAdminCount >= 4 && dispatch(logout())}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    // disabled={user.isAdmin}
                    onClick={() => confirmDeleteUser(user)}
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
          <Modal.Title>Xác nhận xóa tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có muốn xóa tài khoản <b>{selectedUser.name}</b> không?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModalHandler}>
            Đóng
          </Button>
          <Button variant='primary' onClick={() => deleteHandler(selectedUser)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserListScreen
