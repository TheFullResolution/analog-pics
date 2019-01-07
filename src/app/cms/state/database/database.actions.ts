import { Action } from '@ngrx/store'
import types from '_types_'

export const SET_DATABASE = '[Database] Set Data'
export const RESET_DATABASE = '[Database] Reset Data'

export class SetDatabase implements Action {
  readonly type = SET_DATABASE

  constructor(public payload: types.DataBaseEntry[]) {}
}

export class ResetDatabase implements Action {
  readonly type = RESET_DATABASE
}

export type DatabaseActions = SetDatabase | ResetDatabase
