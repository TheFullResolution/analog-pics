import { SET_PHOTOS, DatabaseActions } from './database.actions'
import { DataBaseEntry } from '_types_'

export interface State {
  photos: DataBaseEntry[]
}

const initialState: State = {
  photos: [],
}

export function databaseReducer(state = initialState, action: DatabaseActions) {
  switch (action.type) {
    case SET_PHOTOS:
      return {
        photos: action.payload,
      }
    default:
      return state
  }
}

export const getPhotos = (state: State) => state.photos
