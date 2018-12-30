import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from './material/material.module'
import { CmsRoutingModule } from './cms-routing.module'
import { AngularFireModule } from '@angular/fire'
import { FormsModule } from '@angular/forms'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { StoreModule } from '@ngrx/store'
import { reducers } from './state/cms.reducer'
import { AuthService } from './services/auth.service'
import { environment } from '../../environments/environment'
import { FileUploadComponent } from './components/routes/file-upload/file-upload.component'
import { FileSizePipe } from './utils/file-size.pipe'
import { LoginComponent } from './components/routes/login/login.component'
import { DashboardComponent } from './components/routes/dashboard/dashboard.component'
import { HeaderComponent } from './components/common/header/header.component'
import { DropZoneDirective } from './utils/drop-zone.directive'
import { CmsComponent } from './components/cms-root/cms.component'
import { InputFileComponent } from './components/common/input-file/input-file.component'
import { SidenavListComponent } from './components/common/sidenav-list/sidenav-list.component'
import { StorageService } from './components/routes/file-upload/service/storage.service'
import { UploadCardComponent } from './components/routes/file-upload/components/upload-card/upload-card.component'
import { ProgressCardComponent } from './components/routes/file-upload/components/progress-card/progress-card.component'
import { UploadStateService } from './components/routes/file-upload/service/upload-state.service';
import { PublishComponent } from './components/routes/publish/publish.component'

@NgModule({
  declarations: [
    LoginComponent,
    CmsComponent,
    DashboardComponent,
    HeaderComponent,
    DropZoneDirective,
    FileUploadComponent,
    FileSizePipe,
    InputFileComponent,
    SidenavListComponent,
    UploadCardComponent,
    ProgressCardComponent,
    PublishComponent,
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
  providers: [AuthService, StorageService, UploadStateService],
})
export class CmsModule {}
