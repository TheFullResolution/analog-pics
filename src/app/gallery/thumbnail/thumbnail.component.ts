import { Component, Input, OnInit } from '@angular/core'

export interface Thumbnail {
  image: string
  text: string
}

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent implements OnInit {
  @Input() thumbnail: Thumbnail

  constructor() {}

  ngOnInit() {}
}
