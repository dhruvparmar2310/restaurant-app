
import { ActionTypes } from '../Action/types'

const initialCart = {
  cart: []
}

export const cartReducer = (state = initialCart, { type, payload }) => {
  // console.log('action >> ', payload.id)
  switch (type) {
    case ActionTypes.SET_CART:
      // here iteam is nothing, it will display when second time something is added.
      var dataIndex = state.cart.findIndex((data) => data.id === payload.id && data.sizeData.name === payload.sizeData.name && data.productId === payload.productId)
      // console.log('dataIndex >> ', dataIndex)
      if (dataIndex >= 0) {
        state.cart[dataIndex].qnty += 1
        state.cart[dataIndex].itemCount += 1
        // don't return again payload after updating...
        return {
          ...state,
          cart: [...state.cart]
        }
      } else {
        const temp = { ...payload, qnty: 1 }
        // state.cart.push(temp)
        return {
          ...state, 
          cart: [...state.cart, temp]
        }
      }
    default:
      return state
  }
}
