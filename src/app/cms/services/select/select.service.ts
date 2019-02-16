import { getSelectedActive } from './../../state/state.selectors'
import { CmsState, getSelectState } from './../../state/state.reducer'
import * as SelectActions from './../../state/select/select.actions'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import types from '_types_'
import { take } from 'rxjs/operators'

@Injectable()
export class SelectService {
  constructor(private store: Store<CmsState>) {}

  addSelection(pic: types.DataBaseEntryWithId) {
    this.store.dispatch(new SelectActions.AddSelection(pic))
  }

  removeSelection(pic: types.DataBaseEntryWithId) {
    this.store.dispatch(new SelectActions.RemoveSelection(pic))
  }

  clearSelection() {
    this.store.dispatch(new SelectActions.ClearSelection())
  }

  getCurrentSelection() {
    let currentState: types.DataBaseEntryWithId[]

    this.store
      .select(getSelectState)
      .pipe(take(1))
      .subscribe(selectState => {
        currentState = selectState.data
      })

    return currentState
  }

  getSelectionActive() {
    this.store.select(getSelectedActive)
  }
}
