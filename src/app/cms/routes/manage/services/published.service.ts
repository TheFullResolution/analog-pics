import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import types from '_types_';
import consts from '_consts_';
import { AngularFireStorage } from '@angular/fire/storage';
import { Store } from '@ngrx/store';
import { CmsState } from '../../../state/state.reducer';
import { gePublished } from '../../../state/state.selectors';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class PublishedService implements OnDestroy {
  private _published: Subject<types.DataBaseEntryWithId[]> = new Subject();
  private _ngUnsubscribe = new Subject();
  public published$ = this._published.asObservable();

  constructor(
    private storage: AngularFireStorage,
    private store: Store<CmsState>,
  ) {}

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  getPublished() {
    this.store
      .select(gePublished)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe({
        next: el => {
          this._published.next(el);
        },
      });
  }
}
