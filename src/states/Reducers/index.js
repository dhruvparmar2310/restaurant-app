import { categoryReducer } from '../Reducers/categoryReducer'
import { combineReducers } from 'redux'
import { productReducer } from '../Reducers/productReducer'
import { cartReducer } from '../Reducers/cart'

const rootReducer = combineReducers({
  allCategory: categoryReducer,
  allProduct: productReducer,
  allCart: cartReducer
})

export default rootReducer
