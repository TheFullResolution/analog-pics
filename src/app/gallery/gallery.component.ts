import { Component, OnInit } from '@angular/core';
import { GetPhotosService } from './services/get-photos.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class GalleryComponent implements OnInit {
  constructor(
    private getPhotos: GetPhotosService,
    private title: Title,
    private meta: Meta,
  ) {
    this.title.setTitle('AnalogPics');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Gallery of analog pictures, taken using Zenit 12xp and Practica',
      },
      { name: 'robots', content: 'index, follow' },
    ]);
  }

  ngOnInit() {
    this.getPhotos.callFirebase();
  }
}
