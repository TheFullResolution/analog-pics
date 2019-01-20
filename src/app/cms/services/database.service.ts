import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore'
import types from '_types_'
import consts from '_consts_'
import { Store } from '@ngrx/store'
import * as fromCms from '../state/cms.reducer'
import * as DatabaseActions from '../state/database/database.actions'
import { Observable, Subscription } from 'rxjs'

@Injectable()
export class DatabaseService {
  private photosCollection: AngularFirestoreCollection<types.DataBaseEntry>
  private photosListener: Subscription

  constructor(
    private db: AngularFirestore,
    private store: Store<fromCms.State>,
  ) {
    this.photosCollection = db.collection<types.DataBaseEntry>(
      consts.COLLECTION,
    )
  }

  fetchDatabase() {
    this.store.dispatch(new DatabaseActions.SetDatabaseActive())
    this.photosListener = this.photosCollection
      .valueChanges()
      .subscribe((data: types.DataBaseEntry[]) => {
        this.store.dispatch(new DatabaseActions.SetDatabaseData(data))
      })
  }

  stopFetchingDatabase() {
    this.photosListener.unsubscribe()
    this.store.dispatch(new DatabaseActions.ResetDatabaseData())
  }
}
