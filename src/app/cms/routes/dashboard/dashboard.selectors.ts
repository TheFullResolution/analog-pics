import { createSelector } from '@ngrx/store';
import {
  gePublished,
  getDataBaseData,
  getUnpublished,
} from '../../state/state.selectors';

export const getLastUpload = createSelector(
  getDataBaseData,
  data => data.length > 0 && data[data.length - 1].uploaded.seconds,
);

export const getUnpublishedTotals = createSelector(
  getUnpublished,
  data => data.length,
);

export const getPublishedTotals = createSelector(
  gePublished,
  data => data.length,
);
