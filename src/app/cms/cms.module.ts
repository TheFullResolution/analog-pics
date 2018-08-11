import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from './material/material.module'
import { LoginComponent } from './login/login.component'
import { CmsRoutingModule } from './cms-routing.module'
import { CmsComponent } from './cms.component'
import { AngularFireModule } from 'angularfire2'
import { FormsModule } from '@angular/forms'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { StoreModule } from '@ngrx/store'
import { reducers } from './state/cms.reducer';
import { DashboardComponent } from './dashboard/dashboard.component'
import { AuthService } from './services/auth.service'
import { AngularFireAuthModule } from 'angularfire2/auth'

const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBLk2bdC3waMeuHGM6AuUJRCKV5LPwpbww',
    authDomain: 'analog-pics-a1a3b.firebaseapp.com',
    databaseURL: 'https://analog-pics-a1a3b.firebaseio.com',
    projectId: 'analog-pics-a1a3b',
    storageBucket: 'analog-pics-a1a3b.appspot.com',
    messagingSenderId: '851287805520',
  },
}

@NgModule({
  declarations: [LoginComponent, CmsComponent, DashboardComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(reducers),
    FormsModule,
    MaterialModule,
    CommonModule,
    CmsRoutingModule,
  ],
  providers: [AuthService]
})
export class CmsModule {}
