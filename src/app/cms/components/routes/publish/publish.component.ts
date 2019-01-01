import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { DataBaseEntry, DataBaseImageSizes } from '_types_'
import { Store } from '@ngrx/store'
// @ts-ignore
import * as merge from 'lodash.merge'
import * as fromCms from '../../../state/cms.reducer'
import { map } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit {
  unpublished$: Observable<DataBaseEntry[]>

  constructor(
    private storage: AngularFireStorage,
    private store: Store<fromCms.State>,
  ) {}

  ngOnInit() {
    this.unpublished$ = this.store.select(fromCms.getUnpublished).pipe(
      map(el =>
        el.map(({ jpeg, webp, ...rest }) => {
          const newJpeg = this.assignDownloadUrls(jpeg)
          const newWebp = this.assignDownloadUrls(webp)

          return { ...rest, jpeg: newJpeg, webp: newWebp }
        }),
      ),
    )
  }

  assignDownloadUrls(sizes: DataBaseImageSizes) {
    return Object.keys(sizes).reduce(
      (object, key) => {
        const downloadUrl = this.getDownloadUrl(sizes[key].name)
        return merge(object, {
          [key]: {
            ...sizes[key],
            downloadUrl,
          },
        })
      },
      {} as DataBaseImageSizes,
    )
  }

  getDownloadUrl(location: string) {
    const urlPromise = this.storage
      .ref(location)
      .getDownloadURL()
      .toPromise()

    let url: string

    urlPromise.then(newUrl => {
      url = newUrl
    })

    return url
  }
}
