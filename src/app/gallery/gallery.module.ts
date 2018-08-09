import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home/home.component'
import { GridComponent } from './grid/grid.component'
import { HeaderComponent } from './common/header/header.component'
import { GalleryComponent } from './gallery.component'
import { GalleryRoutingModule } from './gallery-routing.module'

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    GridComponent,
    GalleryComponent,
  ],
  imports: [CommonModule, GalleryRoutingModule],
})
export class GalleryModule {}
