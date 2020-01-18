import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ScrollPositionService {
  private _scrollPosition = new BehaviorSubject<number>(0);
  public scrollPosition = this._scrollPosition.asObservable();
  constructor() {}

  setScrollPosition(position: number) {
    console.log(position)
    this._scrollPosition.next(position);
  }

  resetScrollPosition() {
    this._scrollPosition.next(0);
  }
}
