import { ActionTypes } from '../Action/types'

const initialCategory = {
  categories: []
}

export const categoryReducer = (state = initialCategory, { type, payload }) => {
  // console.log('action >> ', type)
  switch (type) {
    case ActionTypes.GET_CATEGORY:
      return { ...state, categories: payload }
    default:
      return state
  }
}
