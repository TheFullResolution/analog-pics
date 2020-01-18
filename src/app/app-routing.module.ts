import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule), pathMatch: 'full' },
  { path: 'cms', loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
}
