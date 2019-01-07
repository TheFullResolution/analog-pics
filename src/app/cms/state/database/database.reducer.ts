import {
  SET_DATABASE,
  DatabaseActions,
  RESET_DATABASE,
} from './database.actions'
import types from '_types_'

export interface State {
  data: types.DataBaseEntry[]
}

const initialState: State = {
  data: [],
}

export function databaseReducer(state = initialState, action: DatabaseActions) {
  switch (action.type) {
    case SET_DATABASE:
      return {
        data: action.payload,
      }
    case RESET_DATABASE:
      return initialState
    default:
      return state
  }
}

export const getDatabaseState = (state: State) => state.data
