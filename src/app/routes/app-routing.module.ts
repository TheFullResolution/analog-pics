import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {GalleryComponent} from '../gallery/gallery.component';


const routes: Routes = [
  { path: '', component: GalleryComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
