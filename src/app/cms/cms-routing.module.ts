import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './components/routes/login/login.component'
import { DashboardComponent } from './components/routes/dashboard/dashboard.component'
import { AuthGuard } from './state/auth/auth.guard'
import {CmsComponent} from './components/cms-root/cms.component'

const routes: Routes = [
  {
    path: '',
    component: CmsComponent,
    children: [
      { path: 'login', component: LoginComponent },
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
