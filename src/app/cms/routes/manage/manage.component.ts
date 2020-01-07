import { Component, OnInit } from '@angular/core';
import { PublishedService } from './services/published.service';
import { Observable } from 'rxjs';
import type from '../../../../../_types_';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  published$: Observable<type.DataBaseEntryWithId[]>;

  constructor(private publishedService: PublishedService) {}

  ngOnInit() {
    this.publishedService.getPublished();
    this.published$ = this.publishedService.published$;
  }
}
