import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "https://sa52-e-attendance-backend.herokuapp.com"
})

axiosInstance.interceptors.request.use(config => {
  const { url } = config;
  const token = sessionStorage.getItem('token')

  if (!url.startsWith('/token')) {
    if (token) {
      config.headers.JwtToken = token
    }
  }
  return config
})

export default axiosInstance