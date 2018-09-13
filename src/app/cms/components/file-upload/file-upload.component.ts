import { Component } from '@angular/core'
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { from, Observable, zip } from 'rxjs'
import { AngularFirestore } from 'angularfire2/firestore'
import { map, mergeMap, toArray, tap, filter } from 'rxjs/operators'

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  tasks$: Observable<any>
  progresses$: any
  snapshots$: any
  isHovering: boolean

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
  ) {}

  toggleHover(event: boolean) {
    this.isHovering = event
  }

  startUpload(event: HTMLInputEvent) {
    this.tasks$ = from([Array.from(event.target.files)]).pipe(
      map(files =>
        files.map(file => {
          const path = `test/${new Date().getTime()}_${file.name}`
          const customMetadata = { app: 'My AngularFire-powered PWA!' }

          return this.storage.upload(path, file, { customMetadata })
        }),
      ),
    )

    this.snapshots$ = this.tasks$.pipe(
      map(files =>
        files.map(file =>
          file.snapshotChanges(),
        ),
      ),
    )

    this.progresses$ = this.tasks$.pipe(
      map(files =>
        files.map(file =>
          file.percentageChanges()
        ),
      )
    )
  }
}
