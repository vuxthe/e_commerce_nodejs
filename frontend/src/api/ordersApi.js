import axiosClient from './axiosClient'

const ordersApi = {
  createOrder: (order, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.post('/api/orders/', order, config)
  },
  getOrderById: (id, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.get(`/api/orders/${id}`, config)
  },
  listMyOrders: (token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.get(`/api/orders/myorders`, config)
  },
  listAllOrders: (token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.get(`/api/orders`, config)
  },
  orderSentpayment: (id, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.put(`/api/orders/${id}/sentpayment`, {}, config)
  },
  deleteOrder: (id, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.delete(`/api/orders/${id}/delete`, config)
  },
  orderDelivered: (id, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.put(`/api/orders/${id}/delivered`, {}, config)
  },
  orderPaid: (id, token) => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    return axiosClient.put(`/api/orders/${id}/pay`, {}, config)
  },
  createPaymentUrl: (order, token) => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    return axiosClient.post(`/api/orders/create_payment_url`, {order}, config)
  }
}


export default ordersApi
