import { Injectable } from '@angular/core'
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { from, Observable, of, Subject, Subscription } from 'rxjs'
import { concatMap, catchError } from 'rxjs/operators'
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces'
import { Controls } from './file-upload.types'
import { HTMLFileInputEvent } from '../../../../utils/drop-zone.directive'
import { checkFileType } from '../utils/checkFileType'
import { UploadStateService } from './upload-state.service'
import { IS_PROCESSED } from '../../../../../../../functions/src/imageFunction/ImageConfig'

@Injectable()
export class StorageService {
  private _task$: AngularFireUploadTask
  private _tasks$: Subscription
  private _snapshot$: Subject<UploadTaskSnapshot> = new Subject()
  private _fileProgress$: Subject<number> = new Subject()

  public snapshot$ = this._snapshot$.asObservable()
  public fileProgress$ = this._fileProgress$.asObservable()

  error: string

  constructor(
    private storage: AngularFireStorage,
    private state: UploadStateService,
  ) {}

  startUpload(event: HTMLFileInputEvent) {
    this._task$ = null

    const files = Array.from(event.target.files)

    this.state.initializeUpload(files)

    this._tasks$ = from(files)
      .pipe(
        concatMap(file => checkFileType(file)),
        concatMap(file => this.pushUpload(file)),
        catchError(err => of(err)),
      )
      .subscribe(
        el => {
          this.state.updateAfterFileUpload(el.bytesTransferred)
        },
        error => {
          this.error = error
        },
        () => {
          this.state.updateState({ active: false })
        },
      )
  }

  pushUpload(file: File): Observable<UploadTaskSnapshot> {
    return Observable.create(observer => {
      this.state.updateState({
        currentFileName: file.name,
      })

      this._task$ = this.storage.upload(file.name, file)

      this.subscribeToTaskChanges()

      this._task$
        .then(snap => {
          observer.next(snap)

          observer.complete()
        })
        .catch(err => {
          observer.error(err.message)
        })
    })
  }

  subscribeToTaskChanges = () => {
    this._task$.snapshotChanges().subscribe(el => {
      this._snapshot$.next(el)

      this.state.updateSize(el.bytesTransferred)
    })

    this._task$.percentageChanges().subscribe(el => {
      this._fileProgress$.next(el)
    })
  }

  controlTask(command: Controls) {
    switch (command) {
      case Controls.pause:
        this._task$.pause()
        break
      case Controls.cancel:
        this._task$.cancel()
        break
      case Controls.resume:
        this._task$.resume()
        break
    }
  }
}
