import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Form, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserByAdmin } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_BY_ADMIN_RESET } from '../constants/userConstants'

function UserEditScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const params = useParams()
  const userId = params.id
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userUpdateByAdmin = useSelector((state) => state.userUpdateByAdmin)
  const { success:updateUserSuccess } = userUpdateByAdmin

  const errorMessage = error && error.response.data.message

  useEffect(() => {
    
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
    }
  }, [dispatch, userId, user])

  useEffect(() => {
    dispatch({ type: USER_UPDATE_BY_ADMIN_RESET})
  },[dispatch])

  const [show, setShow] = useState(false)
  const closeModalHandler = () => setShow(false)
  const editUserHandler = (e) => {
    e.preventDefault()
    setShow(true)
  }

  const updateUserHandler = () => {
    dispatch(updateUserByAdmin({ id: userId, name: name, email: email, role: role }))
    setShow(false)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to={'/admin/users'}>
        Trở về
      </Link>
      <FormContainer>
        <h1>Sửa thông tin người dùng</h1>
        {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
        {updateUserSuccess && <Message variant='success'>Cập nhật thông tin thành công</Message>}
        {loading && <Loader />}
        <Form onSubmit={editUserHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập name'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Nhập email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='role'>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
              <option value='vendor'>Vendor</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant='primary' >
            Xác Nhận
          </Button>
        </Form>
      </FormContainer>
      <Modal show={show} onHide={closeModalHandler} centered backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn có muốn cập nhận thông tin cho tài khoản <b>{user.name}</b> không?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModalHandler}>
            Đóng
          </Button>
          <Button variant='primary' onClick={() => updateUserHandler()}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UserEditScreen
