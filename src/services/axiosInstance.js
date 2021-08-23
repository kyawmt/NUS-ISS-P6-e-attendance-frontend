import axios from 'axios' 

let axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.JwtToken = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default axiosInstance