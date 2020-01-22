import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { getIsAuth } from '../../state/state.selectors';
import { Store } from '@ngrx/store';
import { CmsState } from '../../state/state.reducer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  private _ngUnsubscribe = new Subject();
  isAuth$: Observable<boolean>;
  desktop = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<CmsState>,
  ) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(getIsAuth);
    this.listenToBreakPoints();
    this.listenToAuth();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  listenToAuth() {
    this.isAuth$.pipe(takeUntil(this._ngUnsubscribe)).subscribe(auth => {
      if (!auth) {
        this.sidenav.close();
      }
    });
  }

  listenToBreakPoints() {
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(result => {
        this.desktop =
          result.breakpoints[Breakpoints.Medium] ||
          result.breakpoints[Breakpoints.Large] ||
          result.breakpoints[Breakpoints.XLarge];
      });
  }
}
