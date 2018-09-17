import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-input-file',
  template: `
    <div class="file">
      <input id="fileInput" type="file" (change)="changed.emit($event)" #photoInput multiple>
      <button mat-raised-button color="warn" (click)="photoInput.click()">
         <i class="material-icons">cloud_upload</i>
         <span>Select Files</span>
      </button>
    </div>
  `,
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {
  @Output() changed = new EventEmitter()

  constructor() {}

  ngOnInit() {}
}
