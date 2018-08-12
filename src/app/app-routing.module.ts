import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {HomeComponent} from './gallery/home/home.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cms', loadChildren: './cms/cms.module#CmsModule' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
