import { createSelector } from '@ngrx/store';
import {
  getAuthState,
  getDataBaseState,
  getSelectState,
} from './state.reducer';

export const getIsAuth = createSelector(
  getAuthState,
  state => state.isAuthenticated,
);

export const getDataBaseData = createSelector(
  getDataBaseState,
  state => state.data,
);

export const getUnpublished = createSelector(getDataBaseData, data =>
  data.filter(el => !el.published),
);
export const gePublished = createSelector(getDataBaseData, data =>
  data.filter(el => !!el.published),
);
export const getSelectedActive = createSelector(
  getSelectState,
  state => state.active,
);
export const getSelectedData = createSelector(
  getSelectState,
  state => state.data,
);
