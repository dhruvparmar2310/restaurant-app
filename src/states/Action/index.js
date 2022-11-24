import { ActionTypes } from './types'

export const getCategory = (data) => {
  return {
    type: ActionTypes.GET_CATEGORY,
    payload: data
  }
}

export const getProduct = (data) => {
  return {
    type: ActionTypes.GET_PRODUCT,
    payload: data
  }
}

export const setCart = (sizeData, pop, checkbox, name, id, filterProduct) => {
  return {
    type: ActionTypes.SET_CART,
    payload: { sizeData, pop, checkbox, name, id, filterProduct }
  }
}
