import { ActionTypes } from './types'

export const getCategory = async (data) => {
  return {
    type: ActionTypes.GET_CATEGORY,
    payload: data
  }
}

export const getProduct = async (data) => {
  return {
    type: ActionTypes.GET_PRODUCT,
    payload: data
  }
}

export const setCart = (data, pop, checkbox) => {
  return {
    type: ActionTypes.SET_CART,
    payload: { data, pop, checkbox }
  }
}
