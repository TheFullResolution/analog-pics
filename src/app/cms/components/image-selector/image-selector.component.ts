import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import type from '_types_';
import { fadeInOut } from '../../animations/fadeInOut';

@Component({
  selector: 'app-image-selector',
  animations: [fadeInOut],
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
        *ngIf="selected || isHovering || (anySelected | async)"
        [checked]="selected"
        (change)="onChangeCheckbox(!selected)"
        [@fadeInOut]
      >
      </mat-checkbox>
      <a (click)="toggleSelected(!selected)">
        <ng-content [class.hovering]="isHovering"></ng-content>
      </a>
    </div>
  `,
  styleUrls: ['./image-selector.component.scss'],
})
export class ImageSelectorComponent implements OnInit {
  showControls: boolean;
  isHovering: boolean;
  anySelectedValue: boolean;

  @Output() addSelected = new EventEmitter<type.DataBaseEntryWithId>();
  @Output() removeSelected = new EventEmitter<type.DataBaseEntryWithId>();

  @Input() selected: boolean;
  @Input() anySelected: Observable<boolean>;
  @Input() image: type.DataBaseEntryWithId;

  constructor() {}

  ngOnInit() {
    this.anySelected.subscribe(val => {
      this.anySelectedValue = val;
    });
  }

  toggleHover = (event: boolean) => {
    this.isHovering = event;
  }

  toggleSelected = (value: boolean) => {
    if (this.anySelectedValue) {
      this.emitChange(value);
    }
  }

  onChangeCheckbox = (value: boolean) => {
    this.emitChange(value);
  }

  emitChange = (value: boolean) => {
    if (value) {
      this.addSelected.emit(this.image);
    } else {
      this.removeSelected.emit(this.image);
    }
  }
}
