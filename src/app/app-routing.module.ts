import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', loadChildren: './gallery/gallery.module#GalleryModule' },
  { path: 'cms', loadChildren: './cms/cms.module#CmsModule' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
