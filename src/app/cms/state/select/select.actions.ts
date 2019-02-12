import { Action } from '@ngrx/store'
import types from '_types_'

export const ADD_SELECTION = '[Select] Add Selection'
export const REMOVE_SELECTION = '[Select] Remove Selection'
export const CLEAR_SELECTION = '[Select] Clear Selection'

export class AddSelection implements Action {
  readonly type = ADD_SELECTION
  constructor(public payload: types.DataBaseEntry) {}
}

export class RemoveSelection implements Action {
  readonly type = REMOVE_SELECTION
  constructor(public payload: types.DataBaseEntry) {}
}

export class ClearSelection implements Action {
  readonly type = CLEAR_SELECTION
}

export type SelectActions =
  | AddSelection
  | RemoveSelection
  | ClearSelection
