import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ImageComponent } from './image/image.component';
import { PictureGridComponent } from './picture-grid/picture-grid.component';

@NgModule({
  declarations: [ImageComponent, PictureGridComponent],
  imports: [MatGridListModule, CommonModule],
  exports: [PictureGridComponent, ImageComponent, MatGridListModule],
})
export class SharedModule {}
