import { NgModule } from '@angular/core'
import { HomeComponent } from './components/routes/home/home.component'
import { GridComponent } from './components/routes/home/grid/grid.component'
import { HeaderComponent } from './components/common/header/header.component'
import { GalleryComponent } from './components/gallery-root/gallery.component'
import { GalleryRoutingModule } from './gallery-routing.module'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    GridComponent,
    GalleryComponent,
  ],
  imports: [GalleryRoutingModule, HttpClientModule],
})
export class GalleryModule {}
