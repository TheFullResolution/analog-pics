import { Injectable } from '@angular/core'
import { UploadState } from './file-upload.types'
import { BehaviorSubject, Subject, Observable, merge } from 'rxjs'
import { startWith, scan, refCount, publishReplay } from 'rxjs/operators'

const defaultState: UploadState = {
  active: false,
  baseTransferred: 0,
  currentFileName: '',
  filesCount: 0,
  currentFileCount: 1,
  progress: 0,
  size: 0,
  transferred: 0,
}

interface SetFileNameAction {
  type: 'set-fileName'
  payload: string
}
interface ResetAction {
  type: 'reset'
}

interface FileUploadedAction {
  type: 'file-uploaded'
  payload: number
}

interface SnapshotAction {
  type: 'snapshot'
  payload: number
}

interface StartUpload {
  type: 'start-upload'
  payload: File[]
}

type Action =
  | SetFileNameAction
  | FileUploadedAction
  | ResetAction
  | SnapshotAction
  | StartUpload

const startUpload = (files: File[]): Partial<UploadState> => ({
  active: true,
  filesCount: files.length,
  size: files.reduce((acc, file) => acc + file.size, 0),
})

const fileUpload = (
  bytesTransferred: number,
  state: UploadState,
): Partial<UploadState> => {
  const currentFileCount = (state.filesCount = state.currentFileCount
    ? state.currentFileCount
    : state.currentFileCount + 1)
  const baseTransferred = state.baseTransferred + bytesTransferred
  return { currentFileCount, baseTransferred }
}

const snapshot = (
  bytesTransferred: number,
  state: UploadState,
): Partial<UploadState> => {
  const transferred = state.baseTransferred + bytesTransferred
  const progress = (transferred / state.size) * 100
  return { progress, transferred }
}

@Injectable()
export class UploadStateService {
  private actions$: Subject<Action> = new Subject<Action>()

  public uploadState$ = this.actions$.pipe(
    startWith(defaultState),
    scan(
      (state: UploadState, action: Action): UploadState => {
        switch (action.type) {
          case 'set-fileName':
            return { ...state, currentFileName: action.payload }
          case 'start-upload':
            return { ...state, ...startUpload(action.payload) }
          case 'file-uploaded':
            return { ...state, ...fileUpload(action.payload, state) }
          case 'snapshot':
            return { ...state, ...snapshot(action.payload, state) }
          case 'reset':
            return defaultState
          default:
            return state
        }
      },
    ),
    publishReplay(1),
    refCount(),
  )

  constructor() {}

  dispatch(action: Action): void {
    this.actions$.next(action)
  }
}
