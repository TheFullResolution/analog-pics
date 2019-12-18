import types from '_types_';
import { take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as SelectActions from '../../state/select/select.actions';
import { CmsState, getSelectState } from '../../state/state.reducer';
import { getSelectedActive, getSelectedData } from '../../state/state.selectors';

@Injectable()
export class SelectService {
  constructor(private store: Store<CmsState>) {
  }

  addSelection(pics: types.DataBaseEntryWithId[]) {
    this.store.dispatch(new SelectActions.AddSelection(pics));
  }

  removeSelection(pic: types.DataBaseEntryWithId) {
    this.store.dispatch(new SelectActions.RemoveSelection(pic));
  }

  clearSelection() {
    this.store.dispatch(new SelectActions.ClearSelection());
  }

  getCurrentSelection() {
    let currentState: types.DataBaseEntryWithId[];

    this.store
      .select(getSelectState)
      .pipe(take(1))
      .subscribe(selectState => {
        currentState = selectState.data;
      });

    return currentState;
  }

  getSelectionData = () => this.store.select(getSelectedData);

  getSelectionActive = () => this.store.select(getSelectedActive);
}
