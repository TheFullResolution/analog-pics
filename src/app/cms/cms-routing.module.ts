import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { CmsComponent } from './cms.component'

const routes: Routes = [
  {
    path: '',
    component: CmsComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CmsRoutingModule {}
