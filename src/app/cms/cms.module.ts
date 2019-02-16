import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { FormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'

import { environment } from '../../environments/environment'
import { CmsRoutingModule } from './cms-routing.module'
import { HeaderComponent } from './components/header/header.component'
import { ImageSelectorComponent } from './components/image-selector/image-selector.component'
import { ImageComponent } from './components/image/image.component'
import { InputFileComponent } from './components/input-file/input-file.component'
import { PictureGridComponent } from './components/picture-grid/picture-grid.component'
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component'
import { MaterialModule } from './material.module'
import { CmsComponent } from './root/cms.component'
import { DashboardComponent } from './routes/dashboard/dashboard.component'
import {
    ProgressCardComponent
} from './routes/file-upload/components/progress-card/progress-card.component'
import {
    UploadCardComponent
} from './routes/file-upload/components/upload-card/upload-card.component'
import { FileUploadComponent } from './routes/file-upload/file-upload.component'
import { StorageService } from './routes/file-upload/services/storage.service'
import { UploadStateService } from './routes/file-upload/services/upload-state.service'
import { LoginComponent } from './routes/login/login.component'
import { PublishComponent } from './routes/publish/publish.component'
import { UnpublishedService } from './routes/publish/service/unpublished.service'
import { AuthService } from './services/auth/auth.service'
import { DatabaseService } from './services/database/database.service'
import { SelectService } from './services/select/select.service'
import { reducers } from './state/state.reducer'
import { DropZoneDirective } from './utils/drop-zone.directive'
import { FileSizePipe } from './utils/file-size.pipe'
import { HoverDirective } from './utils/hover.directive'

@NgModule({
  declarations: [
    CmsComponent,
    DashboardComponent,
    DropZoneDirective,
    HoverDirective,
    FileSizePipe,
    FileUploadComponent,
    HeaderComponent,
    ImageComponent,
    ImageSelectorComponent,
    InputFileComponent,
    LoginComponent,
    PictureGridComponent,
    ProgressCardComponent,
    PublishComponent,
    SidenavListComponent,
    UploadCardComponent,
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
  providers: [
    AuthService,
    StorageService,
    UploadStateService,
    DatabaseService,
    UnpublishedService,
    SelectService,
    { provide: FirestoreSettingsToken, useValue: {} },
  ],
})
export class CmsModule {}
