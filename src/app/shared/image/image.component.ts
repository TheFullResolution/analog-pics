import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import type from '_types_';
import lazySizes from 'lazysizes';

const LAZYLOAD = 'lazyload';

@Component({
  selector: 'app-image',
  template: `
    <picture [classList]="[objectFit]">
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
  @ViewChild('imageEl', { static: true }) imageElRef: ElementRef<
    HTMLImageElement
  >;

  @Input() image: type.DataBaseEntryWithId;
  @Input() imageId: type.DataBaseEntryWithId['id'];
  @Input() defaultSize: type.ImageSizeTypes = 'md';
  @Input() objectFit: 'cover' | 'contain' = 'cover';

  defaultImg: type.DataBaseImageObject;
  webpSrcset: string;
  jpegSrcset: string;

  constructor() {}

  ngOnInit() {
    this.getDataForImages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.imageId) {
      const { imageId } = changes;
      if (imageId.currentValue !== imageId.previousValue) {
        this.getDataForImages();
      }
    }
  }

  getDataForImages() {
    const { thumbs } = this.image;
    this.defaultImg = this.getSpecificSize(thumbs, this.defaultSize);
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

  getSpecificSize = (
    list: type.DataBaseImageObject[],
    size: type.ImageSizeTypes,
  ) => list.find(img => img.type === size);
}
