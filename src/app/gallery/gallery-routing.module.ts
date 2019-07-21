import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './routes/home/home.component'
import { GalleryComponent } from './gallery.component'

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
