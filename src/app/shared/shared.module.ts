import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ImageComponent } from './image/image.component'
import { PictureGridComponent } from './picture-grid/picture-grid.component'

@NgModule({
  declarations: [ImageComponent, PictureGridComponent],
  imports: [MatGridListModule, MatProgressSpinnerModule, CommonModule],
  exports: [
    PictureGridComponent,
    ImageComponent,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}
