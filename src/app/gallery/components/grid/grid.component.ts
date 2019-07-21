import { Component, OnInit } from '@angular/core'
import { GetPhotosService } from '../../services/get-photos.service';
import type from '_types_'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  photos$: Observable<type.DataBaseEntryWithId[]>
  constructor(private getPhotos: GetPhotosService) {}

  ngOnInit() {
    this.photos$ = this.getPhotos.getPhotosArray()
  }
}
