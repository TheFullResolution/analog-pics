import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import types from '_types_'
import consts from '_consts_'
import { from, BehaviorSubject } from 'rxjs'
import { concatMap } from 'rxjs/operators'

@Injectable()
export class DeleteService {
  private _processing: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public processing$ = this._processing.asObservable()

  constructor(private db: AngularFirestore) {}

  deletePictures = (pics: types.DataBaseEntryWithId[]) => {
    this._processing.next(true)
    from(pics)
      .pipe(concatMap(pic => from(this.deleteFromFirebase(pic))))
      .subscribe({
        complete: () => {
          this._processing.next(false)
        },
      })
  }

  deleteFromFirebase = (pic: types.DataBaseEntryWithId) => {
    const document = this.db.doc<types.DataBaseEntry>(
      `${consts.COLLECTION}/${pic.id}`,
    )

    return document.delete()
  }
}