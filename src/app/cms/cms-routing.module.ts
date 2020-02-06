import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsComponent } from './cms.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { FileUploadComponent } from './routes/file-upload/file-upload.component';
import { LoginComponent } from './routes/login/login.component';
import { PublishComponent } from './routes/publish/publish.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ManageComponent } from './routes/manage/manage.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: CmsComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canLoad: [AuthGuard],
      },
      {
        path: 'manage',
        component: ManageComponent,
        canLoad: [AuthGuard],
      },
      {
        path: 'upload',
        component: FileUploadComponent,
        canLoad: [AuthGuard],
      },
      {
        path: 'publish',
        component: PublishComponent,
        canLoad: [AuthGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class CmsRoutingModule {}
