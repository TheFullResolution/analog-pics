import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import type from '_types_';
import lazySizes from 'lazysizes';

const LAZYLOAD = 'lazyload';

@Component({
  selector: 'app-image',
  template: `
    <picture>
      <source type="image/webp" [attr.data-srcset]="webpSrcset" />
      <source type="image/jpeg" [attr.data-srcset]="jpegSrcset" />
      <img
        data-sizes="auto"
        [attr.data-src]="defaultImg.downloadUrl"
        [alt]="defaultImg.name"
        #imageEl
      />
    </picture>
  `,
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, OnChanges {
  @ViewChild('imageEl', { static: true }) imageElRef: ElementRef<HTMLImageElement>;

  @Input() image: type.DataBaseEntryWithId;
  @Input() imageId: type.DataBaseEntryWithId['id'];
  @Input() defaultSize: type.ImageSizeTypes = 'md';

  defaultImg: type.DataBaseImageObject;
  loadClass = true;
  webpSrcset: string;
  jpegSrcset: string;

  constructor() {
  }

  ngOnInit() {
    this.getDataForImages();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { imageId } = changes;
    if (imageId.currentValue !== imageId.previousValue) {
      this.getDataForImages();
    }
  }

  getDataForImages() {
    const { thumbs } = this.image;
    this.defaultImg = this.getDefault(thumbs);
    this.jpegSrcset = this.getSrcset(type.ImageFormat.jpeg, thumbs);
    this.webpSrcset = this.getSrcset(type.ImageFormat.webp, thumbs);
    this.imageElRef.nativeElement.classList.add(LAZYLOAD);
    lazySizes.autoSizer.checkElems();
  }

  getSrcset = (
    format: type.ImageFormatsTypes,
    list: type.DataBaseImageObject[],
  ) =>
    list
      .filter(img => img.format === format)
      .reduce((acc, el) => acc + `${el.downloadUrl} ${el.size}w,`, '');

  getDefault = (list: type.DataBaseImageObject[]) =>
    list.find(img => img.type === this.defaultSize);
}
