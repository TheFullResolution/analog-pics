import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFirestoreModule,
  SETTINGS,
} from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { CmsRoutingModule } from './cms-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { SidenavListComponent } from './components/sidenav/sidenav-list/sidenav-list.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './material.module';
import { CmsComponent } from './cms.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { ProgressCardComponent } from './routes/file-upload/components/progress-card/progress-card.component';
import { UploadCardComponent } from './routes/file-upload/components/upload-card/upload-card.component';
import { FileUploadComponent } from './routes/file-upload/file-upload.component';
import { StorageService } from './routes/file-upload/services/storage.service';
import { UploadStateService } from './routes/file-upload/services/upload-state.service';
import { LoginComponent } from './routes/login/login.component';
import { PublishComponent } from './routes/publish/publish.component';
import { PublishService } from './routes/publish/services/publish.service';
import { UnpublishedService } from './routes/publish/services/unpublished.service';
import { AuthService } from './services/auth/auth.service';
import { DatabaseService } from './services/database/database.service';
import { DeleteService } from './services/delete/delete.service';
import { SelectService } from './services/select/select.service';
import { reducers } from './state/state.reducer';
import { DropZoneDirective } from './utils/drop-zone.directive';
import { FileSizePipe } from './utils/file-size.pipe';
import { ManageComponent } from './routes/manage/manage.component';

@NgModule({
  declarations: [
    CmsComponent,
    DashboardComponent,
    DropZoneDirective,
    FileSizePipe,
    FileUploadComponent,
    HeaderComponent,
    SidenavComponent,
    ImageSelectorComponent,
    InputFileComponent,
    LoginComponent,
    ProgressCardComponent,
    PublishComponent,
    SidenavListComponent,
    UploadCardComponent,
    ManageComponent,
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
    SharedModule,
    CmsRoutingModule,
  ],
  providers: [
    AuthService,
    StorageService,
    UploadStateService,
    DatabaseService,
    UnpublishedService,
    PublishService,
    SelectService,
    DeleteService,
    { provide: SETTINGS, useValue: {} },
  ],
})
export class CmsModule {}
