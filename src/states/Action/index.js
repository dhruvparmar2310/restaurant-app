import { GET_DATA } from './types'
import MainApi from '../../shared/utils/api/index'

const getData = async () => {
  const result = await MainApi.get('/categories')
  console.log('result :>> ', result)
  return {
    type: GET_DATA,
    payload: result.data
  }
}

export default getData
