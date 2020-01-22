import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ImageComponent } from './image/image.component';
import { PictureGridComponent } from './picture-grid/picture-grid.component';
import { HoverDirective } from './utils/hover.directive';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [HoverDirective, ImageComponent, PictureGridComponent, LogoComponent],
  imports: [
    MatGridListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CommonModule,
  ],
  exports: [
    PictureGridComponent,
    ImageComponent,
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HoverDirective,
    LogoComponent,
  ],
})
export class SharedModule {}
