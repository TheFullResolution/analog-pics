import { Component, OnInit } from '@angular/core'
import { UploadStateService } from './services/upload-state.service'
import { Observable } from 'rxjs'
import { UploadState } from './services/file-upload.types'

@Component({
  selector: 'app-file-upload',
  template: `<app-upload-card *ngIf="!(uploadState$ | async).active"></app-upload-card>
             <app-progress-card *ngIf="(uploadState$ | async).active"></app-progress-card>`,
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  uploadState$: Observable<UploadState>

  constructor(private state: UploadStateService) {}

  ngOnInit() {
    this.uploadState$ = this.state.uploadState$
  }
}
