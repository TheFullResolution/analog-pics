import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule) },
  { path: 'cms', loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
