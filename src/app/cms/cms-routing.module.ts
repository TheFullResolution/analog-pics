import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './components/routes/login/login.component'
import { DashboardComponent } from './components/routes/dashboard/dashboard.component'
import { AuthGuard } from './state/auth/auth.guard'
import { CmsComponent } from './components/cms-root/cms.component'
import { FileUploadComponent } from './components/routes/file-upload/file-upload.component'

export const RouteName = {
  login: 'login',
  dashboard: 'dashboard',
  fileUpload: 'file-upload',
}

const routes: Routes = [
  {
    path: '',
    component: CmsComponent,
    children: [
      { path: RouteName.login, component: LoginComponent },
      {
        path: RouteName.dashboard,
        component: DashboardComponent,
        canLoad: [AuthGuard],
      },
      {
        path: RouteName.fileUpload,
        component: FileUploadComponent,
        canLoad: [AuthGuard],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class CmsRoutingModule {}
