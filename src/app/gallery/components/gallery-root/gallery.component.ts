import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('start')

    this.http
      .get('https://us-central1-analog-pics-a1a3b.cloudfunctions.net/photos')
      .subscribe(el => {
        console.log(el)
      })
  }
}
