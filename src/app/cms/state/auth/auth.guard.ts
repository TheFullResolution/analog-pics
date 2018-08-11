import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
} from '@angular/router'
import * as fromCms from '../cms.reducer'
import { Store } from '@ngrx/store'
import { take } from 'rxjs/operators'

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromCms.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromCms.getIsAuth).pipe(take(1))
  }

  canLoad(route: Route) {
    return this.store.select(fromCms.getIsAuth).pipe(take(1))
  }
}
