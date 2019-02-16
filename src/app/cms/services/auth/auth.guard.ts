import { CmsState } from './../../state/state.reducer'
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
} from '@angular/router'
import { getIsAuth } from '../../state/state.selectors'
import { Store } from '@ngrx/store'
import { take } from 'rxjs/operators'

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<CmsState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(getIsAuth).pipe(take(1))
  }

  canLoad(route: Route) {
    return this.store.select(getIsAuth).pipe(take(1))
  }
}
