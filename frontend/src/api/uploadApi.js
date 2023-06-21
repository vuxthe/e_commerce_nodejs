import axiosClient from './axiosClient'

const uploadApi = {
  uploadImage: (formData, token) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.post(`/api/upload`, formData, config)
  },
}

export default uploadApi
