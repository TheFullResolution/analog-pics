import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { filter, map, flatMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { GetPhotosService } from '../services/get-photos.service'
import type from '_types_'

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
})
export class ZoomComponent implements OnInit {
  currentPic$: Observable<type.DataBaseEntryWithId>

  constructor(
    private route: ActivatedRoute,
    private getPhotos: GetPhotosService,
  ) {}

  ngOnInit() {
    this.currentPic$ = this.route.queryParams.pipe(
      filter(params => params.picId),
      flatMap(params => this.getPhotos.getSpecificPhoto(params.picId)),
    )
  }
}
