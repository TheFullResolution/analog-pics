import { Injectable } from '@angular/core'
import { UploadState } from './file-upload.types'
import { BehaviorSubject } from 'rxjs'

const defaultState: UploadState = {
  active: false,
  baseTransferred: 0,
  currentFileName: '',
  filesCount: 0,
  filesUploaded: 0,
  progress: 0,
  size: 0,
  transferred: 0,
}

@Injectable()
export class UploadStateService {
  private _uploadState$: BehaviorSubject<UploadState> = new BehaviorSubject(
    defaultState,
  )

  public uploadState$ = this._uploadState$.asObservable()

  constructor() {}

  initializeUpload = (files: File[]) => {
    this.resetState()

    this.updateState({
      active: true,
      filesCount: files.length,
      size: files.reduce((acc, file) => acc + file.size, 0),
    })
  }

  updateAfterFileUpload = (bytesTransferred: number) => {
    const oldState = this.getCurrentState()
    const newFilesUploaded = oldState.filesUploaded + 1
    const newBaseTransferred = oldState.baseTransferred + bytesTransferred

    this.updateState({
      baseTransferred: newBaseTransferred,
      filesUploaded: newFilesUploaded,
    })
  }

  updateSize = (bytesTransferred: number) => {
    const oldState = this.getCurrentState()

    const newTransferred = oldState.baseTransferred + bytesTransferred
    const newProgress = (newTransferred / oldState.size) * 100

    this.updateState({
      transferred: newTransferred,
      progress: newProgress,
    })
  }

  updateState = (newData: Partial<UploadState>) => {
    this._uploadState$.next({ ...this.getCurrentState(), ...newData })
  }

  resetState = () => {
    this._uploadState$.next(defaultState)
  }

  private getCurrentState = () => this._uploadState$.getValue()
}
