import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore'
import { DataBaseEntry } from '../../../../_types_'
import { COLLECTION } from '_consts_'


@Injectable()
export class DatabaseService {
  private photosCollection: AngularFirestoreCollection<DataBaseEntry>

  constructor(private afs: AngularFirestore) {
    this.photosCollection = afs.collection<DataBaseEntry>(COLLECTION)
  }
}
