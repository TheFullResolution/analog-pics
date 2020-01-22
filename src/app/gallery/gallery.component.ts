import { Component, OnInit } from '@angular/core';
import { GetPhotosService } from './services/get-photos.service';

@Component({
  selector: 'app-gallery',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class GalleryComponent implements OnInit {
  constructor(private getPhotos: GetPhotosService) {}

  ngOnInit() {
    this.getPhotos.callFirebase();
  }
}
