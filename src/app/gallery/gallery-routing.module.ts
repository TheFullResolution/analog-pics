import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { GalleryComponent } from './components/gallery-root/gallery.component'

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
    children: [{ path: '', component: HomeComponent }],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class GalleryRoutingModule {}
