import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CmsState } from '../../state/state.reducer';
import { Observable, Subject } from 'rxjs';
import type from '../../../../../_types_';
import { gePublished, getUnpublished } from '../../state/state.selectors';
import { routeNames, RoutPath, getFullPath } from '../../cms.paths';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe = new Subject();
  getFullPath = getFullPath;
  unpublished$: Observable<type.DataBaseEntryWithId[]>;
  published$: Observable<type.DataBaseEntryWithId[]>;
  pathToPublish = routeNames.find(el => el.path === RoutPath.publish);
  pathPublished = routeNames.find(el => el.path === RoutPath.manage);

  constructor(private store: Store<CmsState>) {}

  ngOnInit() {
    this.unpublished$ = this.store.select(getUnpublished);
    this.published$ = this.store.select(gePublished);
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
