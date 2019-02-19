import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChange,
} from '@angular/core'
import type from '_types_'
import { fadeInOut } from '../../animations/fadeInOut'
import { MatCheckboxChange } from '@angular/material'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-image-selector',
  animations: [fadeInOut()],
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
        [(ngModel)]="selected"
        (change)="onChangeCheckbox($event)"
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
export class ImageSelectorComponent implements OnInit, OnChanges {
  showControls: boolean
  isHovering: boolean
  anySelectedValue: boolean

  @Output() addSelected = new EventEmitter<type.DataBaseEntryWithId>()
  @Output() removeSelected = new EventEmitter<type.DataBaseEntryWithId>()

  @Input() selected: boolean
  @Input() anySelected: Observable<boolean>
  @Input() image: type.DataBaseEntryWithId
  constructor() {}

  ngOnInit() {
    this.anySelected.subscribe(val => {
      this.anySelectedValue = val
    })
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log(changes)
  }

  toggleHover = (event: boolean) => {
    this.isHovering = event
  }

  toggleSelected = (value: boolean) => {
    if (this.anySelectedValue) {
      this.selected = value
      this.emitChange(value)
    }
  }

  onChangeCheckbox = ($event: MatCheckboxChange) => {
    console.log(this.selected)

    this.emitChange($event.checked)
  }

  emitChange = (value: boolean) => {
    if (value) {
      this.addSelected.emit(this.image)
    } else {
      this.removeSelected.emit(this.image)
    }
  }
}
