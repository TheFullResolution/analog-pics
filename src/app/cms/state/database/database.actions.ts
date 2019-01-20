import { Action } from '@ngrx/store'
import types from '_types_'

export const SET_DATABASE_ACTIVE = '[Database] Set Active'
export const SET_DATABASE_DATA = '[Database] Set Data'
export const RESET_DATABASE_DATA = '[Database] Reset Data'

export class SetDatabaseActive implements Action {
  readonly type = SET_DATABASE_ACTIVE
}

export class SetDatabaseData implements Action {
  readonly type = SET_DATABASE_DATA

  constructor(public payload: types.DataBaseEntry[]) {}
}

export class ResetDatabaseData implements Action {
  readonly type = RESET_DATABASE_DATA
}

export type DatabaseActions =
  | SetDatabaseData
  | ResetDatabaseData
  | SetDatabaseActive
