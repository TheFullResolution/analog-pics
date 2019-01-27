import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChange,
  ContentChildren,
} from '@angular/core'
import { ImageComponent } from '../image/image.component'

@Component({
  // tslint:disable-next-line:use-host-property-decorator
  selector: 'app-image-selector',
  template: `
    <div
      class="wrapper"
      appHover
      (hovered)="toggleHover($event)"
      [class.selected]="selected"
    >
      <mat-checkbox
        class="check"
        ariaLabel="Select this Image"
        *ngIf="selected || isHovering"
        [(ngModel)]="selected"
      >
      </mat-checkbox>
      <ng-content [class.hovering]="isHovering"></ng-content>
    </div>
  `,
  styleUrls: ['./image-selector.component.scss'],
})
export class ImageSelectorComponent implements OnInit, OnChanges {
  selected: boolean
  showControls: boolean
  isHovering: boolean

  @Output() addSelected = new EventEmitter<string>()
  @Output() removeSelected = new EventEmitter<string>()

  @Input() selectedParent: boolean
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log(changes)
  }

  toggleHover(event: boolean) {
    this.isHovering = event
  }
}
