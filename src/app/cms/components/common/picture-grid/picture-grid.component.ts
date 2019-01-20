import { Subscription } from 'rxjs'
import { Component, OnInit, Input } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import type from '_types_'

@Component({
  selector: 'app-picture-grid',
  template: `
    <mat-grid-list [cols]="gridCols" rowHeight="2:1" gutterSize="5px">
      <mat-grid-tile *ngFor="let image of images">
        <app-image [image]="image"></app-image>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styleUrls: ['./picture-grid.component.scss'],
})
export class PictureGridComponent implements OnInit {
  breakpoints: Subscription
  gridCols = 1
  @Input() images: type.DataBaseEntry[]
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.listenToBreakPoints()
  }

  listenToBreakPoints() {
    this.breakpoints = this.breakpointObserver
      .observe([
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe(result => {
        if (
          result.breakpoints[Breakpoints.Small] ||
          result.breakpoints[Breakpoints.Medium]
        ) {
          this.gridCols = 2
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.gridCols = 3
        } else if (result.breakpoints[Breakpoints.XLarge]) {
          this.gridCols = 4
        } else {
          this.gridCols = 1
        }
      })
  }
}
