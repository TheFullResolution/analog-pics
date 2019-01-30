import { Component, OnInit } from '@angular/core'
import { Observable, from, combineLatest } from 'rxjs'
import type from '_types_'
import { Store } from '@ngrx/store'
import * as fromState from '../../state/cms.reducer'
import { map, flatMap, reduce, tap, concatMap } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit {
  loading = false
  unpublished$: Observable<type.DataBaseEntry[]>

  constructor(
    private storage: AngularFireStorage,
    private store: Store<fromState.State>,
  ) {}

  ngOnInit() {
    this.unpublished$ = this.assignUnpublished()
  }

  setLoading = (loading: boolean) => {
    this.loading = loading
  }

  assignUnpublished = () => {
    this.setLoading(true)
    return this.store.select(fromState.getUnpublished).pipe(
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
  }

  processNewList = (list: type.DataBaseEntry[]) =>
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

  updateThumbsWithUrl = (thumbs: type.DataBaseImageObject[]) =>
    from(thumbs).pipe(
      flatMap(thumb =>
        combineLatest(this.getDownloadUrl(thumb.name), from([thumb])),
      ),
      map(([downloadUrl, thumb]) => ({ ...thumb, downloadUrl })),
      reduce<type.DataBaseImageObject>((acc, thumb) => [...acc, thumb], []),
    )

  getDownloadUrl = (location: string) =>
    this.storage.ref(location).getDownloadURL()
}
