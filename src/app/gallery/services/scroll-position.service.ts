import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { last, take } from 'rxjs/operators';

@Injectable()
export class ScrollPositionService {
  private _scrollPosition = new BehaviorSubject<number>(0);
  public scrollPosition$ = this._scrollPosition.asObservable();
  constructor(private viewportScroller: ViewportScroller) {}

  setScrollPosition() {
    this._scrollPosition.next(this.viewportScroller.getScrollPosition()[1]);
  }

  restoreScrollPosition() {
    this.scrollPosition$.pipe(take(1)).subscribe(scrollPosition => {
      this.viewportScroller.scrollToPosition([0, scrollPosition]);
      this._scrollPosition.next(0);
    });
  }
}
