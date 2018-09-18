import { Component } from '@angular/core'
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { from, Observable, of, Subscription } from 'rxjs'
import { AngularFirestore } from 'angularfire2/firestore'
import { concatMap, catchError } from 'rxjs/operators'
import { checkFileType } from './utils/checkFileType'
import { HTMLFileInputEvent } from '../../../utils/drop-zone.directive'
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces'
import { Controls, Upload } from './file-upload.types'

const defaultState = {
  progress: 0,
  size: 0,
  transferred: 0,
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  task$: AngularFireUploadTask
  tasks$: Subscription
  snapshot$: Observable<UploadTaskSnapshot>
  fileProgress$: Observable<number>
  uploadState: Upload
  isHovering: boolean
  error: string

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
  ) {
    this.uploadState = defaultState
  }

  toggleHover(event: boolean) {
    this.isHovering = event
  }

  startUpload(event: HTMLFileInputEvent) {
    this.task$ = null
    this.uploadState = defaultState

    const files = Array.from(event.target.files)

    this.uploadState = {
      ...this.uploadState,
      size: files.reduce((acc, file) => acc + file.size, 0),
    }

    this.tasks$ = from(files)
      .pipe(
        concatMap(file => checkFileType(file)),
        concatMap(file => this.pushUpload(file)),
        catchError(err => of(err)),
      )
      .subscribe(
        el => {
          const newTransferred =
            this.uploadState.transferred + el.bytesTransferred
          const newTotal = (newTransferred / this.uploadState.size) * 100

          this.uploadState = {
            ...this.uploadState,
            transferred: newTransferred,
            progress: newTotal,
          }
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
      this.fileProgress$ = this.task$.percentageChanges()

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

  controlTask(command: Controls) {
    switch (command) {
      case Controls.pause:
        this.task$.pause()
        break
      case Controls.cancel:
        this.task$.cancel()
        break
      case Controls.resume:
        this.task$.resume()
        break
    }
  }
}
