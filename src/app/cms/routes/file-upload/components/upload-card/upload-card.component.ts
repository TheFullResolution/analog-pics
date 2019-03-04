import { Component } from '@angular/core'
import { StorageService } from '../../services/storage.service'
import { HTMLFileInputEvent } from '../../../../utils/drop-zone.directive'

@Component({
  selector: 'app-upload-card',
  templateUrl: './upload-card.component.html',
  styleUrls: ['./upload-card.component.scss'],
})
export class UploadCardComponent {
  isHovering: boolean

  constructor(private fileService: StorageService) {}

  toggleHover(event: boolean) {
    this.isHovering = event
  }

  startUpload = (event: HTMLFileInputEvent) => {
    this.fileService.startUpload(event)
  }
}
