import { NgModule } from '@angular/core'
import { HomeComponent } from './routes/home/home.component'
import { GridComponent } from './components/grid/grid.component'
import { HeaderComponent } from './components/header/header.component'
import { GalleryComponent } from './gallery.component'
import { GalleryRoutingModule } from './gallery-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { GetPhotosService } from './services/get-photos.service'
import { SharedModule } from '../shared/shared.module'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    GridComponent,
    GalleryComponent,
  ],
  imports: [GalleryRoutingModule, CommonModule, HttpClientModule, SharedModule],
  providers: [GetPhotosService],
})
export class GalleryModule {}
