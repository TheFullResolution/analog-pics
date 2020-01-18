import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { ZoomComponent } from './zoom/zoom.component';
import { GetPhotosService } from './services/get-photos.service';
import { ScrollPositionService } from './services/scroll-position.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    ZoomComponent,
    GalleryComponent,
  ],
  imports: [GalleryRoutingModule, CommonModule, HttpClientModule, SharedModule],
  providers: [GetPhotosService, ScrollPositionService],
})
export class GalleryModule {}
