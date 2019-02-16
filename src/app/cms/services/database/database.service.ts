import { CmsState } from './../../state/state.reducer'
import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore'
import types from '_types_'
import consts from '_consts_'
import { Store } from '@ngrx/store'
import * as DatabaseActions from '../../state/database/database.actions'
import {  Subscription } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class DatabaseService {
  private photosCollection: AngularFirestoreCollection<types.DataBaseEntry>
  private photosListener: Subscription

  constructor(
    private db: AngularFirestore,
    private store: Store<CmsState>,
  ) {
    this.photosCollection = db.collection<types.DataBaseEntry>(
      consts.COLLECTION,
      ref => ref.orderBy('uploaded')
    )
  }

  fetchDatabase() {
    this.store.dispatch(new DatabaseActions.SetDatabaseActive())
    this.photosListener = this.photosCollection
      .stateChanges(['added']).pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as types.DataBaseEntry
          const id = a.payload.doc.id
          return { id, ...data }
        }))
      )
      .subscribe((data: types.DataBaseEntryWithId[]) => {
        this.store.dispatch(new DatabaseActions.SetDatabaseData(data))
      })
  }

  stopFetchingDatabase() {
    this.photosListener.unsubscribe()
    this.store.dispatch(new DatabaseActions.ResetDatabaseData())
  }
}
