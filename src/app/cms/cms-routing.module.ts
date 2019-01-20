import { NgModule, ComponentRef } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './components/routes/login/login.component'
import { DashboardComponent } from './components/routes/dashboard/dashboard.component'
import { AuthGuard } from './state/auth/auth.guard'
import { CmsComponent } from './components/cms-root/cms.component'
import { FileUploadComponent } from './components/routes/file-upload/file-upload.component'
import { PublishComponent } from './components/routes/publish/publish.component'
import { RouteName, RoutPath } from './cms.paths'

export const routeNames: RouteName[] = [
  {
    path: RoutPath.login,
    label: 'Login',
    icon: '',
    component: LoginComponent,
    auth: false,
  },
  {
    path: RoutPath.dashboard,
    label: 'Dashboard',
    icon: 'data_usage',
    component: DashboardComponent,
    auth: true,
  },
  {
    path: RoutPath.upload,
    label: 'Picture Upload',
    icon: 'cloud_upload',
    component: FileUploadComponent,
    auth: true,
  },
  {
    path: RoutPath.publish,
    label: 'Publish Pictures',
    icon: 'publish',
    component: PublishComponent,
    auth: true,
  },
]

const childrenRoutes = routeNames.map(({ path, component, auth }) => ({
  path,
  component,
  ...(auth ? { canLoad: [AuthGuard] } : {}),
}))

const routes: Routes = [
  {
    path: '',
    component: CmsComponent,
    children: childrenRoutes,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class CmsRoutingModule {}
