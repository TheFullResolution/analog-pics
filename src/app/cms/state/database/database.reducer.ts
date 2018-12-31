import {
  SET_DATABASE,
  DatabaseActions,
  RESET_DATABASE,
} from './database.actions'
import { DataBaseEntry } from '_types_'

export interface State {
  data: DataBaseEntry[]
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
