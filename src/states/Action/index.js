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

export const setCart = (sizeData, popUpDetails, optionData, name, filterProduct, sum, id, qnty, itemCount, productId) => {
  return {
    type: ActionTypes.SET_CART,
    payload: { sizeData, popUpDetails, optionData, name, filterProduct, sum, id, qnty, itemCount, productId }
  }
}
