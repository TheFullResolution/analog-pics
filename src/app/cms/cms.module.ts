import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { FormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'

import { environment } from '../../environments/environment'
import { CmsRoutingModule } from './cms-routing.module'
import { CmsComponent } from './components/cms-root/cms.component'
import { HeaderComponent } from './components/common/header/header.component'
import { ImageSelectorComponent } from './components/common/image-selector/image-selector.component'
import { ImageComponent } from './components/common/image/image.component'
import { InputFileComponent } from './components/common/input-file/input-file.component'
import { PictureGridComponent } from './components/common/picture-grid/picture-grid.component'
import { SidenavListComponent } from './components/common/sidenav-list/sidenav-list.component'
import { DashboardComponent } from './components/routes/dashboard/dashboard.component'
import { ProgressCardComponent } from './components/routes/file-upload/components/progress-card/progress-card.component'
import { UploadCardComponent } from './components/routes/file-upload/components/upload-card/upload-card.component'
import { FileUploadComponent } from './components/routes/file-upload/file-upload.component'
import { StorageService } from './components/routes/file-upload/service/storage.service'
import { UploadStateService } from './components/routes/file-upload/service/upload-state.service'
import { LoginComponent } from './components/routes/login/login.component'
import { PublishComponent } from './components/routes/publish/publish.component'
import { MaterialModule } from './material/material.module'
import { AuthService } from './services/auth.service'
import { DatabaseService } from './services/database.service'
import { reducers } from './state/cms.reducer'
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
  providers: [AuthService, StorageService, UploadStateService, DatabaseService],
})
export class CmsModule {}
