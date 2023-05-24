import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://yapi.upho2015.com',
  timeout: 1000,
})

instance.interceptors.request.use((config) => {
  console.log('request interceptor')
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  console.log('response interceptor')
  return response
}, (error) => {
  return Promise.reject(error)
})

export default instance