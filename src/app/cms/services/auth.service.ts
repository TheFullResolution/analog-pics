import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AuthData } from './auth-data.model'
import { AngularFireAuth } from 'angularfire2/auth'
import { Store } from '@ngrx/store'
import * as fromCms from '../state/cms.reducer'
import * as Auth from '../state/auth/auth.actions'

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private store: Store<fromCms.State>,
  ) {}

  iniAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated())
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated())

        this.router.navigate(['cms/login'])
      }
    })
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        return this.router.navigate(['cms/dashboard'])
      })
      .catch(error => {
        console.log(error)
      })
  }

  logout() {
    this.afAuth.auth.signOut()
  }
}
