import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

function SearchBox({isAdmin = false}) {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    if (isAdmin) {
      if(keyword.trim()) {
        navigate(`/admin/products/search/${keyword}`)
      } else (
        navigate('/admin/products')
      )
    } else {
      if(keyword.trim()) {
        navigate(`/search/${keyword}`)
      } else (
        navigate('/')
      )
    }
    
  }

  return (
    <Form onSubmit={submitHandler} inline="true" className="d-inline-flex">
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Tìm sản phẩm...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success'>
      <i className='fa-solid fa-magnifying-glass'></i>
      </Button>
    </Form>
  )
}

export default SearchBox
