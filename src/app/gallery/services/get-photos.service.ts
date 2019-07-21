import { Injectable, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'
import types from '_types_'
import { HttpClient } from '@angular/common/http'
import { takeUntil, take, map } from 'rxjs/operators'

@Injectable()
export class GetPhotosService implements OnDestroy {
  private _ngUnsubscribe = new Subject()
  private _photos: Subject<types.HttpGetResponse> = new Subject()
  public photos$ = this._photos.asObservable()

  constructor(private http: HttpClient) {}

  ngOnDestroy() {
    this._ngUnsubscribe.next()
    this._ngUnsubscribe.complete()
  }

  callFirebase() {
    this.http
      .get<types.HttpGetResponse>(
        'https://us-central1-analog-pics-a1a3b.cloudfunctions.net/photos',
      )
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe(el => {
        this._photos.next(el)
      })
  }

  getPhotosArray() {
    return this.photos$.pipe(map(el => el.items))
  }
}
