import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetPhotosService } from './services/get-photos.service';
import { Event, Router, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter, takeUntil } from 'rxjs/operators';
import { ScrollPositionService } from './services/scroll-position.service';
import { combineLatest, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-gallery',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class GalleryComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe = new Subject();
  scrollPosition: Observable<number>;

  constructor(
    private getPhotos: GetPhotosService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private scrollPosService: ScrollPositionService,
  ) {}

  ngOnInit() {
    this.getPhotos.callFirebase();
    this.scrollPosition = this.scrollPosService.scrollPosition;
    this.listenToRouter();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  listenToRouter() {
    // this.router.events
    //   .pipe( filter((e: Event): e is Scroll => e instanceof Scroll))
    //   // .pipe()
    //   .subscribe(e => {
    //     console.log({ e });
    //     if (e.position) {
    //       // backward navigation
    //       this.viewportScroller.scrollToPosition(e.position);
    //     } else if (e.anchor) {
    //       // anchor navigation
    //       this.viewportScroller.scrollToAnchor(e.anchor);
    //     } else {
    //       // forward navigation
    //       this.viewportScroller.scrollToPosition([0, 0]);
    //     }
    //   });
  }
}
