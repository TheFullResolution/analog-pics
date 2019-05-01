import { Subject } from 'rxjs'
import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
  OnDestroy,
} from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import type from '_types_'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-picture-grid',
  template: `
    <mat-grid-list [cols]="gridCols" rowHeight="3:2" gutterSize="16px">
      <mat-grid-tile *ngFor="let image of images">
        <ng-template
          [ngTemplateOutlet]="itemTemplate"
          [ngTemplateOutletContext]="{ $implicit: image }"
        >
        </ng-template>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styleUrls: ['./picture-grid.component.scss'],
})
export class PictureGridComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe = new Subject()
  gridCols = 1

  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>
  @Input() images: type.DataBaseEntry[]

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.listenToBreakPoints()
  }
  ngOnDestroy() {
    this._ngUnsubscribe.next()
    this._ngUnsubscribe.complete()
  }

  listenToBreakPoints() {
    this.breakpointObserver
      .observe([
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this._ngUnsubscribe))
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
