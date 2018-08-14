import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from './material/material.module'
import { CmsRoutingModule } from './cms-routing.module'
import { CmsComponent } from './cms.component'
import { AngularFireModule } from 'angularfire2'
import { FormsModule } from '@angular/forms'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { StoreModule } from '@ngrx/store'
import { reducers } from './state/cms.reducer'
import { AuthService } from './services/auth.service'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { environment } from '../../environments/environment'
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileSizePipe } from './utils/file-size.pipe'
import {LoginComponent} from './components/login/login.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {HeaderComponent} from './components/common/header/header.component'
import {DropZoneDirective} from './utils/drop-zone.directive'
import {AngularFireStorageModule} from 'angularfire2/storage'

@NgModule({
  declarations: [
    LoginComponent,
    CmsComponent,
    DashboardComponent,
    HeaderComponent,
    DropZoneDirective,
    FileUploadComponent,
    FileSizePipe,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    StoreModule.forRoot(reducers),
    FormsModule,
    MaterialModule,
    CommonModule,
    CmsRoutingModule,
  ],
  providers: [AuthService],
})
export class CmsModule {}
