import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import types from '_types_';
import { GetPhotosService } from '../services/get-photos.service';
import { fadeInOut } from '../../shared/animations/fadeInOut';

const animations = fadeInOut(0.6);

interface ZoomData {
  current: types.DataBaseEntryWithId | undefined;
  previous: types.DataBaseEntryWithId | null;
  next: types.DataBaseEntryWithId | null;
}

@Component({
  selector: 'app-zoom',
  animations: [animations],
  template: `
    <ng-container *ngIf="currentData$ | async as data">
      <div class="container" appHover (hovered)="toggleHover($event)">
        <a
          [routerLink]="['/zoom']"
          *ngIf="isHovering && data.previous"
          [queryParams]="{ picId: data.previous.id }"
          class="link prev"
          [@fadeInOut]
        >
          <mat-icon>fast_rewind</mat-icon>
        </a>
        <app-image
          *ngIf="data.current"
          [imageId]="data.current.id"
          [image]="data.current"
          objectFit="contain"
        ></app-image>
        <a
          [routerLink]="['/zoom']"
          *ngIf="isHovering && data.next"
          [queryParams]="{ picId: data.next.id }"
          class="link next"
          [@fadeInOut]
        >
          <mat-icon>fast_forward</mat-icon>
        </a>
        <a
          [routerLink]="['/']"
          *ngIf="isHovering"
          class="link close"
          [@fadeInOut]
        >
          <mat-icon>close</mat-icon>
        </a>
      </div>
    </ng-container>
    <div class="spinner" *ngIf="loading$ | async">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styleUrls: ['./zoom.component.scss'],
})
export class ZoomComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe = new Subject();
  currentData$: Observable<ZoomData>;
  loading$: Observable<boolean>;
  isHovering: boolean;
  defaultTouch = { x: 0, y: 0, time: 0 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private getPhotos: GetPhotosService,
  ) {}

  ngOnInit() {
    this.getCurrentData();
    this.loading$ = this.getPhotos.loading$;
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  handleTouch(event) {
    const touch = event.touches[0] || event.changedTouches[0];
    // check the events
    if (event.type === 'touchstart') {
      this.defaultTouch.x = touch.pageX;
      this.defaultTouch.time = event.timeStamp;
    } else if (event.type === 'touchend') {
      const deltaX = touch.pageX - this.defaultTouch.x;
      const deltaTime = event.timeStamp - this.defaultTouch.time;

      // simulte a swipe -> less than 500 ms and more than 60 px
      if (deltaTime < 500) {
        // touch movement lasted less than 500 ms
        if (Math.abs(deltaX) > 60) {
          // delta x is at least 60 pixels
          if (deltaX > 0) {
            this.navigateNextPicture('back');
          } else {
            this.navigateNextPicture('forward');
          }
        }
      }
    }
  }

  @HostListener('document:keydown.escape', ['$event.key'])
  @HostListener('document:keydown.ArrowRight', ['$event.key'])
  @HostListener('document:keydown.ArrowLeft', ['$event.key'])
  handleKeyDown(key) {
    switch (key) {
      case 'Escape':
        void this.router.navigate(['/']);
        break;

      case 'ArrowRight':
        this.navigateNextPicture('forward');
        break;

      case 'ArrowLeft':
        this.navigateNextPicture('back');
        break;
    }
  }

  toggleHover = (event: boolean) => {
    this.isHovering = event;
  };

  navigateNextPicture(where: 'forward' | 'back') {
    this.currentData$.pipe(take(1)).subscribe(state => {
      const nextPicture = where === 'forward' ? state.next : state.previous;

      if (!nextPicture) {
        return;
      }
      void this.router.navigate(['/zoom'], {
        queryParams: { picId: nextPicture.id },
      });
    });
  }

  getCurrentData() {
    this.currentData$ = combineLatest([
      this.route.queryParams.pipe(filter(params => params.picId)),
      this.getPhotos.getPhotosArray(),
    ]).pipe(
      takeUntil(this._ngUnsubscribe),
      map(([param, array]) => {
        const currentIndex = (array as types.DataBaseEntryWithId[]).findIndex(
          el => el.id === param.picId,
        );
        const previous = currentIndex - 1 >= 0 ? array[currentIndex - 1] : null;
        const next =
          currentIndex + 1 <= array.length ? array[currentIndex + 1] : null;
        return {
          current: array[currentIndex],
          previous,
          next,
        };
      }),
    );
  }
}
