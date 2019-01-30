import { Component, OnInit, Input } from '@angular/core'
import type from '_types_'

@Component({
  selector: 'app-image',
  template: `
    <picture>
      <source type="image/webp" [srcset]="webpSrcset" />
      <source type="image/jpeg" [srcset]="jpegSrcset" />
      <img [src]="defaultImg.downloadUrl" [alt]="defaultImg.name" />
    </picture>
  `,
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() image: type.DataBaseEntry
  @Input() defaultSize: type.ImageSizeTypes = 'xs'

  defaultImg: type.DataBaseImageObject
  webpSrcset: string
  jpegSrcset: string
  constructor() {}

  ngOnInit() {
    const { thumbs } = this.image
    this.defaultImg = this.getDefault(thumbs)
    this.jpegSrcset = this.getSrcset(type.ImageFormat.jpeg, thumbs)
    this.webpSrcset = this.getSrcset(type.ImageFormat.webp, thumbs)
  }

  getSrcset = (
    format: type.ImageFormatsTypes,
    list: type.DataBaseImageObject[],
  ) =>
    list
      .filter(img => img.format === format)
      .reduce((acc, el) => acc + `${el.downloadUrl} ${el.size}w,`, '')

  getDefault = (list: type.DataBaseImageObject[]) =>
    list.find(img => img.type === this.defaultSize)
}
