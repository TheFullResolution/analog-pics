import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import types from '_types_'
import consts from '_consts_'
import { from, BehaviorSubject } from 'rxjs'
import { concatMap, map } from 'rxjs/operators'

@Injectable()
export class PublishService {
  private _processing: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public processing$ = this._processing.asObservable()

  constructor(private db: AngularFirestore) {}

  publishPictures = ({
    pics,
    callback,
  }: {
    pics: types.DataBaseEntryWithId[]
    callback: () => void
  }) => {
    this._processing.next(true)
    from(pics)
      .pipe(
        map(pic => ({ ...pic, published: true })),
        concatMap(pic => from(this.updateFirebase(pic))),
      )
      .subscribe({
        complete: () => {
          this._processing.next(false)
          callback()
        },
      })
  }

  updateFirebase = (pic: types.DataBaseEntryWithId) => {
    const document = this.db.doc<types.DataBaseEntry>(
      `${consts.COLLECTION}/${pic.id}`,
    )

    return document.update(pic)
  }
}
