import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { CmsComponent } from './cms.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AuthGuard } from './state/auth/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: CmsComponent,
    children: [
      { path: '', component: LoginComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canLoad: [AuthGuard],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class CmsRoutingModule {}
