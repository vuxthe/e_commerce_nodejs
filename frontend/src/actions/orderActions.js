import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_CREATE_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from '../constants/orderConstants'
import ordersApi from '../api/ordersApi'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const data = await ordersApi.createOrder(order, userInfo.token)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: err,
    })
  }
}

export const resetCreatedOrder = () => async (dispatch) => {
  dispatch({
    type: ORDER_CREATE_RESET,
  })
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const data = await ordersApi.getOrderById(id, userInfo.token)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: err,
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const data = await ordersApi.listMyOrders(userInfo.token)

    dispatch({
      type: MY_ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: MY_ORDER_LIST_FAIL,
      payload: err,
    })
  }
}

export const listAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const data = await ordersApi.listAllOrders(userInfo.token)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: err,
    })
  }
}

export const deleteOrderById = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DELETE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      await ordersApi.deleteOrder(id, userInfo.token)

      dispatch({
        type: ORDER_DELETE_SUCCESS,
      })
    } catch (err) {
      dispatch({
        type: ORDER_DELETE_FAIL,
        payload: err,
      })
    }
  }

 