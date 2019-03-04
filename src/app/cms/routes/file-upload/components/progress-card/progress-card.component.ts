import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces'
import { Controls, UploadState } from '../../services/file-upload.types'
import { StorageService } from '../../services/storage.service'
import { UploadStateService } from '../../services/upload-state.service'
import { routeNames } from 'src/app/cms/cms-routing.module';
import { RoutPath, getFullPath } from 'src/app/cms/cms.paths';

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


  pathToPublish = routeNames.find(el => el.path === RoutPath.publish)
  getFullPath = getFullPath

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
