import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router'
import Rating from '../components/Rating'
import Price from '../components/Price'
import { listProductDetails, productCreateReview } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen() {
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()

  const params = useParams()
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch, params.id])

  useEffect(() => {
    if (successProductReview) {
      setRating(5)
      setComment('')
      dispatch(listProductDetails(params.id))
    }
    if (!product._id || product._id !== params.id) {
      dispatch(listProductDetails(params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, params, product, successProductReview])

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      productCreateReview(params.id, {
        rating,
        comment,
      })
    )
  }

  const isReviewed =
    product.reviews && product.reviews.find((review) => review.user === userInfo._id)

  return (
    <>
    <Meta title={product.name} />
      <Link className='btn btn-light my-3' to='/'>
        Quay lại
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
              {/* <Image src="../../images/phone.jpg" alt={product.name} fluid /> */}
              {/* <Image src="https://res.cloudinary.com/demo/image/upload/turtles.jpg" alt={product.name} fluid /> */}
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>
                    <Price>{product.price}</Price>
                    <sup>₫</sup>
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} đánh giá`} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>Thương hiệu: {product.brand}</div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>Mô tả: {product.description}</div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>
                    {product.countInStock > 0
                      ? `Còn hàng: ${product.countInStock}`
                      : 'Tạm hết hàng'}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form>
                    <Form.Label>Số Lượng: </Form.Label>
                    <Form.Control
                      type='number'
                      min='1'
                      max={`${product.countInStock}`}
                      value={product.countInStock === 0 ? 0 : qty}
                      onChange={(e) => setQty(e.target.value)}
                      style={{ width: '150px' }}
                    />
                  </Form>
                  <Button
                    className='mt-3'
                    type='button'
                    disabled={product.countInStock === 0 || qty === 0}
                    onClick={addToCartHandler}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Đánh giá</h2>
              {product.reviews && product.reviews.length === 0 && (
                <Message>Chưa có đánh giá nào</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong> &nbsp;
                      <Rating value={review.rating} />
                      <p>{review.comment}</p>
                      <div>
                        <sup>{(review.createdAt + '').substring(0, 10)}</sup>
                      </div>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  <h2>Gửi đánh giá của bạn</h2>
                  {successProductReview && (
                    <Message variant='success'>Đánh giá đã được gửi thành công</Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                  {userInfo ? !isReviewed ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Đánh giá</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value='5'>5 - Tuyệt vời</option>
                          <option value='4'>4 - Rất tốt</option>
                          <option value='3'>3 - Tốt</option>
                          <option value='2'>2 - Trung bình</option>
                          <option value='1'>1 - Tệ</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Bình luận</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button disabled={loadingProductReview} type='submit' variant='primary'>
                        Gửi đánh giá
                      </Button>
                    </Form>
                  ) :  (
                    <Message variant='success'>Bạn đã đánh giá sản phẩm này</Message>
                  ) : (
                    <Message>
                      <Link to='/login'>Đăng nhập</Link> để đánh giá
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
