import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { MaterialModule } from './material/material.module'
import { GalleryComponent } from './gallery/gallery.component'
import { AppRoutingModule } from './routes/app-routing.module'
import { HeaderComponent } from './gallery/header/header.component';
import { ThumbnailComponent } from './gallery/thumbnail/thumbnail.component';
import { ListComponent } from './gallery/list/list.component'

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    HeaderComponent,
    ThumbnailComponent,
    ListComponent,
  ],
  imports: [BrowserModule, MaterialModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
