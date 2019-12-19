import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-file',
  template: `
    <div class="file">
      <input
        id="fileInput"
        type="file"
        (change)="changed.emit($event)"
        #photoInput
        multiple
      />
      <button mat-raised-button color="warn" (click)="photoInput.click()">
        <mat-icon>cloud_upload</mat-icon>
        <span>Select Files</span>
      </button>
    </div>
  `,
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent {
  @Output() changed = new EventEmitter();

  constructor() {
  }
}
