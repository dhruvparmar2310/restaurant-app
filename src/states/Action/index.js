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

export const setCart = (data, pop, checkbox, name, id) => {
  return {
    type: ActionTypes.SET_CART,
    payload: { data, pop, checkbox, name, id }
  }
}
