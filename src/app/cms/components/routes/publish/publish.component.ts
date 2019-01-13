import { Component, OnInit } from '@angular/core'
import { Observable, from, combineLatest } from 'rxjs'
import type from '_types_'
import { Store } from '@ngrx/store'
import * as fromCms from '../../../state/cms.reducer'
import { map, flatMap, reduce, scan } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit {
  unpublished$: Observable<type.DataBaseEntry[]>

  constructor(
    private storage: AngularFireStorage,
    private store: Store<fromCms.State>,
  ) {}

  ngOnInit() {
    this.unpublished$ = this.store.select(fromCms.getUnpublished).pipe(
      flatMap(list => from(list)),
      flatMap(entry => {
        const { thumbs, ...rest } = entry

        const newThumbs = this.updateThumbsWithUrl(thumbs)

        return combineLatest(from([rest]), newThumbs)
      }),
      map(([obj, thumbs]) => ({
        ...obj,
        thumbs,
      })),
      scan<type.DataBaseEntry>((acc, val) => [...acc, val], []),
    )
  }

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
