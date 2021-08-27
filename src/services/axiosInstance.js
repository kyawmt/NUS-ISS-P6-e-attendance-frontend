import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080"
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