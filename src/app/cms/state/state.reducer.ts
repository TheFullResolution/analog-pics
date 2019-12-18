import * as fromAuth from './auth/auth.reducer';
import * as fromDatabase from './database/database.reducer';
import * as fromSelect from './select/select.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface CmsState {
  auth: fromAuth.State
  database: fromDatabase.State
  select: fromSelect.State
}

export const reducers: ActionReducerMap<CmsState> = {
  auth: fromAuth.authReducer,
  database: fromDatabase.databaseReducer,
  select: fromSelect.selectReducer,
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getDataBaseState = createFeatureSelector<fromDatabase.State>(
  'database',
);
export const getSelectState = createFeatureSelector<fromSelect.State>('select');


