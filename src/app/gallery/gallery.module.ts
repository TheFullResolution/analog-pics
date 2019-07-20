import { NgModule } from '@angular/core'
import { HomeComponent } from './routes/home/home.component'
import { GridComponent } from './components/grid/grid.component'
import { HeaderComponent } from './components/header/header.component'
import { GalleryComponent } from './gallery.component'
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
