import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteName, RoutPath } from './cms.paths';
import { CmsComponent } from './root/cms.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { FileUploadComponent } from './routes/file-upload/file-upload.component';
import { LoginComponent } from './routes/login/login.component';
import { PublishComponent } from './routes/publish/publish.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ManageComponent } from './routes/manage/manage.component';

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
    path: RoutPath.manage,
    label: 'Manage Pictures',
    icon: 'dynamic_feed',
    component: ManageComponent,
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
];

const childrenRoutes = routeNames.map(({ path, component, auth }) => ({
  path,
  component,
  ...(auth ? { canLoad: [AuthGuard] } : {}),
}));

const routes: Routes = [
  {
    path: '',
    component: CmsComponent,
    children: childrenRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class CmsRoutingModule {
}
