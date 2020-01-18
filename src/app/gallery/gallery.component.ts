import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetPhotosService } from './services/get-photos.service';
import { Subject } from 'rxjs';
import { Router, Scroll, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ScrollPositionService } from './services/scroll-position.service';

@Component({
  selector: 'app-gallery',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class GalleryComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe = new Subject();

  constructor(
    private getPhotos: GetPhotosService,
    private router: Router,

  ) {
    this.getPhotos.callFirebase();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
