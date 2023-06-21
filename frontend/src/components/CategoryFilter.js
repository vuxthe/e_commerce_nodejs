import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function CategoryFilter() {
  const navigate = useNavigate()
  const categories = ['all', 'Tivi', 'Mobile', 'Laptop']
  const filterHandler = (category) => {
    navigate('?category=' + category)
  }

  return (
    <>
      {categories.map((category) => (
        <Button key={category} variant='outline-secondary' onClick={() => filterHandler(category)}>
          {(category === '' && 'Tất cả') || (category === 'Mobile' && 'Điện thoại') || category}
        </Button>
      ))}
    </>
  )
}

export default CategoryFilter
