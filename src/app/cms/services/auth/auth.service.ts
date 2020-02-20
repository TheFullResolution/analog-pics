import { CmsState, getDataBaseState } from '../../state/state.reducer';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from '../../state/auth/auth-data.types';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as Auth from '../../state/auth/auth.actions';
import { DatabaseService } from '../database/database.service';
import { take } from 'rxjs/operators';
import { getFullPath, RoutPath } from '../../cms.paths';


@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private database: DatabaseService,
    private store: Store<CmsState>,
  ) {
  }

  iniAuthListener() {


    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());

        this.database.fetchDatabase();
      } else {
       void this.router.navigate([getFullPath(RoutPath.login)]);

        this.store.dispatch(new Auth.SetUnauthenticated());
        this.store
          .select(getDataBaseState)
          .pipe(take(1))
          .subscribe(({ active }) => {
            if (active) {
              this.database.stopFetchingDatabase();
            }
          });
      }
    });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        return this.router.navigate([getFullPath(RoutPath.dashboard)]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
   void this.afAuth.auth.signOut();
   void this.router.navigate([getFullPath(RoutPath.login)]);
  }
}
