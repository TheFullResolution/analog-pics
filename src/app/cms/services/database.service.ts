import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore'
import { DataBaseEntry } from '_types_'
import { COLLECTION } from '_consts_'
import { Store } from '@ngrx/store'
import * as fromCms from '../state/cms.reducer'
import * as DatabaseActions from '../state/database/database.actions'
import { Observable, Subscription } from 'rxjs'

@Injectable()
export class DatabaseService {
  private photosCollection: AngularFirestoreCollection<DataBaseEntry>
  private photosListener: Subscription

  constructor(
    private db: AngularFirestore,
    private store: Store<fromCms.State>,
  ) {
    this.photosCollection = db.collection<DataBaseEntry>(COLLECTION)
  }

  fetchDatabase() {
    this.photosListener = this.photosCollection
      .valueChanges()
      .subscribe((data: DataBaseEntry[]) => {
        this.store.dispatch(new DatabaseActions.SetDatabase(data))
      })
  }

  stopFetchingDatabase() {
    this.photosListener.unsubscribe()
    this.store.dispatch(new DatabaseActions.ResetDatabase())
  }
}
