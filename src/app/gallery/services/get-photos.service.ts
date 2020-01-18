import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import types from '_types_';

@Injectable()
export class GetPhotosService implements OnDestroy {
  private _ngUnsubscribe = new Subject();
  private _loading = new BehaviorSubject<boolean>(false);
  private _photos: Subject<
    types.HttpGetResponse | { items: [] }
  > = new BehaviorSubject({ items: [] });

  public photos$ = this._photos.asObservable();
  public loading$ = this._loading.asObservable();

  constructor(private http: HttpClient) {}

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  callFirebase() {
    this._loading.next(true);
    this.http
      .get<types.HttpGetResponse>(
        'https://us-central1-analog-pics-a1a3b.cloudfunctions.net/photos',
      )
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(el => {
        this._photos.next(el);
        this._loading.next(false);
      });
  }

  getPhotosArray() {
    return this.photos$.pipe(map(el => el.items));
  }
}
