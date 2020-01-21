import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
    <div class="spinner">
      <mat-spinner *ngIf="loading$ | async"></mat-spinner>
    </div>
  `,
  styleUrls: ['./zoom.component.scss'],
})
export class ZoomComponent implements OnInit {
  currentData$: Observable<ZoomData>;
  loading$: Observable<boolean>;
  isHovering: boolean;

  constructor(
    private route: ActivatedRoute,
    private getPhotos: GetPhotosService,
  ) {}

  ngOnInit() {
    this.getCurrentData();
    this.loading$ = this.getPhotos.loading$;
  }

  toggleHover = (event: boolean) => {
    this.isHovering = event;
  };

  getCurrentData() {
    this.currentData$ = combineLatest([
      this.route.queryParams.pipe(filter(params => params.picId)),
      this.getPhotos.getPhotosArray(),
    ]).pipe(
      map(([param, array]) => {
        const currentIndex = array.findIndex(el => el.id === param.picId);
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
