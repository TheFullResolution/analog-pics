import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces'
import { Controls, UploadState } from '../../service/file-upload.types'
import { StorageService } from '../../service/storage.service'
import { UploadStateService } from '../../service/upload-state.service'

@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss'],
})
export class ProgressCardComponent implements OnInit {
  snapshot$: Observable<UploadTaskSnapshot>
  fileProgress$: Observable<number>
  uploadState$: Observable<UploadState>
  controls: typeof Controls

  constructor(
    private fileService: StorageService,
    private state: UploadStateService,
  ) {
    this.controls = Controls
  }

  ngOnInit() {
    this.snapshot$ = this.fileService.snapshot$
    this.fileProgress$ = this.fileService.fileProgress$
    this.uploadState$ = this.state.uploadState$
  }

  isActive = (snapshot: UploadTaskSnapshot) =>
    snapshot.state === 'running' &&
    snapshot.bytesTransferred < snapshot.totalBytes

  isPaused = (snapshot: UploadTaskSnapshot) => snapshot.state === 'paused'

  closePanel = () => {
    this.state.resetState()
  }

  control = (command: Controls) => {
    this.fileService.controlTask(command)
  }
}
