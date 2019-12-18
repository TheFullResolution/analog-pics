import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import type from '_types_';
import { GetPhotosService } from '../services/get-photos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  photos$: Observable<type.DataBaseEntryWithId[]>;
  loading$: Observable<boolean>;

  constructor(private getPhotos: GetPhotosService) {
  }

  ngOnInit() {
    this.photos$ = this.getPhotos.getPhotosArray();
    this.loading$ = this.getPhotos.loading$;
  }
}
