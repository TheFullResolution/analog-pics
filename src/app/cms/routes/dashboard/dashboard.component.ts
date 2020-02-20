import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CmsState } from '../../state/state.reducer';
import { Observable, Subject } from 'rxjs';
import { getFullPath, routeNames, RoutPath } from '../../cms.paths';
import { getLastUpload, getPublishedTotals, getUnpublishedTotals } from './dashboard.selectors';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe = new Subject();
  getFullPath = getFullPath;
  unpublished$: Observable<number>;
  published$: Observable<number>;
  lastUpload$: Observable<number>;
  lastSignIn$: Observable<string>;

  pathToPublish = routeNames.find(el => el.path === RoutPath.publish);
  pathPublished = routeNames.find(el => el.path === RoutPath.manage);

  constructor(private store: Store<CmsState>,     private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.unpublished$ = this.store.select(getUnpublishedTotals);
    this.published$ = this.store.select(getPublishedTotals);
    this.lastUpload$ = this.store.select(getLastUpload)
    this.lastSignIn$ = this.afAuth.user.pipe(map(el => el.metadata.lastSignInTime))
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
