import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { combineLatest, Observable } from 'rxjs'
import { filter, flatMap, map } from 'rxjs/operators'
import type from '_types_'
import { GetPhotosService, ZoomData } from '../services/get-photos.service'

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
})
export class ZoomComponent implements OnInit {
  currentPic$: Observable<type.DataBaseEntryWithId>
  currentData$: Observable<ZoomData>
  constructor(
    private route: ActivatedRoute,
    private getPhotos: GetPhotosService,
  ) {}

  ngOnInit() {
    this.currentPic$ = this.route.queryParams.pipe(
      filter(params => params.picId),
      flatMap(params => this.getPhotos.getSpecificPhoto(params.picId)),
    )
    this.getCurrentData()
  }

  getCurrentData() {
    this.currentData$ = combineLatest([
      this.route.queryParams.pipe(filter(params => params.picId)),
      this.getPhotos.getPhotosArray(),
    ]).pipe(
      map(([param, array]) => {


        const currentIndex = array.findIndex(el => el.id === param.picId)
        const previous = currentIndex - 1 >= 0 ? array[currentIndex - 1] : null
        const next =
          currentIndex + 1 <= array.length ? array[currentIndex + 1] : null
        return {
          current: array[currentIndex],
          previous,
          next,
        }
      }),
    )
  }
}
