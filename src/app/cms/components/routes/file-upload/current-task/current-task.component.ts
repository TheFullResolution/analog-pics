import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Controls, Upload } from '../file-upload.types'
import { Observable } from 'rxjs'
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces'

@Component({
  selector: 'app-current-task',
  templateUrl: './current-task.component.html',
  styleUrls: ['./current-task.component.scss']
})
export class CurrentTaskComponent  {
  @Input() uploadState: Upload
  @Input() snapshot$: Observable<UploadTaskSnapshot>
  @Input()  fileProgress$: Observable<number>
  @Output() control = new EventEmitter<Controls>()

  controls: typeof Controls

  constructor() {
    this.controls = Controls
  }

  isActive = (snapshot: UploadTaskSnapshot) =>
    snapshot.state === 'running' &&
    snapshot.bytesTransferred < snapshot.totalBytes

  isPaused = (snapshot: UploadTaskSnapshot) => snapshot.state === 'paused'
}
