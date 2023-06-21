import React from 'react'
import {useLocation} from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutStep({ step }) {
    const location = useLocation()

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item className={location.pathname === '/cart'? 'active': ''}>
                {step >= 1 ? (
                    <LinkContainer to='/cart'>
                        <Nav.Link>Mua sắm</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Mua sắm</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item className={location.pathname === '/shipping'? 'active': ''} >
                {step >= 2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Địa chỉ</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Địa chỉ</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item className={location.pathname === '/payment'? 'active': ''}>
                {step >= 3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Thanh toán</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Thanh toán</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item className={location.pathname === '/placeorder'? 'active': ''}>
                {step >= 4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Đặt hàng</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Đặt hàng</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutStep
