import {
  SET_DATABASE_DATA,
  DatabaseActions,
  RESET_DATABASE_DATA,
  SET_DATABASE_ACTIVE,
} from './database.actions'
import types from '_types_'

export interface State {
  active: boolean
  data: types.DataBaseEntryWithId[]
}

const initialState: State = {
  active: false,
  data: [],
}

export function databaseReducer(state = initialState, action: DatabaseActions) {
  switch (action.type) {
    case SET_DATABASE_ACTIVE:
      return {
        ...state,
        active: true,
      }
    case SET_DATABASE_DATA:
      return {
        ...state,
        data: action.payload,
      }
    case RESET_DATABASE_DATA:
      return initialState
    default:
      return state
  }
}

export const getDatabaseState = (state: State) => state.data

