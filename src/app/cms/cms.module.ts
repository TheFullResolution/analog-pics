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
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HeaderComponent } from './common/header/header.component'
import {environment} from '../../environments/environment'

@NgModule({
  declarations: [LoginComponent, CmsComponent, DashboardComponent, HeaderComponent],
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
