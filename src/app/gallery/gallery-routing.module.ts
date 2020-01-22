import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery.component';
import { ZoomComponent } from './zoom/zoom.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
    children: [
      { path: '', component: HomeComponent,  pathMatch: 'full' },
      { path: 'zoom', component: ZoomComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class GalleryRoutingModule {
}
