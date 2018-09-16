import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-input-file',
  template: `
    <div class="file">
      <label class="file-label" for="file-input">
        <i class="material-icons">cloud_upload</i>
        <span>or choose a file…</span>
      </label>
      <input class="file-input" id="file-input"
             type="file"
             (change)="changed.emit($event)"
             multiple>
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
