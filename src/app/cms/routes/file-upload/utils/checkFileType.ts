import { Observable, Observer, TeardownLogic } from 'rxjs'

export const checkFileType = (file: File): Observable<File> =>
  Observable.create(
    (observer: Observer<File>): TeardownLogic => {
      if (file.type.split('/')[0] !== 'image') {
        observer.error('unsupported file type :( ')
      }

      observer.next(file)

      observer.complete()
    },
  )
