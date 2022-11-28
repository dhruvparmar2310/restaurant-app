
import { ActionTypes } from '../Action/types'

const initialCart = {
  cart: []
}

export const cartReducer = (state = initialCart, { type, payload }) => {
  // console.log('action >> ', payload.id)
  switch (type) {
    case ActionTypes.SET_CART:
      // here iteam is nothing, it will display when second time something is added.
      var IteamIndex = state.cart.findIndex((iteam) => iteam.id === payload.id && iteam.sizeData.name === payload.sizeData.name)
      console.log('IteamIndex >> ', IteamIndex)
      if (IteamIndex >= 0) {
        state.cart[IteamIndex].qnty += 1
        state.cart[IteamIndex].sum = state.cart[IteamIndex].sum * 2 
        return {
          ...state,
          cart: [...state.cart, payload]
        }
      } else {
        const temp = { ...payload, qnty: 1 }
        // state.cart.push(temp)
        return {
          ...state,
          cart: [...state.cart, temp]
        }
      }
      // return {
      //   ...state,
      //   cart: [...state.cart, payload]
      // }
    default:
      return state
  }
}
