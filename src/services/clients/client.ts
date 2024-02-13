import axios from 'axios'

const client = axios.create({
  baseURL: 'https://opentdb.com'
})

export default client;