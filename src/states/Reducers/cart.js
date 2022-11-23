import { ActionTypes } from '../Action/types'

const initialCart = {
  cart: []
}

export const cartReducer = (state = initialCart, { type, payload }) => {
  // console.log('action >> ', type)
  switch (type) {
    case ActionTypes.SET_CART:
      return { ...state, cart: payload }
    default:
      return state
  }
}
