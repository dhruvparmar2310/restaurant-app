import { ActionTypes } from '../Action/types'

const initialProduct = {
  products: []
}

export const productReducer = (state = initialProduct, { type, payload }) => {
  // console.log('action >> ', type)
  switch (type) {
    case ActionTypes.GET_PRODUCT:
      return { ...state, products: payload }
    default:
      return state
  }
}
