import * as fromAuth from './auth/auth.reducer'
import * as fromDatabase from './database/database.reducer'
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store'

export interface State {
  auth: fromAuth.State
  database: fromDatabase.State
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  database: fromDatabase.databaseReducer,
}

export const getAuthState = createFeatureSelector<fromAuth.State>('auth')
export const getDataBaseState = createFeatureSelector<fromDatabase.State>(
  'database',
)

export const getIsAuth = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticated,
)

export const getData = createSelector(
  getDataBaseState,
  fromDatabase.getDatabaseState,
)

export const getUnpublished = createSelector(
  getData,
  data => data.filter(el => !el.published),
)
