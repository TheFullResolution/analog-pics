import { getUnpublished } from './../../../state/cms.reducer'
import { Injectable } from '@angular/core'
import type from '_types_'
import {
  Observable,
  from,
  combineLatest,
  Subject,
  Subscription,
  BehaviorSubject,
} from 'rxjs'
import { concatMap, map, reduce, flatMap, tap } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/storage'
import { Store } from '@ngrx/store'
import * as fromState from '../../../state/cms.reducer'

@Injectable()
export class UnpublishedService {
  private _storeSubscription$: Subscription
  private _unpublished$: Subject<type.DataBaseEntry[]> = new Subject()
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  public unpublished$ = this._unpublished$.asObservable()
  public loading$ = this._loading$.asObservable()

  constructor(
    private storage: AngularFireStorage,
    private store: Store<fromState.State>,
  ) {}

  getUnpublished = () => {
    this.setLoading(true)
    this._storeSubscription$ = this.store
      .select(fromState.getUnpublished)
      .pipe(
        flatMap(list => {
          const newList = this.processNewList(list)

          return combineLatest(newList)
        }),
        map(([el]) => el),
        tap(el => {
          if (el.length > 0) {
            this.setLoading(false)
          }
        }),
      )
      .subscribe(el => {
        this._unpublished$.next(el)
      })
  }

  private setLoading = (loading: boolean) => {
    this._loading$.next(loading)
  }

  private processNewList = (list: type.DataBaseEntry[]) =>
    from(list).pipe(
      concatMap(entry => {
        const { thumbs, ...rest } = entry

        const newThumbs = this.updateThumbsWithUrl(thumbs)

        return combineLatest(from([rest]), newThumbs)
      }),
      map(([obj, thumbs]) => ({
        ...obj,
        thumbs,
      })),
      reduce<type.DataBaseEntry>((acc, val) => [...acc, val], []),
    )

  private updateThumbsWithUrl = (thumbs: type.DataBaseImageObject[]) =>
    from(thumbs).pipe(
      flatMap(thumb =>
        combineLatest(this.getDownloadUrl(thumb.name), from([thumb])),
      ),
      map(([downloadUrl, thumb]) => ({ ...thumb, downloadUrl })),
      reduce<type.DataBaseImageObject>((acc, thumb) => [...acc, thumb], []),
    )

  private getDownloadUrl = (location: string) =>
    this.storage.ref(location).getDownloadURL()
}
