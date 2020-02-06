import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { HomeComponent } from './home/home.component';
import { ZoomComponent } from './zoom/zoom.component';
import { GetPhotosService } from './services/get-photos.service';
import { ScrollPositionService } from './services/scroll-position.service';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    HomeComponent,
    ZoomComponent,
    GalleryComponent,
    AboutComponent,
  ],
  imports: [CommonModule, HttpClientModule, SharedModule, GalleryRoutingModule],
  providers: [GetPhotosService, ScrollPositionService],
})
export class GalleryModule {}
