import { Component } from '@angular/core'
import {Thumbnail} from '../thumbnail/thumbnail.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  tiles: Thumbnail[] = [
    { text: 'One', image: 'https://via.placeholder.com/350x250' },
    { text: 'Two', image: 'https://via.placeholder.com/350x250' },
    { text: 'Three', image: 'https://via.placeholder.com/350x250' },
    { text: 'Four', image: 'https://via.placeholder.com/350x250' },
  ]
}
