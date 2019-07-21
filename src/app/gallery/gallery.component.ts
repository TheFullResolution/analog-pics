import { Component, OnInit } from '@angular/core';
import { GetPhotosService } from './services/get-photos.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  constructor(private getPhotos: GetPhotosService) {}

  ngOnInit() {
    this.getPhotos.callFirebase()
  }
}
