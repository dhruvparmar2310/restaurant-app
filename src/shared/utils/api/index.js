import axios from 'axios'

const MainApi = axios.create({
  baseURL: 'https://63fee157370fe830d9da61bb.mockapi.io'
})

export default MainApi
