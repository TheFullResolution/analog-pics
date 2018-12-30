import { Action } from '@ngrx/store'
import { DataBaseEntry } from '_types_'

export const SET_PHOTOS = '[Database] Set Photos'

export class SetPhotos implements Action {
  readonly type = SET_PHOTOS

  constructor(public payload: DataBaseEntry[]) {}
}

export type DatabaseActions = SetPhotos
