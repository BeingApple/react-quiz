import axios from 'axios'

const client = axios.create({
  baseURL: 'https://opentdb.com'
})

client.interceptors.response.use((response) => {
  return response.data
})


export default client;