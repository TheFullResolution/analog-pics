import { Component, OnInit } from '@angular/core'
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { Observable } from 'rxjs'
import { AngularFirestore } from 'angularfire2/firestore'
import { tap } from 'rxjs/operators'
import { UploadTaskSnapshot } from '../../../../../node_modules/angularfire2/storage/interfaces'

type SnapShot = Observable<UploadTaskSnapshot>[]

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  // Main task
  task: AngularFireUploadTask

  // Progress monitoring
  $percentage: Observable<number>[] = []

  $snapshot: SnapShot = []

  // State for dropzone CSS toggling
  isHovering: boolean

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
  ) {}

  toggleHover(event: boolean) {
    this.isHovering = event
  }

  startUpload(fileList: FileList) {
    // The File object

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i)

      if (file.type.split('/')[0] !== 'image') {
        console.error('unsupported file type :( ')
        return
      }

      // The storage path
      const path = `test/${new Date().getTime()}_${file.name}`

      // Totally optional metadata
      const customMetadata = { app: 'My AngularFire-powered PWA!' }

      // The main task
      const task = this.storage.upload(path, file, { customMetadata })

      // Progress monitoring
      this.$percentage.push(task.percentageChanges())
      this.$snapshot.push(
        task.snapshotChanges().pipe(
          tap(snap => {
            console.log(path)
            if (snap.bytesTransferred === snap.totalBytes) {
              // Update firestore on completion
              this.db.collection('photos').add({ path, size: snap.totalBytes })
            }
          }),
        ),
      )
    }

    // Client-side validation example
  }

  // Determines if the upload task is active
  isActive = $snapshot => {
    let active = false

    $snapshot.forEach(snap => {
      if (snap.state === 'running' && snap.bytesTransferred < snap.totalBytes) {
        active = true
      }
    })

    return active
  }
}
