import { CmsState } from './../../../state/state.reducer'
import { Injectable, OnDestroy } from '@angular/core'
import type from '_types_'
import { from, combineLatest, Subject, BehaviorSubject } from 'rxjs'
import { concatMap, map, reduce, flatMap, tap, takeUntil } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/storage'
import { Store } from '@ngrx/store'
import { getUnpublished } from 'src/app/cms/state/state.selectors'

@Injectable()
export class UnpublishedService implements OnDestroy {
  private _unpublished: Subject<type.DataBaseEntryWithId[]> = new Subject()
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private _ngUnsubscribe = new Subject()
  public unpublished$ = this._unpublished.asObservable()
  public loading$ = this._loading.asObservable()

  constructor(
    private storage: AngularFireStorage,
    private store: Store<CmsState>,
  ) {}

  ngOnDestroy() {
    this._ngUnsubscribe.next()
    this._ngUnsubscribe.complete()
  }

  getUnpublished = () => {
    this.setLoading(true)
    this.store
      .select(getUnpublished)
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
        takeUntil(this._ngUnsubscribe),
      )
      .subscribe(el => {
        this._unpublished.next(el)
      })
  }

  private setLoading = (loading: boolean) => {
    this._loading.next(loading)
  }

  private processNewList = (list: type.DataBaseEntryWithId[]) =>
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
      reduce<type.DataBaseEntryWithId>((acc, val) => [...acc, val], []),
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
