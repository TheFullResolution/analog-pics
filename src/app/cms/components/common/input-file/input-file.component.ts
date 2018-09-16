import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-input-file',
  template: `
    <div class="file">
      <input id="fileInput"
             type="file"
             (change)="changed.emit($event)"
             multiple>
      <label for="fileInput">
        <i class="material-icons">cloud_upload</i>
        <span>or choose a file…</span>
      </label>
    </div>
  `,
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {
  @Output()
  changed = new EventEmitter()

  constructor() {}

  ngOnInit() {}
}
