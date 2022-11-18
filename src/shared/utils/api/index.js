import axios from 'axios'

const MainApi = axios.create({
  baseURL: 'https://6364ac837b209ece0f4b06db.mockapi.io'
})

export default MainApi
