import { Injectable, OnDestroy } from '@angular/core'
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage'
import { from, Observable, Subject, Observer, TeardownLogic } from 'rxjs'
import { concatMap, takeUntil } from 'rxjs/operators'
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces'
import { Controls } from './file-upload.types'
import { HTMLFileInputEvent } from '../../../utils/drop-zone.directive'
import { checkFileType } from '../utils/checkFileType'
import { UploadStateService } from './upload-state.service'

@Injectable()
export class StorageService implements OnDestroy {
  private _ngUnsubscribe = new Subject()
  private _task: AngularFireUploadTask
  private _snapshot: Subject<UploadTaskSnapshot> = new Subject()
  private _terminateUpload: Subject<boolean> = new Subject()
  private _fileProgress: Subject<number> = new Subject()

  public snapshot$ = this._snapshot.asObservable()
  public fileProgress$ = this._fileProgress.asObservable()

  error: string

  constructor(
    private storage: AngularFireStorage,
    private state: UploadStateService,
  ) {}

  ngOnDestroy() {
    this._ngUnsubscribe.next()
    this._ngUnsubscribe.complete()
  }

  startUpload(event: HTMLFileInputEvent) {
    this._task = null

    const files = Array.from(event.target.files)

    this.state.dispatch({ type: 'start-upload', payload: files })

    from(files)
      .pipe(
        concatMap(file => checkFileType(file)),
        takeUntil(this._terminateUpload),
        concatMap(file => this.pushUpload(file)),
        takeUntil(this._ngUnsubscribe),
      )
      .subscribe(
        el => {
          this.state.dispatch({
            type: 'file-uploaded',
            payload: el.bytesTransferred,
          })
        },
        error => {
          console.log(error)

          this.error = error
        },
      )
  }

  pushUpload(file: File): Observable<UploadTaskSnapshot> {
    return new Observable(
      (observer: Observer<UploadTaskSnapshot>): TeardownLogic => {
        this.state.dispatch({
          type: 'set-fileName',
          payload: file.name,
        })

        this._task = this.storage.upload(file.name, file)

        this.subscribeToTaskChanges()

        this._task
          .then(snap => {
            observer.next(snap)

            observer.complete()
          })
          .catch(err => {
            observer.error(err.message)
          })
      },
    )
  }

  subscribeToTaskChanges = () => {
    this._task.snapshotChanges().subscribe(el => {
      this._snapshot.next(el)

      this.state.dispatch({
        type: 'snapshot',
        payload: el.bytesTransferred,
      })
    })

    this._task.percentageChanges().subscribe(el => {
      this._fileProgress.next(el)
    })
  }

  controlTask(command: Controls) {
    switch (command) {
      case Controls.pause:
        this._task.pause()
        break
      case Controls.cancel:
        this._task.cancel()
        this._terminateUpload.next(true)
        this.state.dispatch({type: 'reset'})
        break
      case Controls.resume:
        this._task.resume()
        break
    }
  }
}
