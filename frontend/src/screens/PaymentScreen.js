import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutStep from '../components/CheckoutStep'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { shippingAddress } = cart

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState(null)

    useEffect(() => {
        setPaymentMethod(cart.paymentMethod)
    }, [cart])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    const stepCount = cart.paymentMethod ? 4 : 3

    return (
        <FormContainer>
            <CheckoutStep step={stepCount} />
            <h1>Phương thức thanh toán</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Chọn phương thức</Form.Label>

                    <Col>
                        <Form.Check
                            checked={paymentMethod === 'cod'}
                            type='radio'
                            label='Thanh toán khi nhận hàng'
                            id='cod'
                            name='paymentMethod'
                            value='cod'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            checked={paymentMethod === 'bankTransfer'}
                            type='radio'
                            label='Chuyển khoản'
                            id='bank_transfer'
                            name='paymentMethod'
                            value='bankTransfer'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Tiếp tục
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
