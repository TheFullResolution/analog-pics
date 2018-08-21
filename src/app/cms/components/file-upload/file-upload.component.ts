import { Component, OnInit } from '@angular/core'
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import {concat, forkJoin, from, Observable, zip} from 'rxjs'
import { AngularFirestore } from 'angularfire2/firestore'
import {
  concatMap,
  flatMap,
  map, mergeMap,
  switchMap,
  tap,
  toArray,
} from 'rxjs/operators'

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  tasks: Observable<AngularFireUploadTask>
  progresses$: any
  isHovering: boolean

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
  ) {}

  toggleHover(event: boolean) {
    this.isHovering = event
  }

  startUpload(event: HTMLInputEvent) {
    // The File object
    const files = Array.from(event.target.files)

    // @ts-ignore
    this.tasks = from(files).pipe(
      map(file => {
        const path = `test/${new Date().getTime()}_${file.name}`
        const customMetadata = { app: 'My AngularFire-powered PWA!' }

        return this.storage.upload(path, file, { customMetadata })
      }),
    )

    this.progresses$ = this.tasks
      .pipe(
        map(task => task.percentageChanges()),
        toArray(),
        mergeMap(tasks => {
          return zip(...tasks)
        }),
      )

    console.log(this.progresses$)

    // // Progress monitoring
    // this.$percentage.push(task.percentageChanges())
    // this.$snapshot.push(
    //   task.snapshotChanges().pipe(
    //     tap(snap => {
    //       console.log(path)
    //       if (snap.bytesTransferred === snap.totalBytes) {
    //         // Update firestore on completion
    //         this.db.collection('photos').add({ path, size: snap.totalBytes })
    //       }
    //     }),
    //   ),
    // )

    // Client-side validation example
  }

  // Determines if the upload task is active
  // isActive = $snapshot => {
  //   let active = false
  //
  //   $snapshot.forEach(snap => {
  //     if (snap.state === 'running' && snap.bytesTransferred < snap.totalBytes) {
  //       active = true
  //     }
  //   })
  //
  //   return active
  // }
}
