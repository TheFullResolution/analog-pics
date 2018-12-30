import { NgModule } from '@angular/core'
import { HomeComponent } from './components/home/home.component'
import { GridComponent } from './components/grid/grid.component'
import { HeaderComponent } from './common/header/header.component'
import { GalleryComponent } from './components/gallery-root/gallery.component'
import { GalleryRoutingModule } from './gallery-routing.module'

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    GridComponent,
    GalleryComponent,
  ],
  imports: [GalleryRoutingModule],
})
export class GalleryModule {}
