import React from 'react'
import {useLocation} from 'react-router-dom'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const location = useLocation()
  const category = (location.search).split('=')[1]

  const redirectUrl = (x) => {
    if (isAdmin) {
      if (keyword) {
        return `/admin/products/search/${keyword}/page/${x + 1}`
      } else {
        return `/admin/products/page/${x + 1}`
      }
    } else {
      if (keyword) {
        return `/search/${keyword}/page/${x + 1}${category && `?category=${category}`}`
      } else {
        return `/page/${x + 1}${category && `?category=${category}`}`
      }
    }
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={redirectUrl(x)}
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate