import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe = new Subject()
  desktop = false

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
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(result => {        
        if (
          result.breakpoints[Breakpoints.Medium] ||
          result.breakpoints[Breakpoints.Large]  ||
          result.breakpoints[Breakpoints.XLarge]
        ) {
          this.desktop = true
        } else {
          this.desktop = false
        }
      })
  }

}
