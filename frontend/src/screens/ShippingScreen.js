import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutStep from '../components/CheckoutStep'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, country }))
        navigate('/payment')
    }

    const stepCount = cart.paymentMethod
        ? 4
        : cart.shippingAddress && Object.keys(cart.shippingAddress).length !== 0
        ? 3
        : 2

    return (
        <FormContainer>
            <CheckoutStep step={stepCount} />
            <h1>Thông tin đặt hàng</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Nhập địa chỉ'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>Thành phố</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Nhập thành phố'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Quốc gia</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Nhập quốc gia'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Tiếp tục
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
