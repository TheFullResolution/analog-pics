import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import type from '_types_';
import { GetPhotosService } from '../services/get-photos.service';
import { ScrollPositionService } from '../services/scroll-position.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  photos$: Observable<type.DataBaseEntryWithId[]>;
  loading$: Observable<boolean>;

  constructor(
    private getPhotos: GetPhotosService,
    private scrollPosition: ScrollPositionService
  ) {}

  ngOnInit() {
    this.photos$ = this.getPhotos.getPhotosArray();
    this.loading$ = this.getPhotos.loading$;
  }

  ngAfterViewInit() {
    this.scrollPosition.restoreScrollPosition()
  }

  onClick() {
    this.scrollPosition.setScrollPosition()
  }
}
