import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOPRATED_REQUEST,
  PRODUCT_TOPRATED_SUCCESS,
  PRODUCT_TOPRATED_FAIL,
} from '../constants/productConstants'
import productsApi from '../api/productsApi'

export const listProducts =
  (keyword = '', pageNumber = '', category = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const data = await productsApi.getAllProducts(keyword, pageNumber, category)

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response,
      })
    }
  }

export const listTopRatedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOPRATED_REQUEST })

    const data = await productsApi.getTopRatedProducts()

    dispatch({
      type: PRODUCT_TOPRATED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOPRATED_FAIL,
      payload: error.response,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST })

    const data = await productsApi.getProduct(id)

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.response,
    })
  }
}

export const deleteProductById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    await productsApi.deleteProduct(id, userInfo.token)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: err,
    })
  }
}

export const addProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_ADD_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const reqBody = { ...product, user: userInfo._id }

    await productsApi.addProduct(reqBody, userInfo.token)

    dispatch({
      type: PRODUCT_ADD_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_ADD_FAIL,
      payload: err,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const reqBody = { ...product, user: userInfo._id }

    await productsApi.updateProduct(reqBody, userInfo.token)

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: err,
    })
  }
}

export const productCreateReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    await productsApi.createProductReview(productId, review, userInfo.token)

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: err,
    })
  }
}
