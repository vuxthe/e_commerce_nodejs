import axiosClient from './axiosClient'

const usersApi = {
  login: (email, password) => {
    return axiosClient.post('/api/users/login', {
      email,
      password,
    })
  },
  register: (name, email, password) => {
    return axiosClient.post('/api/users/', {
      name,
      email,
      password,
    })
  },
  getProfile: (id, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.get(`/api/users/${id}`, config)
  },
  updateProfile: (user, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.put(`/api/users/profile`, user, config)
  },
  updateUserByAdmin: (user, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.put(`/api/users/${user.id}`, user, config)
  },
  listAllUsers: (token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.get(`/api/users/`, config)
  },
  deleteUser: (id, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }
    return axiosClient.delete(`/api/users/${id}/delete`, config)
  },
}

export default usersApi
