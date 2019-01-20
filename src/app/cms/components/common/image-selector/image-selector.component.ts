import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChange,
} from '@angular/core'

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss'],
})
export class ImageSelectorComponent implements OnInit, OnChanges {
  selected: boolean
  showControls: boolean
  @Output() addSelected = new EventEmitter<string>()
  @Output() removeSelected = new EventEmitter<string>()

  @Input() selectedParent: boolean
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log(changes)
  }
}
