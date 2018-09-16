import { Component } from '@angular/core'
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { from, Observable, of, Subscription } from 'rxjs'
import { AngularFirestore } from 'angularfire2/firestore'
import { concatMap, catchError } from 'rxjs/operators'
import { checkFileType } from './utils/checkFileType'
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot
import { HTMLFileInputEvent } from '../../../utils/drop-zone.directive'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  task$: AngularFireUploadTask
  tasks$: Subscription
  progress = 0
  snapshot$: any
  totalSize = 0
  transferredData = 0
  isHovering: boolean
  error: string

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
  ) {}

  toggleHover(event: boolean) {
    this.isHovering = event
  }

  startUpload(event: HTMLFileInputEvent) {
    const files = Array.from(event.target.files)

    this.totalSize = files.reduce((acc, file) => acc + file.size, 0)

    this.tasks$ = from(files)
      .pipe(
        concatMap(file => checkFileType(file)),
        concatMap(file => this.pushUpload(file)),
        catchError(err => of(err)),
      )
      .subscribe(
        el => {
          this.transferredData = this.transferredData + el.bytesTransferred

          this.progress = (this.transferredData / this.totalSize) * 100
        },
        error => {
          this.error = error
        },
      )
  }

  pushUpload(file: File): Observable<UploadTaskSnapshot> {
    return Observable.create(observer => {
      const path = `test/${new Date().getTime()}_${file.name}`

      this.task$ = this.storage.upload(path, file)

      this.snapshot$ = this.task$.snapshotChanges()

      this.task$
        .then(snap => {
          observer.next(snap)

          observer.complete()
        })
        .catch(err => {
          observer.error(err.message)
        })
    })
  }

  isActive = snapshot =>
    snapshot.state === 'running' &&
    snapshot.bytesTransferred < snapshot.totalBytes
}
